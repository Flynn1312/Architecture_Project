
import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/home.vue'
import LoginView from '../views/login.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: HomeView
    },
    {
      path: '/login',
      component: LoginView
    }
  ]
})

export default router
