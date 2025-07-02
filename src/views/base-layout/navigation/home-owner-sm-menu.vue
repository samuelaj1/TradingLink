<template>
  <div class="settings-container container">
    <div class="container mt-4">
      <!-- Header Section -->
      <div class="mb-4">
        <h2 class="">Responses to your job: headline and all the details</h2>
        <div>
          <router-link :to="'/my-projects/'+job_id" class="btn btn-link me-2 text-primary-1">View details</router-link>
          <button class="btn btn-link me-2 text-primary-1">Edit</button>
          <button class="btn btn-link text-primary-1">Close job</button>
        </div>
      </div>

      <!-- My Chats Section -->
      <div class="card mb-3">
        <div class="card-body">
          <h5 class="card-title">My chats</h5>
          <p class="card-text">You didn't start a chat with any tradespeople yet. Start a chat to get your job done soon.</p>
        </div>
      </div>

      <!-- Interested Tradespeople Section -->
      <div class="card mb-3">
        <div class="card-body">
          <h5 class="card-title">Interested tradespeople</h5>
          <p class="card-text">Tradespeople interested in your job will show here.</p>
        </div>
      </div>

      <!-- Get More Responses Section -->
      <div class="card mb-3">
        <div class="card-body">
          <h5 class="card-title">Get more responses</h5>
          <p class="card-text"><span class="text-decoration-underline">Invite 10</span> more recommended tradespeople to get more responses.</p>
        </div>
      </div>

      <!-- View Recommended Tradespeople Button -->
      <div class="d-grid gap-2">
        <router-link :to="'/tradesperson-recommendation/'+job_id" class="btn btn-primary rounded-pill">View recommended tradespeople</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "homeownerSmMenu",
  data() {
    return {
      user: this.$store.getters.GET_USER_INFO || {},
      isMobile: false,
      job_id: null
    };
  },
  computed: {

  },
  watch: {
    // Watch the Vuex store getter directly and update local user data
    '$store.getters.GET_USER_INFO': {
      handler(newUser) {
        this.user = newUser || {};
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    checkScreenSize() {
      this.isMobile = window.innerWidth < 768;
      if (!this.isMobile) {
        this.$router.push('/my-projects/' + this.job_id);
      }
    }
  },
  created() {
     this.job_id = this.$route.params.id
    if (!this.job_id) {
      this.$router.push('/unauthorized');
    }

  },
  mounted() {
    this.checkScreenSize();
    window.addEventListener('resize', this.checkScreenSize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkScreenSize);
  }
};
</script>

<style scoped>

</style>
