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
import VueMarkdown from 'vue-markdown'

router.beforeEach((to, from, next) => {
  if(to.path === '/')  {
    next()
  } else {
    if (AV.User.current()) {
      //登录跳首页
      return next({ path: '/song' })
    }
    else {
      //未登录跳登录
      return next({ path: '/' })
    }
  }
})

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.component('SiderBar', SiderBar)
Vue.component('Header',Header)
Vue.component('Audio',Audio)
Vue.component('Video',Video)
Vue.component('VueMarkdown',VueMarkdown)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
