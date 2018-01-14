import Vue from 'vue'
import Router from 'vue-router'

import Design from '@/components/Design'
import Main from '@/components/Main'
import Coin from '@/components/Coin'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/coin/:coin',
      name: 'Coin',
      component: Coin
    },  
    {
      path: '/design',
      name: 'Design',
      component: Design
    },    
  ]
})
