import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'todo',
      component: () => import('../components/Notes.vue')
      // component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../components/auth/Login.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../components/auth/Signup.vue')
    }
  ]
})

export default router
