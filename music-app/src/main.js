import Vue from 'vue';
import 'lib-flexible'; // 引入手淘移动端适配
import 'jquery'; // 引入jQuery
import 'bootstrap/dist/css/bootstrap.min.css'; // 引入bootstrap
import './assets/fonts/iconfont.css'; // 引入字体图标库
import './assets/css/common.css'; // 引入公共样式
import vueAwesomeSwiper from 'vue-awesome-swiper'; // 引入GitHub开源轮播图插件
import 'swiper/dist/css/swiper.css'; // 引入轮播图css样式
import VueLazyload from 'vue-lazyload'; // 引入vue懒加载插件
import App from './App.vue';
import router from './router';
import store from './store/index';

Vue.config.productionTip = false;
// 全局使用轮播图插件
Vue.use(vueAwesomeSwiper);
// 全局使用vue-lazyload 懒加载插件
Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading: '/load.gif',
  attempt: 3
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
