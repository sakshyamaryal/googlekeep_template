import { createWebHistory, createRouter } from 'vue-router'
import { isAuthenticated } from '../components/auth/Authenticate'

const routes = [
  {
    path: '/home',
    name: 'notes',
    component: () => import('../components/Notes.vue'),
    meta: {
      requiresAuth: true // Add meta field to indicate protected route
    }
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
  },
  {
    path: '/users',
    name: 'users',
    component: () => import('../components/pages/Users.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/role',
    name: 'role',
    component: () => import('../components/pages/Role.vue'),
    meta: {
      requiresAuth: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isAuthenticated()) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
