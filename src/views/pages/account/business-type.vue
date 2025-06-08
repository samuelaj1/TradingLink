<template>
  <div>
    <topHeader></topHeader>
    <div class="login-area mt-50 mb-120">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">

            <div class="d-flex align-items-center justify-content-between mb-4">
              <h1 class="fw-bold mb-0">Work Details</h1>

              <router-link to="/professions" class="ms-auto">
                <a href="#" class="text-decoration-underline me-2">Cancel</a>
                <a href="#" aria-label="Close"><i class="fa fa-times"></i></a>
              </router-link>
            </div>

            <div class="progress">
              <div class="progress-bar w-25 bg-primary-1" role="progressbar"></div>
            </div>

            <div class="d-flex align-items-center justify-content-between mt-3">
              <h6 class=" mb-0">Step 1/5</h6>
              <div class="ms-auto cursor-pointer">
                <a @click="showModal = true" class="me-2" aria-label="Close"><i class="fa fa-info-circle"></i></a>
                <a @click="showModal = true" class="text-decoration-underline">All Steps</a>
              </div>

            </div>
            <form @submit.prevent="save">

            <div class="form-wrapper mt-5">
              <h3 class="font-weight-bold mb-4">What type of business do you have?</h3>

                <div class="profession-list">
                  <div class="profession-item">
                    <label for="technician" class="form-check-label">Limited company (LTD)</label>
                    <input type="radio" id="technician" value="Limited company (LTD)" v-model="business_type"
                           class="form-check-input">
                  </div>
                  <div class="profession-item">
                    <label for="fitter" class="form-check-label">Ordinary partnership</label>
                    <input type="radio" id="fitter" value="Ordinary partnership" v-model="business_type"
                           class="form-check-input">
                  </div>
                  <div class="profession-item">
                    <label for="bricklayer" class="form-check-label">Limited liability partnership (LLP)</label>
                    <input type="radio" id="bricklayer" value="Limited liability partnership (LLP)"
                           v-model="business_type" class="form-check-input">
                  </div>
                </div>

                <div class="button-container mt-5">
                  <div class="col-12">
                    <button class="btn btn-outline-primary-1 me-3 big-button" @click="$router.go(-1)">Back</button>
                    <button class="btn primry-btn-2 d-inline-block text-light big-button" type="submit">
                      Continue
                    </button>
                  </div>
                </div>

            </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!--    steps modal-->
    <div v-if="showModal" class="modal fade show" data-backdrop="true">
      <div class="modal-dialog modal-dialog-scrollable" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Complete your registration</h5>
            <button type="button" class="btn-close" @click="showModal = false" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="registration-steps">
              <div class="step completed">
                <span class="step-icon">✓</span>
                <span class="step-text">Work details</span>
              </div>
              <div class="step completed">
                <span class="step-icon">✓</span>
                <span class="step-text">ID Check</span>
              </div>
              <div class="step completed">
                <span class="step-icon">✓</span>
                <span class="step-text">Safety & Quality</span>
              </div>
              <div class="step">
                <span class="step-icon">4</span>
                <span class="step-text">Profile Setup</span>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="showModal = false">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Backdrop -->
    <div v-if="showModal" class="modal-backdrop fade show" @click="showModal=false"></div>

  </div>
</template>

<script>
import Auth from "../../layouts/auth";
import appConfig from "../../../../app.config";
import topHeader from '../../base-layout/header-1'

import {required, email} from "vuelidate/lib/validators";
import store from "@/store/store";
import {userService} from "@/apis/user.service";

/**
 * Business Type component
 */
export default {
  page: {
    title: "Business Type",
    meta: [{name: "description", content: appConfig.description}],
  },
  data() {
    return {
      showModal: false,
      isLoading: false,
      business_type: 'Limited company (LTD)',
    };
  },
  components: {
    Auth,
    topHeader
  },
  created() {
  },
  methods: {
    async save() {
      this.isLoading = true
      await this.$store.dispatch('showLoader')
      userService.businessType({
        business_type: this.business_type,
      }).then((res) => {
        this.$store.dispatch('hideLoader')
        this.isLoading = false
        const {status, message} = res;
        if (!status) {
          this.$store.dispatch('error', {message: message, showSwal: true})
          return;
        }
        this.$router.push('/business-details')
      });
    },
  },
  mounted() {
  },
};
</script>

<style scoped>
/* Ensure the modal is displayed */
.modal.show {
  display: block;
}

.modal-dialog {
  position: relative;
  max-width: 500px !important;
}

.registration-steps {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.step {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background-color: #f8f9fa;
  border-radius: 5px;
}

.step.completed {
  background-color: #e9f7ef;
  color: #28a745;
}

.step-icon {
  font-weight: bold;
}


.progress-bar {
  height: 100%;
  background-color: var(--primary-color1);
  width: 20%; /* Adjust based on step */
}


.profession-item {
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 20px 15px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.profession-item label{
  font-weight: lighter;
  cursor: pointer;
}

</style>
