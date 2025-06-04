<template>
  <div>
    <topHeader></topHeader>
    <div class="login-area mt-50 mb-120">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="form-wrapper">
              <div class="form-title mb-25">
                <h3>Create your account</h3>
                <span></span>
              </div>
              <form @submit.prevent="goTo">
                <div class="row">
                  <div class="col-lg-12">
                    <div class="form-inner mb-20">
                      <label class="large-font" for="name">Name *</label>
                        <input type="text" id="name" name="name">
                    </div>

                    <div class="form-inner mb-20">
                      <label class="large-font" for="phone">Phone number *</label>
                      <input type="text" name="phone" id="phone" placeholder=""/>
                    </div>

                    <div class="form-inner mb-20">
                      <label class="large-font" for="email">Password (6 characters minimum) *</label>
                      <input type="password" name="password" id="password"/>
                      <i class="bi bi-eye-slash" id="togglePassword"></i>
                    </div>

                    <div class="form-group form-check mb-20">
                      <input type="checkbox" class="form-check-input" id="exampleCheck1">
                      <label class="form-check-label" for="exampleCheck1">I would like to receive marketing communications about MyBuilder services and offers by email, SMS and/or phone and understand that I can unsubscribe at any time.</label>
                    </div>

                  </div>
                  <div class="col-lg-6 mb-4">
                    <div class="button-container">
                      <div class="col-12">
                        <button class="btn bg-primary-1 text-light big-button" type="submit">
                          Continue
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Auth from "../../layouts/auth";
import appConfig from "../../../../app.config";
import topHeader from '../../base-layout/header-1'

import {required, email} from "vuelidate/lib/validators";
import store from "@/store/store";

/**
 * Create Account component
 */
export default {
  page: {
    title: "Create Account",
    meta: [{name: "description", content: appConfig.description}],
  },
  data() {
    return {
      email: "",
      password: "",
      submitted: false,
      tryingToLogIn: false,
      obscurePassword: true,
      verificationStage: false,
      success: false,
      error: false,
      errorMessage: ''
    };
  },
  components: {
    Auth,
    topHeader
  },

  watch: {
    verificationStage: function (data) {
      if (!data) {
        this.password = '';
        this.error = false;
        this.errorMessage = '';
      }

    }
  },
  computed: {
    notification() {
      return this.$store ? this.$store.getters.notification : null;
    },
    notificationAutoCloseDuration() {
      return this.$store && this.$store.getters.notification ? 10 : 0;
    },
  },
  created() {
  },
  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
    },
  },
  methods: {
    tryToLogIn() {
      this.$store.dispatch("login", {
        email: this.email,
        password: this.password,
      }).then(() => {
        const loggedUser = store.getters.GET_USER_INFO;
        const userRole = loggedUser.roles?.[0] || '';
        if (userRole === 'admin') {
          this.$router.push('/admin');
        } else if (userRole === 'branch') {
          this.$router.push('/branch/home');
        } else if (userRole === 'customer' || userRole === 'vendor_manager') {
          this.$router.push('/');
        } else if (userRole === 'customer_service') {
          this.$router.push('/customer-service');
        } else {
          this.$router.push('/');
        }
      }).catch(() => {
      });
      this.$store.dispatch("clear");
    },
    goTo(){
      this.$router.push('/about-you')
    }
  },
  mounted() {
    this.$nextTick(() => {
      $('.sidebar-button').on("click", function(){
        $('.main-menu').addClass('show-menu');
      });

      $('.menu-close-btn').on("click", function(){
        $('.main-menu').removeClass('show-menu');
      });

    });
  }
};
</script>
