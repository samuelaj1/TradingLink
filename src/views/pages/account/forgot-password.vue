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
            <div v-if="step===1">
              <h3 class="text-center">Reset your password</h3>
              <p class="text-muted  text-center mb-4 mt-3">
                Tell us the email for your account and we'll send a password reset link.
              </p>
              <form @submit.prevent="tryToReset">
                <b-alert
                    v-model="isResetError"
                    class="mb-4"
                    variant="danger"
                    dismissible
                >{{ error }}
                </b-alert
                >
                <div class="form-group mb-3">
                  <label for="email-address">Email address</label>
                  <div class="input-group input-group-merge">
                    <div class="input-group-append" data-password="false">
                      <div class="input-group-text">
                        <span class="fa fa-envelope"></span>
                      </div>
                    </div>
                    <input
                        required
                        v-model="email"
                        type="text"
                        id="password"
                        class="form-control"
                        placeholder=""
                    />

                  </div>

                </div>

                <div class="form-group mb-0 text-center">
                  <button class="btn btn-dark btn-block" v-if="!loading" type="submit">
                    Reset Password
                  </button>
                  <b-button variant="dark" disabled class="btn-dark btn-block ml-1" v-else>
                    <b-spinner small class="mr-1"></b-spinner>&nbsp;Loading...
                  </b-button>
                </div>
              </form>
            </div>
            <div v-if="step===2" class="text-center">
              <h3>Please check your email</h3>
              <p>We just sent a reset link to {{ email }}. If you haven’t received it after a few minutes, check your
                spam folder. If it’s not there, you may have signed up with a different email.</p>
              <button class="btn btn-dark btn-block mt-3" @click="tryToReset" v-if="!loading" type="submit">
                Resend email
              </button>
              <b-button variant="dark" disabled class="btn-dark btn-block ml-1" v-else>
                <b-spinner small class="mr-1"></b-spinner>&nbsp;Loading...
              </b-button>
            </div>
          </div>
          <!-- end card-body -->
        </div>
        <!-- end card -->

        <div class="row mt-3">
          <div class="col-12 text-center">
            <router-link to="/login" class="text-danger font-weight-medium ml-1"><i class="fa fa-arrow-left"/> Back to
              Log in
            </router-link>
          </div>
          <!-- end col -->
        </div>
        <!-- end row -->
      </div>
      <!-- end col -->
    </div>
    <!-- end row -->
  </Auth>
</template>

<script>
import Auth from "../../layouts/auth";
import appConfig from "../../../../app.config";

import {required, email} from "vuelidate/lib/validators";
import {userService} from "@/apis/user.service";

/**
 * Forgot-password component
 */
export default {
  page: {
    title: "Forgot-password",
    meta: [{name: "description", content: appConfig.description}],
  },
  data() {
    return {
      email: "",
      loading: false,
      isResetError: false,
      error: null,
      step: 1
    };
  },
  components: {
    Auth,
  },
  methods: {
    async tryToReset() {
      await this.$store.dispatch('showLoader')
      userService.forgotPassword({
        email: this.email
      }).then(() => {
        this.$store.dispatch('hideLoader')
        this.step = 2
      });
    },
  },
};
</script>