<template>
  <div class="bg-wight">
  <topHeader></topHeader>

  <div class="dashboard-area pt-80 mb-120">
    <div class="container">
      <div class="row g-lg-4 gy-5 mb-90">
        <!-- Sidebar -->
        <div class="col-lg-3" v-show="showSidebar">
          <div class="dashboard-sidebar">
            <SideBar @link-clicked="toggleSidebar"></SideBar>
          </div>
        </div>

        <!-- Main Content -->
        <div class="col-lg-9 height-70" v-show="!showSidebar || !isMobile">
          <div class="mb-4" v-show="isMobile" @click="showSideBarMenu"><i class="bi bi-chevron-left"></i>
            Back to Menu
          </div>
          <div class="dashboard-inner">
            <div class="table-wrapper">
              <h5 class="title">Portfolio</h5>
              <div class="row">
                <div class="col-md-8">
                  <vue-dropzone
                      id="certificateDropzone"
                      ref="certificateDropzone"
                      :use-custom-slot="true"
                      :options="fileDropOptions"
                  >
                    <div class="dz-message needsclick">
                      <i class="bi bi-upload h1 text-muted"></i>
                      <h5>Select files, drag and drop, or take a photo with your camera.</h5>
                      <p class="font-weight-lighter">Drag or select your files (PNG, JPG)</p>
                    </div>
                  </vue-dropzone>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Footer -->
  <div v-show="!isMobile">
    <HomeFooter></HomeFooter>
  </div>
  </div>
</template>

<script>
import HomeFooter from '../base-layout/footer';
import topHeader from '../base-layout/header-2';
import SideBar from '../base-layout/tradesperson-sidebar';
import vue2Dropzone from "vue2-dropzone";
import 'vue2-dropzone/dist/vue2Dropzone.min.css';

export default {
  data() {
    return {
      user: this.$store.getters.GET_USER_INFO,
      showSidebar: false,
      isMobile: false,
      fileDropOptions: {
        url: '#',
        maxFilesize: 20.0,
        addRemoveLinks: true,
        autoProcessQueue: false,
        maxFiles: 1
      }

    };
  },
  components: {
    HomeFooter,
    topHeader,
    SideBar,
    vueDropzone: vue2Dropzone,
  },
  computed: {
    loggedIn() {
      return this.$store.getters.GET_USER_INFO;
    },
  },
  methods: {
    toggleSidebar() {
      if (this.isMobile) {
        this.showSidebar = !this.showSidebar;
      }
    },
    showSideBarMenu() {
      if (this.isMobile) {
        this.showSidebar = true;
      }
    },
    checkScreenSize() {
      this.isMobile = window.innerWidth < 992;
      this.showSidebar = !this.isMobile;
    },
  },
  mounted() {
    this.checkScreenSize();
    window.addEventListener('resize', this.checkScreenSize);
    $('body').addClass('bg-wight')

    $('#portfolio').addClass('active')

  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkScreenSize);
  },
};
</script>

<style scoped>
/* Add any custom styles here */
</style>
