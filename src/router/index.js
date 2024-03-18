import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/test.vue')
    },
    {
      path: '/school',
      name: 'school',
      component: () => import('@/views/tableForm/school.vue')
    },
    {
      path: '/school/create',
      name: 'schoolCreate',
      component: () => import('@/views/tableForm/create.vue')
    },
    {
      path: '/propEmit',
      component: () => import('@/views/propEmit/index.vue')
    },
    {
      path: '/plugin',
      component: () => import('@/views/plugin.vue')
    },
    {
      path: '/suspense',
      component: () => import('@/views/suspense/index.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
