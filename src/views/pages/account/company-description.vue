<template>
  <BaseDashboardLayout>
    <template v-slot:title>
      <h4 class="title mb-5">Company Description</h4>
    </template>
    <h5>Guarantee</h5>
    <p class="font-weight-lighter">Increase your chances of getting hired by offering a guarantee.</p>
    <small class="font-weight-lighter">
      <i class="bi bi-info-circle"></i> Homeowners are aware guarantees vary and should discuss the terms in advance.
    </small>
    <div class="row mt-4 mb-5">
      <div class="col-md-8">
        <div class="card mb-3">
          <div class="card-body d-flex align-items-center justify-content-start">
            <label for="yes" class="form-check-label cursor-pointer">
              <input type="radio" id="yes" value="yes" class="form-check-input" name="guarantee"> Yes, I offer a
              guarantee
            </label>
          </div>
        </div>
        <div class="card mb-3">
          <div class="card-body d-flex align-items-center justify-content-start">
            <label for="no" class="form-check-label cursor-pointer">
              <input type="radio" id="no" value="no" class="form-check-input" name="guarantee"> No, I do not offer a
              guarantee
            </label>
          </div>
        </div>
        <div class="button mt-4">
            <button class="btn primry-btn-2 d-inline-block text-light big-button" @click="save">Save</button>
        </div>
      </div>
    </div>
  </BaseDashboardLayout>
</template>

<script>
import BaseDashboardLayout from '../../base-layout/tradesperson-dashboard';
import appConfig from "../../../../app.config.json";

export default {
  page: {
    title: "Company Description",
    meta: [{name: "description", content: appConfig.description}]
  },
  components: {
    BaseDashboardLayout
  },
  methods: {
    save() {
      // Logic to save the guarantee option
      console.log("Guarantee option saved");
    }
  },
  mounted() {
    $('#company-description').addClass('active')
  },
};
</script>

<style scoped>

</style>
