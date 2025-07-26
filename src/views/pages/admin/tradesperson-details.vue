<template>
  <div>
    <topHeader />

    <div class="mt-4 text-end pe-4 container">
      <router-link to="/admin/tradespeople" class="mb-4">
        <i class="bi bi-chevron-left"></i> Back to Menu
      </router-link>
    </div>

    <div class="container py-4">
      <h3 class="mb-4">Trade Details for {{ trade.name }}</h3>

      <div v-if="loading" class="text-center my-4">
        <div class="spinner-border" role="status"></div>
      </div>

      <div v-else>
        <div class="row mb-3">
          <div class="col-md-6 mb-2">
            <strong>Email:</strong> {{ trade.email }}
          </div>
          <div class="col-md-6 mb-2">
            <strong>Phone:</strong> {{ trade.phone }}
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-md-6 mb-2">
            <strong>Location:</strong>
            {{ trade.city_name || 'N/A' }}, {{ trade.parish_name || 'N/A' }}
          </div>
          <div class="col-md-6 mb-2">
            <strong>Status:</strong> {{ trade.status }}
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-md-6 mb-2">
            <strong>Business Name:</strong> {{ trade.business_name || 'N/A' }}
          </div>
          <div class="col-md-6 mb-2">
            <strong>Business Type:</strong> {{ trade.business_type || 'N/A' }}
          </div>
        </div>

        <!-- Identity File -->
        <div class="row mb-4">
          <div class="col-md-12">
            <h5>Identity Document</h5>
            <div v-if="trade.identity_file">
              <a target="_blank" :href="trade.identity_file" class="btn btn-primary btn-sm"><i class="bi bi-eye"/> View Identity File</a>
              <b-button
                  variant="success"
                  size="sm"
                  class="ms-2"
                  :disabled="trade.identity_verified === 'verified'"
                  @click="verifyIdentity('identity')"
              >
                {{ trade.identity_verified === 'verified' ? 'Verified' : 'Verify Identity' }}
              </b-button>

            </div>
            <div v-else>
              <p><em>No identity document uploaded.</em></p>
            </div>
          </div>
        </div>

        <!-- Skills Verification -->
        <div class="row mb-4">
          <div class="col-md-12">
            <h5>Skills Verification</h5>
            <div v-if="trade.skill_verification_file">
              <a target="_blank" :href="trade.skill_verification_file" class="btn btn-primary btn-sm"><i class="bi bi-eye"/> View Skills File</a>
              <b-button
                  variant="success"
                  size="sm"
                  class="ms-2"
                  :disabled="trade.skills_verified === 'verified'"
                  @click="verifyIdentity('skills')"
              >
                {{ trade.skills_verified === 'verified' ? 'Verified' : 'Verify Skills' }}
              </b-button>
            </div>
            <div v-else>
              <p><em>No skills verification file uploaded.</em></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import topHeader from '../../base-layout/admin-top-nav';
import { userService } from '@/apis/user.service';
import appConfig from "../../../../app.config.json"; // your API service

export default {
  components: { topHeader },
  name:"Tradesperson",
  page: {
    title: "Tradesperson Details",
    meta: [{ name: "description", content: appConfig.description }]
  },
  data() {
    return {
      trade: {},
      loading: false,
    };
  },
  methods: {
    async fetchTradePerson() {

      this.loading = true;
      userService.getTradesperson(this.$route.params.id).then((res) => {
        this.loading = false;
        const {extra, status} = res;
        if (!status) {
          alert('Tradeperson not found');
          this.$router.back();
        }
        this.trade = extra;

      });

    },
    viewFile(path) {
      // Assuming your files are served via public storage or URL
      const url = `${process.env.VUE_APP_BASE_URL}/${path}`;
      window.open(url, '_blank');
    },
    async verifyIdentity(type) {
      try {
        // API call to verify identity or skills
        // Replace with your actual service call
        let res;
        if(type === 'identity'){
          res = await userService.verifyIdentityFile(this.trade.id);
          if(res.status){
            this.trade.identity_verified = 'verified';
            alert('Identity verified successfully!');
          }
        } else if(type === 'skills'){
          res = await userService.verifySkillsFile(this.trade.id);
          if(res.status){
            this.trade.skills_verified = 'verified';
            alert('Skills verified successfully!');
          }
        }
      } catch (err) {
        alert('Verification failed');
      }
    }
  },
  mounted() {
    this.fetchTradePerson();
  }
};
</script>
