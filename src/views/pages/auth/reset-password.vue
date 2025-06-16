<template>
  <Auth>
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-6 col-xl-5">
        <div class="card">
          <div class="card-body p-4">
            <div class="text-center w-75 m-auto">
              <div class="auth-logo">
                <router-link to="/" class="logo logo-dark text-center">
                  <span class="logo-lg">
                    <img
                        src="@/assets/images/mortiply-logo-red.png"
                        alt=""
                        height="40"
                    />
                  </span>
                </router-link>
              </div>
            </div>
            <h3 class="text-center">Set your password</h3>
            <form @submit.prevent="tryToReset">
              <b-alert
                  v-model="isResetError"
                  class="mb-4"
                  variant="danger"
                  dismissible
              >{{ error }}
              </b-alert>

              <!-- Password Field with Popover -->
              <div class="form-group mb-3 position-relative">
                <label for="password">New Password</label>
                <div class="input-group input-group-merge">
                  <input
                      required
                      v-model="password"
                      :type="obscurePassword ? 'password' : 'text'"
                      id="password"
                      class="form-control"
                      placeholder=""
                      @input="validatePassword"
                  />
                  <div class="input-group-append" data-password="false">
                    <div class="input-group-text" @click="obscurePassword = !obscurePassword">
                      <span class="password-eye"></span>
                    </div>
                  </div>
                </div>

                <!-- Popover for Password Requirements -->
                <b-popover
                    target="password"
                    triggers="focus"
                    placement="top"
                    :show="showPopover"
                    class="popover-custom"
                >
                  <ul>
                    <li :class="{'text-success': isLengthValid}">At least 8 characters</li>
                    <li :class="{'text-success': hasLowercase}">At least one lowercase letter</li>
                    <li :class="{'text-success': hasUppercase}">At least one uppercase letter</li>
                    <li :class="{'text-success': hasNumber}">At least one number</li>
                    <li :class="{'text-success': hasSpecialChar}">At least one special character (e.g. 1@#$%^&*)</li>
                  </ul>
                </b-popover>
              </div>

              <div class="form-group mb-0 text-center">
                <button class="btn btn-dark btn-block" :disabled="!isPasswordValid" v-if="!loading" type="submit">
                  Update password and login
                </button>
                <b-button variant="dark" disabled class="btn-dark btn-block ml-1" v-else>
                  <b-spinner small class="mr-1"></b-spinner>&nbsp;Loading...
                </b-button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </Auth>
</template>

<script>
import Auth from "../../layouts/auth";
import appConfig from "../../../../app.config.json";
import {userService} from "@/apis/user.service";

export default {
  page: {
    title: "Reset-password",
    meta: [{name: "description", content: appConfig.description}],
  },
  data() {
    return {
      password: "",
      loading: false,
      isResetError: false,
      error: null,
      obscurePassword: true,
      showPopover: false,
      isLengthValid: false,
      hasLowercase: false,
      hasUppercase: false,
      hasNumber: false,
      hasSpecialChar: false,
      email: this.$route.query.email,
      token: this.$route.query.token
    };
  },
  components: {
    Auth,
  },
  computed: {
    isPasswordValid() {
      return (
          this.isLengthValid &&
          [this.hasLowercase, this.hasUppercase, this.hasNumber, this.hasSpecialChar].filter(Boolean).length >= 3
      );
    },
  },
  methods: {
    validatePassword() {
      const password = this.password;
      this.isLengthValid = password.length >= 8;
      this.hasLowercase = /[a-z]/.test(password);
      this.hasUppercase = /[A-Z]/.test(password);
      this.hasNumber = /\d/.test(password);
      this.hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
      this.showPopover = !this.isPasswordValid;
    },
    async tryToReset() {
      this.loading = true
      userService.resetPassword({
        email: this.email,
        token: this.token,
        password: this.password
      }).then((response) => {
        this.loading = false
        const {status, message} = response
        if (!status) {
          this.error = message;
          this.isResetError = true
        } else {
          this.LogIn();
        }
      });
    },

    LogIn() {
      this.$store.dispatch("login", {
        email: this.email,
        password: this.password,
      }).then(()=>{
        this.$router.push('/');
      }).catch(()=>{});
      this.$store.dispatch("clear");
    },
  },
};
</script>