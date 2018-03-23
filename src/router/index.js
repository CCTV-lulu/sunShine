import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/page/Login'
import Song from '@/page/Song'
import Music from '@/page/Music'
import Read from '@/page/Read'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/song',
      name: 'Song',
      component: Song
    },
    {
      path: '/music',
      name: 'Music',
      component: Music
    },
    {
      path: '/read',
      name: 'Read',
      component: Read
    }

  ]
})
