import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import DashBoard from '../pages/Dashboard.vue'

const routes = [
  { path: '/', component: LandingPage },
  { path: '/dashboard', component: DashBoard }
]

export default createRouter({
  // eslint-disable-next-line no-undef
  history: createWebHistory(process.env.BASE_URL),
  routes,
  sensitive: true,
  strict: true
})
