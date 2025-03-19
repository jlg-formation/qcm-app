import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useQuizStore = defineStore('quiz', () => {
  const apiKey = ref(localStorage.getItem('openai_api_key') || '') // 🔥 Charge la clé depuis localStorage
  const topic = ref('')
  const difficulty = ref(10)
  const questions = ref<any[]>([])
  const answers = ref<any[]>([])
  const startTime = ref<number | null>(null)
  const endTime = ref<number | null>(null)

  const setApiKey = (key: string) => {
    apiKey.value = key
    localStorage.setItem('openai_api_key', key) // 🔥 Sauvegarde la clé API
  }

  const clearApiKey = () => {
    apiKey.value = ''
    localStorage.removeItem('openai_api_key') // 🔥 Supprime la clé si l'utilisateur veut la modifier
  }

  const setTopic = (newTopic: string) => {
    topic.value = newTopic
  }

  const setDifficulty = (level: number) => {
    difficulty.value = level
  }

  const setQuestions = (newQuestions: any[]) => {
    questions.value = newQuestions
  }

  const startQuiz = () => {
    startTime.value = Date.now()
    resetQuiz()
  }

  const finishQuiz = () => {
    endTime.value = Date.now()
  }

  const resetQuiz = () => {
    questions.value = []
    answers.value = []
    startTime.value = null
    endTime.value = null
  }

  const getTimeElapsed = computed(() => {
    if (startTime.value && endTime.value) {
      return (endTime.value - startTime.value) / 1000
    }
    return 0
  })

  return {
    apiKey,
    topic,
    difficulty,
    questions,
    answers,
    startTime,
    endTime,
    setApiKey,
    clearApiKey,
    setTopic,
    setDifficulty,
    setQuestions,
    startQuiz,
    finishQuiz,
    resetQuiz,
    getTimeElapsed,
  }
})
