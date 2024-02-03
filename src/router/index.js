import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../pages/LandingPage.vue'
import DashBoard from '../pages/Dashboard.vue'
import ProfilePage from '../pages/ProfilePage.vue'

const routes = [
  { path: '/', component: LandingPage },
  { path: '/profile', component: ProfilePage },
  { path: '/dashboard', component: DashBoard }
]

export default createRouter({
  // eslint-disable-next-line no-undef
  history: createWebHistory(process.env.BASE_URL),
  routes,
  sensitive: true,
  strict: true
})
