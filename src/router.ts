import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './views/Home.vue'
import Quiz from './views/Quiz.vue'
import Results from './views/Results.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/quiz', component: Quiz },
  { path: '/results', component: Results },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
