import Vue from 'vue'
import Router from 'vue-router'

import Design from '@/components/Design'
import Main from '@/components/Main'
import Currency from '@/components/Currency'

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
      path: '/currency/:currency',
      name: 'Currency',
      component: Currency
    },  
    {
      path: '/design',
      name: 'Design',
      component: Design
    },    
  ]
})
