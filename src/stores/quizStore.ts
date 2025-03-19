import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useQuizStore = defineStore('quiz', () => {
  const apiKey = ref('')
  const topic = ref('')
  const difficulty = ref(10)
  const questions = ref<any[]>([])
  const answers = ref<any[]>([])
  const startTime = ref<number | null>(null)
  const endTime = ref<number | null>(null)

  const setApiKey = (key: string) => {
    apiKey.value = key
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
  }

  const finishQuiz = () => {
    endTime.value = Date.now()
  }

  const getTimeElapsed = computed(() => {
    if (startTime.value && endTime.value) {
      return (endTime.value - startTime.value) / 1000 // Temps en secondes
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
    setTopic,
    setDifficulty,
    setQuestions,
    startQuiz,
    finishQuiz,
    getTimeElapsed,
  }
})
