<template>
  <div>
    <topHeader/>
    <div class="container mt-5" style="margin-bottom: 7rem">
      <div class="row">
        <div class="col-md-8">
          <div class="fm-margin m-md-0" style="margin: 0 20px;">
            <div class="mb-5">
              <h1 class="mb-4">Congratulations!</h1>
              <p class="fw-lighter mb-4">Your job has been posted successfully. Thank you!</p>
              <h5 class="fw-bold mb-2">What happens now?</h5>
              <p>We will notify tradespeople about your job shortly. If someone is interested, you'll receive a notification by email.</p>
              <button class="btn btn-primary mt-4 mb-5 custom-block-btn" style="height: 3rem">View your job</button>

              <p>Looking for help with other jobs around the house?</p>
              <button class="btn big-button btn-outline-primary-1 mb-5 custom-block-btn">Post another project</button>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import topHeader from '../../base-layout/navigation/homeowner-menu'
import appConfig from "../../../../app.config.json";

export default {
  name: "ServiceRequestPosted",
  page: {
    title: "Service Request Posted | " + appConfig.name + "",
    meta: [{name: "description", content: appConfig.description}]
  },
  components: {
    topHeader,
  },

  data() {
    return {
      place: null,
      user: this.$store.getters.GET_USER_INFO,
      trades: [],
      selectedTradeName: '',
      selectedTrade: '',
      rootQuestions: [],
      questions: [],
      currentQuestionIndex: 0,
      answers: {},
      selectedOption: null,
      nextButton: true,
      isLoading: false,
      headline: '',
      lastQuestion: false,
      showHeadline: true,
      showAddPhoto: false,
      showLocationView: false,
      showAuthView: false,
      navButtonPosition: '',
      photo: '',
      dropzoneOptions: {
        url: '#',
        maxFilesize: 20.0,
        addRemoveLinks: true,
        autoProcessQueue: false,
        maxFiles: 1
      },
      cityName: '',
      parishName: '',
    };
  },

  computed: {
    // google: googleApi,
  },
  methods: {
  },
  mounted() {
    this.$nextTick(() => {
      $('.sidebar-button').on("click", function () {
        $('.main-menu').addClass('show-menu');
      });

      $('.menu-close-btn').on("click", function () {
        $('.main-menu').removeClass('show-menu');
      });
// mobile-search-area

      $('.search-btn').on("click", function () {
        $('.mobile-search').addClass('slide');
      });


      $('.search-cross-btn').on("click", function () {
        $('.mobile-search').removeClass('slide');
      });
    });
  },
};
</script>

<style scoped>

@media (max-width: 576px) {
  .custom-block-btn{
    width: 100% !important;
  }
}


</style>
