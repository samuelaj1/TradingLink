<template>
  <div>
    <topHeader></topHeader>
    <div class="login-area mt-50 mb-120">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">

            <div class="d-flex align-items-center justify-content-between mb-4">
              <h1 class="fw-bold mb-0">Work Details</h1>

              <div class="ms-auto">
                <a href="#" class="text-decoration-underline me-2">Cancel</a>
                <a href="#" aria-label="Close"><i class="fa fa-times"></i></a>
              </div>
            </div>

            <div class="progress">
              <div class="progress-bar w-25 bg-primary-1" role="progressbar"></div>
            </div>

            <div class="d-flex align-items-center justify-content-between mt-3">
              <h6 class=" mb-0">Step 2/5</h6>
              <div class="ms-auto cursor-pointer">
                <a @click="showModal = true" class="me-2" aria-label="Close"><i class="fa fa-info-circle"></i></a>
                <a @click="showModal = true" class="text-decoration-underline">All Steps</a>
              </div>

            </div>
            <div class="form-wrapper mt-5">
              <h3 class="font-weight-bold mb-4">Which ID do you have?</h3>

              <div class="profession-list">
                <div class="profession-item">
                  <label for="design" class="form-check-label">
                    <img src="../../../../public/frontend/assets/images/icon/envlop-5.svg" alt="" style="height: 10px">
                    Passport
                  </label>
                  <input type="radio" id="design" name="profession" class="form-check-input">
                </div>
                <div class="profession-item">
                  <label for="technician" class="form-check-label">
                    <img src="../../../../public/frontend/assets/images/icon/user-2.svg" alt="" style="height: 20px">
                    Identity Card
                  </label>
                  <input type="radio" id="technician" name="profession" class="form-check-input">
                </div>
                <div class="profession-item">
                  <label for="fitter" class="form-check-label">
                    <img src="../../../../public/frontend/assets/images/icon/car-driving.svg" alt="" style="height: 20px">
                    Drivers Licence
                  </label>
                  <input type="radio" id="fitter" name="profession" class="form-check-input">
                </div>
              </div>

              <div class="row mt-5">
                <div class="col-12">
                  <button class="btn btn-outline-light text-primary-1 me-3 big-button" @click="$router.push('/verify-skills')">Upload later</button>
                  <button class="btn bg-primary-1 text-light big-button" @click="$router.push('/verify-skills')">Continue</button>
                </div>
              </div>

            </div>
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
      showModal: false,
      step: 2,
      center: { lat: 18.1096, lng: -77.2975 }, // Default center (London)
      radius: 10,
      circleOptions: {
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
      },
    };
  },
  components: {
    Auth,
    topHeader
  },

  watch: {

  },
  computed: {

  },
  created() {
  },
  methods: {
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
