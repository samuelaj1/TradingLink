<template>
  <div>
    <div class="row">
      <!-- My Chats Section -->
      <div class="col-md-12">
        <div class="card mb-4">
          <div class="card-header">
            <h5>My chats</h5>
          </div>
          <div class="card-body">
            <p>You didn't start a chat with any tradespeople yet. Start a chat to get your job done soon.</p>
          </div>
        </div>
      </div>

      <div class="col-md-12">
        <div class="card mb-4">
          <div class="card-header">
            <h5>Interested tradespeople</h5>
          </div>
          <div class="card-body">
            <p>Tradespeople interested in your job will show here.</p>
            <p>Waiting for more tradespeople</p>
          </div>
        </div>
      </div>

      <!-- Get More Responses Section -->
      <div class="col-md-12">
        <div class="card mb-4">
          <div class="card-header">
            <h5>Get more responses</h5>
          </div>
          <div class="card-body">
            <p>Invite 10 more recommended tradespeople to get more responses.</p>
            <button class="btn btn-primary">Share you job 10 more tradespeople to get more responses</button>
          </div>
        </div>
      </div>

      <div class="col-md-12 text-center">
        <router-link :to="'/tradesperson-recommendation/'+job_id" class="btn btn-link">View recommended tradespeople</router-link>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "homeownerSidebar",
  data() {
    return {
      user: this.$store.getters.GET_USER_INFO || {},
      job_id: null,
    };
  },
  computed: {

  },
  watch: {

  },
  methods: {
  },
  created() {
    this.job_id = this.$route.params.id
    if (!this.job_id) {
      this.$router.push('/unauthorized');
    }
  },
};
</script>

