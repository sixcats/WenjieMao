import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/layout',
      name: 'layout',
      component: () => import('../views/Layout.vue'),
      children:[
        {
          path: 'about',
          name: 'about',
          component: () => import('../views/About.vue')
        },
        {
          path: 'donate',
          name: 'donate',
          component: () => import('../views/Donate.vue')
        },
        {
          path:'volunteer',
          name: 'volunteer',
          component: () => import('../views/Volunteer.vue')

        }
      ]
    }
  ]
})

export default router
