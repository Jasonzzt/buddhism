import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '../components/MainPage.vue'
import BuddhismHomePage from '../components/BuddhismHomePage.vue'
import RecognitionPage from '../components/RecognitionPage.vue'
import BuddhaMessagePage from '../components/BuddhaMessagePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainPage
    },
    {
      path: '/buddhism',
      name: 'buddhism',
      component: BuddhismHomePage
    },
    {
      path: '/recognition',
      name: 'recognition',
      component: RecognitionPage
    },
    {
      path: '/message',
      name: 'message',
      component: BuddhaMessagePage
    }
  ]
})

export default router 