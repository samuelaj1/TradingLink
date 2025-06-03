import Vue from 'vue'
import App from './App.vue'
// import BootstrapVue from 'bootstrap-vue'
import i18n from './i18n'
// import VueSlideBar from 'vue-slide-bar'
import './utils/filters'

import '../public/frontend/assets/js/main'



import router from './router'
import store from './store/store';

import "@/assets/scss/app-css.scss";


import ImageMagnifier from 'vue-image-magnifier'

Vue.use(ImageMagnifier)



Vue.config.productionTip = false

// Vue.use(vco)






// Vue.use(VueDraggable)
// Vue.use(VueQuillEditor)
// Vue.use(VueMask)
//
// Vue.component('VueSlideBar', VueSlideBar)



// Vue.component('apexchart', VueApexCharts)
// Vue.use(BootstrapVue)
// // Vue.use(Vuelidate)
// Vue.use(require('vue-chartist'))
// Vue.component('simplebar', simplebar)
// Vue.use(VueStringFilter)
// Vue.use(VueTour)
// Vue.use(Lightbox)



new Vue({
    router,
    store,
    i18n,
    render: h => h(App),
}).$mount('#app')
