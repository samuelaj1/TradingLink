<template>
  <div>
    <topHeader></topHeader>
    <div class="login-area mt-50 mb-120">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="form-wrapper">
              <div class="form-title mb-25">
                <h3>Log In Here!</h3>
                <span></span>
              </div>
              <form>
                <div class="row">
                  <div class="col-lg-12">
                    <div class="form-inner mb-20">
                      <label for="email">Email*</label>
                      <div class="input-area">
                        <img src="../../../../public/frontend/assets/images/icon/email-2.svg" alt="">
                        <input type="email" id="email" name="email" placeholder="Email">
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-12 mb-4">
                    <div class="form-inner">
                      <button class="primry-btn-2" type="submit">LogIn</button>
                    </div>
                  </div>
                  <hr/>
                  <h4 class="mb-3 mt-2">New to TradeLink?</h4>
                  <p class="mb-1"><a class="text-decoration-underline" href="/post-a-job">Post your job</a> to find a
                    tradesperson</p>
                  <p><a class="text-decoration-underline" href="/post-a-job">Sign up</a> to join a tradesperson</p>
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
import topHeader from '../../base-layout/header-2'

import {required, email} from "vuelidate/lib/validators";
import store from "@/store/store";

/**
 * Login component
 */
export default {
  page: {
    title: "Login",
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
  },
};
</script>
