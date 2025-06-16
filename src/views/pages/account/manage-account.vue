<template>
  <BaseDashboardLayout>
    <template v-slot:title>
      <h4 class="title mb-5">Manage account</h4>
    </template>
    <div class="row mt-4 mb-5">
      <div class="col-md-8">
      </div>
    </div>
  </BaseDashboardLayout>
</template>

<script>
import BaseDashboardLayout from '../../base-layout/tradesperson-dashboard';
import appConfig from "../../../../app.config.json"; // Adjust the import path as necessary

export default {
  page: {
    title: "Manage Account",
    meta: [{ name: "description", content: appConfig.description }]
  },
  components: {
    BaseDashboardLayout
  },
  mounted() {
    $('#manage-auth').addClass('active')
  },
};
</script>

<style scoped>

</style>