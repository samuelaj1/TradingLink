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
              <h5 class="title">Reviews</h5>

              <div class="row">
                <div class="col-md-8">
                  <div class="card">
                    <div class="card-body">
                      <h2 class="reviews-title">Reviews</h2>
                      <div class="rating-container">
                        <span class="rating-value">0</span>
                        <div class="rating-stars">
                          <i class="bi bi-star-fill"></i>
                          <i class="bi bi-star-fill"></i>
                          <i class="bi bi-star-fill"></i>
                          <i class="bi bi-star-fill"></i>
                          <i class="bi bi-star-fill"></i>
                        </div>
                        <span class="review-count">(0 reviews)</span>
                      </div>
                      <button class="request-review-btn">Request a review</button>
                    </div>
                  </div>
                  <p class="mt-3">Reviews (0)</p>

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

export default {
  data() {
    return {
      user: this.$store.getters.GET_USER_INFO,
      showSidebar: false,
      isMobile: false,
    };
  },
  components: {
    HomeFooter,
    topHeader,
    SideBar,
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

    $('#reviews').addClass('active')

  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkScreenSize);
  },
};
</script>

<style scoped>
/* Add any custom styles here */

.rating-container {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.rating-value {
  font-size: 24px;
  font-weight: bold;
  margin-right: 10px;
}

.rating-stars {
  color: #ffc107;
  margin-right: 5px;
}

.review-count {
  color: #6c757d;
  margin-left: 5px;
}

.request-review-btn {
  background-color: var(--primary-color1);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  font-weight: bold;
  width: 100%;
}

.reviews-title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
}
</style>
