import { createRouter, createWebHistory } from 'vue-router'
import About from '../views/AboutView.vue'
import Home from '../views/HomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
  ]
})
// console.log(router)
export default router
