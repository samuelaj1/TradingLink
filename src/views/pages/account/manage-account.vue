<template>
  <BaseDashboardLayout>
    <template v-slot:title>
      <h4 class="title mb-5 font-weight-bold">Manage account</h4>
    </template>
    <div class="row mt-4 mb-5">
      <div class="col-md-8">
        <ul class="list-group list-group-flush" v-if="loggedIn">
          <li class="list-group-item border-bottom d-flex justify-content-between align-items-center text-danger">
            <router-link to="/delete-account" class="d-flex align-items-center gap-2">
              <i class="bi bi-person-x-fill"></i>
              Delete Account
            </router-link>
            <i class="bi bi-chevron-right"></i>
          </li>
        </ul>
        <div class="card mt-4" v-else>
          <div class="card-body d-flex justify-content-between align-items-center">
            <div class="d-flex align-items-center">
              <div class="icon-circle bg-light rounded-circle d-flex align-items-center justify-content-center me-3">
                <i class="bi bi-lock-fill text-primary-1"></i>
              </div>
              <div>
                <h5 class="font-weight-bold">Verify account to access</h5>
                <p class="font-weight-lighter">To access your information, please authenticate your account.</p>
              </div>
            </div>
            <button class="btn btn-primary" @click="login">Verify account</button>
          </div>
        </div>
      </div>
    </div>
  </BaseDashboardLayout>
</template>

<script>
import BaseDashboardLayout from '../../base-layout/tradesperson-dashboard';
import appConfig from "../../../../app.config.json";

export default {
  name: "ManageAccount",
  page: {
    title: "Manage Account",
    meta: [{name: "description", content: appConfig.description}]
  },
  components: {
    BaseDashboardLayout
  },
  computed: {
    loggedIn() {
      return this.$store.getters.GET_USER_INFO && this.$store.getters.GET_USER_INFO.access_token;
    }
  },
  methods: {
    deleteAccount() {
      this.$router.push("/delete-account");
    },
    login() {
      this.$router.push("/auth-login?redirect-to=/manage-account");
    }
  },

  mounted() {
    $('#manage-auth').addClass('active')
  },
};
</script>

<style scoped>


</style>