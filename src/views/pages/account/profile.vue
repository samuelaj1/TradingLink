<template>
  <BaseDashboardLayout>
    <template v-slot:title>
      <h4 class="title mb-5">Profile</h4>
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
    title: "Profile",
    meta: [{ name: "description", content: appConfig.description }]
  },
  components: {
    BaseDashboardLayout
  },
};
</script>

<style scoped>

</style>