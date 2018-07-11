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
import Analytics from "@/js/analytics.js"


Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.component('SiderBar', SiderBar)
Vue.component('Header',Header)
Vue.component('Audio',Audio)
Vue.component('Video',Video)
Vue.component('VueMarkdown',VueMarkdown)
Vue.component('Sublist',Sublist)

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
  checkoutUser()
})

/* eslint-disable no-new */

function checkoutUser() {
  router.beforeEach((to, from, next) => {
    var currentUser = AV.User.current();
    if (to.path === '/') {
      next()
    } else {
      if (currentUser) {
        Vue.prototype.currentUser = currentUser.toJSON().username
        next()
      }
      else {
        next({path: '/'})
      }
    }
  });
  init();
}
function init() {
  new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
  })
  var currentUser = AV.User.current();
  if(currentUser != null){
    burPointOpenApp(currentUser.toJSON().objectId)
    localStorage.setItem('openTime',new Date().getTime())
    checkClose(currentUser.toJSON().objectId,window.localStorage.getItem('openTime'))
  }

}

function burPointOpenApp (userId){
  var self = this
  Analytics.openApp(userId)
}
function checkClose(userId,startTime) {
  window.addEventListener("unload", function (event) {
    var endtime=new Date().getTime()
    Analytics.useApp(userId,startTime,endtime)
  });
}
function test() {
  var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
  var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
  var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
  var isIE11 = userAgent.indexOf("rv:11.0") > -1; //判断是否是IE11浏览器
  var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
  
}




