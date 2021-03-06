import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/page/Login'
import Song from '@/page/Song'
import Music from '@/page/Music'
import Read from '@/page/Read'
import Play from '@/page/Play'
import Healthy from '@/page/Healthy'
import Art from '@/page/Art'
import Language from '@/page/Language'
import Science from '@/page/Science'
import Social from '@/page/Social'
import LessonDetails from '@/page/LessonDetails'
import PictureLoop from '@/page/PictureLoop'
import ShowVideo from '@/page/showVideo'
import Collection from '@/page/Collection'
import Special from  '@/page/Special'
import SpecialList from '@/page/SpecialList'
import VueResource from 'vue-resource'

Vue.use(Router)
Vue.use(VueResource)

export default new Router({
  mode:'history',
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
    },
    {
      path: '/play',
      name: 'Play',
      component: Play
    },
    {
      path:'/lesson/:id',
      name:'LessonDetails',
      component:LessonDetails
    },
    {
      path:'/pictureLoop/:id',
      name:'PictureLoop',
      component:PictureLoop
    },
    {
      path:'/art',
      name:'Art',
      component:Art
    },
    {
      path:'/healthy',
      name:'Healthy',
      component:Healthy
    },
    {
      path:'/language',
      name:'Language',
      component:Language
    },
    {
      path:'/science',
      name:'Science',
      component:Science
    },
    {
      path:'/social',
      name:'Social',
      component:Social
    },
    {
      path:'/video/:id',
      name:'viedo',
      component:ShowVideo
    },
    {
      path:'/collection',
      name:'collection',
      component:Collection
    },
    {
      path:'/special',
      name:'special',
      component:Special
    },
    {
      path:'/specialList/:id',
      name:'specialList',
      component:SpecialList
    }

  ]
})
