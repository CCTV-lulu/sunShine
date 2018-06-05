// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './router/App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import 'lib-flexible/flexible.js'
import SiderBar from '@/components/SiderBar'
import Header from '@/components/Header'
import Audio from '@/components/Audio'
import Video from '@/components/Video'
import Sublist from '@/components/Sublist'
import VueMarkdown from 'vue-markdown'

Vue.http.get('../static/config.json').then(function (result) {
  var APP_ID = result.body.appId;
  var APP_KEY = result.body.appKey;
  AV.init({
    appId: APP_ID,
    appKey: APP_KEY
  });
  window.GLOBAL ={};
  window.GLOBAL.analytics = AV.analytics({
    appId: APP_ID,
    appKey: APP_KEY,
    version: '1.8.6',
  })
  init()
})


Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.component('SiderBar', SiderBar)
Vue.component('Header',Header)
Vue.component('Audio',Audio)
Vue.component('Video',Video)
Vue.component('VueMarkdown',VueMarkdown)
Vue.component('Sublist',Sublist)

/* eslint-disable no-new */
function init() {
  new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
  })
}

