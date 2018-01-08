import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import Main from '@/components/Main'
import Currency from '@/components/Currency'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/main',
      name: 'Main',
      component: Main
    },
    {
      path: '/currency/:currency',
      name: 'Currency',
      component: Currency
    }  
  ]
})
