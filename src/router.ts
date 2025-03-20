import { createRouter, createWebHashHistory } from 'vue-router'
import { useQuizStore } from './stores/quizStore'
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

router.beforeEach(() => {
  const quizStore = useQuizStore()
  if (quizStore.quizEnCours) {
    const doIWantToQuit = confirm(
      'Vous êtes en train de faire un quiz. Voulez-vous vraiment quitter ?',
    )
    if (doIWantToQuit) {
      quizStore.cancelQuiz()
      return true
    } else {
      return false
    }
  }
  return true
})
