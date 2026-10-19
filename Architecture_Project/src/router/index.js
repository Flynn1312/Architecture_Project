
import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '../views/login.vue'
import StudentView from '../views/student.vue'
import LecturerView from '../views/lecturer.vue'
import MLView from '../views/ml.vue'
import CLView from '../views/cl.vue'
import AAView from '../views/aa.vue'
import AdminView from '../views/admin.vue'

const router = createRouter({
  history: createWebHistory(),
  // Define the routes for the application
  routes: [
    {
      path: '/',
      component: LoginView
    },
    {
      path: '/student',
      component: StudentView
    },
    {
      path: '/register',
      component: () => import('../views/Register.vue')
    },
    {
      path: '/lecturer',
      component: LecturerView
    },
    {
      path: '/ml',
      component: MLView
    },
    {
      path: '/cl',
      component: CLView
    },
    {
      path: '/aa',
      component: AAView
    },
    {
      path: '/admin',
      component: AdminView
    }
  ]
})

export default router
