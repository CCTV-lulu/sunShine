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
  init();
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

}
function init() {
  new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
  })
  var currentUser = AV.User.current();
  burPointOpenApp(currentUser.toJSON().objectId)
  checkClose()
}

function burPointOpenApp (userId){
  var self = this
  Analytics.openApp(userId)
}
function burPointUseTime(userName) {
  var self = this
  var actionList = ['userUseTime']
  Analytics.analytics(actionList,'',userName,'')
}
function checkClose() {
  console.log('-------------')
  window.onbeforeunload = function(e) {
    e = e || window.event;
    var msg = "您确定要离开此页面吗？";

    // IE
    e.cancelBubble = true;
    e.returnValue = msg;

    // Firefox
    if(e.stopPropagation) {
      e.stopPropagation();
      e.preventDefault();
    }

    // Chrome / Safari
    alert(msg)
  };
}


