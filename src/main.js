// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from "./store"

Vue.config.productionTip = false

import MintUI from "mint-ui"
import 'mint-ui/lib/style.css'
Vue.use(MintUI);

import Vant from "vant"
import 'vant/lib/vant-css/index.css';
Vue.use(Vant);

import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from "element-ui"
Vue.use(ElementUI);

import component from './component';
component(Vue);

import 'vue-video-player/src/custom-theme.css';
import 'video.js/dist/video-js.css'
import VideoPlayer from 'vue-video-player';
Vue.use(VideoPlayer)

import wx from "weixin-js-sdk"

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
