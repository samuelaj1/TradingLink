<template>
  <div>
    <homeOwnerHeader v-if="isHomeOwner"/>

    <topHeader v-else/>
    <div class="py-5">

      <div class="container">
        <h1>This page isn't available</h1>

        <p>You can't view this page whilst logged in with this account.
          <router-link to="/Log out" class="text-decoration-underline">Logout.</router-link>
        </p>
      </div>
    </div>


    <div class="py-5 iJZMjH">
      <div class="container">
        <a href="/post-a-job" class="hOqzfX kFPtkB">
          <h2 class="text-light fw-bold">Post your job now</h2>
          <svg aria-hidden="true" focusable="false" data-prefix="fass" data-icon="circle-arrow-right"
               class="svg-inline--fa fa-circle-arrow-right " role="img" xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 512 512" fill="currentColor" color="#FFFFFF" style="width: 1.5rem; height: 1.5rem;">
            <path fill="currentColor"
                  d="M0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zm409 17L297 385l-17 17L246.1 368l17-17 71-71L120 280l-24 0 0-48 24 0 214.1 0-71-71-17-17L280 110.1l17 17L409 239l17 17-17 17z"></path>
          </svg>
        </a>
      </div>
    </div>

    <HomeFooter></HomeFooter>

  </div>

</template>

<script>
import HomeFooter from '../../base-layout/footer'
import topHeader from '../../base-layout/navigation/home-menu'
import appConfig from "../../../../app.config.json";
import {userService} from "@/apis/user.service";
import store from "@/store/store";
import homeOwnerHeader from "@/views/base-layout/navigation/homeowner-menu";

export default {
  name: "Home",
  page: {
    title: "Home",
    meta: [{name: "description", content: appConfig.description}]
  },
  data() {
    return {
      trades: [],
      tradesLoader: false
    };
  },
  computed: {
    isHomeOwner() {
      const loggedUser = store.getters.GET_USER_INFO;
      const userRole = loggedUser.roles?.[0] || '';
      return userRole === 'homeowner';
    }
  },
  components: {
    HomeFooter,
    topHeader,
    homeOwnerHeader
  },
  methods: {
    async getTrades() {
      this.tradeLoader = true
      userService.getTrades(6).then((res) => {
        this.trades = res.extra;
        this.tradeLoader = false
      });
    },
  },
  created() {
    this.getTrades();
  },
  mounted() {
    this.$nextTick(() => {
      $('body').addClass('bg-wight')
      $('.select1').niceSelect();
      $('#slick1').slick({
        rows: 2,
        dots: false,
        arrows: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 2000,
        speed: 2000,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [{
          breakpoint: 1200,
          settings: {
            arrows: false,
            slidesToShow: 2
          }
        }, {
          breakpoint: 991,
          settings: {
            arrows: false,
            slidesToShow: 2
          }
        }, {
          breakpoint: 768,
          settings: {
            arrows: false,
            slidesToShow: 1
          }
        }, {
          breakpoint: 576,
          settings: {
            arrows: false,
            slidesToShow: 1
          }
        }, {
          breakpoint: 480,
          settings: {
            arrows: false,
            slidesToShow: 1
          }
        }, {
          breakpoint: 350,
          settings: {
            arrows: false,
            slidesToShow: 1
          }
        }]
      });
      new Swiper(".home5-feedback-slider", {
        slidesPerView: 2,
        spaceBetween: 20,
        loop: true,
        infinite: true,
        autoplay: false,
        speed: 1700,
        // autoplay: {
        //   delay: 2200,
        // },
        navigation: {
          nextEl: ".next-13",
          prevEl: ".prev-13",
        },
        breakpoints: {
          280: {
            slidesPerView: 1,
          },
          480: {
            slidesPerView: 1
          },
          768: {
            slidesPerView: 1
          },
          992: {
            slidesPerView: 1
          },
          1200: {
            slidesPerView: 2
          },
          1400: {
            slidesPerView: 2
          },
          1600: {
            slidesPerView: 2
          },
        }
      });

      $('.odometer').counterUp({
        delay: 10,
        time: 1000
      });

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
  }
}
</script>

<style scoped>
.kFPtkB {
  text-decoration: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.iJZMjH {
  background-color: var(--primary-color1);
  color: rgb(255, 255, 255);
}
</style>