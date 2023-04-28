import Vue from 'vue'
import Pagination from"@/components/Pagination"
import App from './App.vue'
import router from './router'
import TypeNav from "@/components/TypeNav";
import Carsousel from "@/components/Carousel";
import store from './store';
import "swiper/css/swiper.css"
import"@/mock/mockServe"
import * as API from"@/api"
import { MessageBox } from 'element-ui';
import VueLazyload from 'vue-lazyload';
import atm from"@/assets/logo.png"
import "@/plugins/validate"
Vue.component(TypeNav.name, TypeNav);
Vue.component(Carsousel.name, Carsousel);
Vue.component(Pagination.name, Pagination);
Vue.prototype.$alert=MessageBox.alert
Vue.prototype.$msgbox=MessageBox
Vue.config.productionTip = false
Vue.use(VueLazyload,{
  //懒加载默认图
  loading:atm

})
new Vue({
  render: h => h(App),
  beforeCreate(){
    Vue.prototype.$bus=this;
    Vue.prototype.$API=API;
  },
  //组成路由
  router,
  store
}).$mount('#app')
