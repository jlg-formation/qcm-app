import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useQuizStore = defineStore('quiz', () => {
  const apiKey = ref(localStorage.getItem('openai_api_key') || '')
  const topic = ref('')
  const difficulty = ref(10)
  const questions = ref<any[]>([])
  const answers = ref<any[]>([])
  const startTime = ref<number | null>(null)
  const endTime = ref<number | null>(null)

  const setApiKey = (key: string) => {
    apiKey.value = key
    localStorage.setItem('openai_api_key', key)
  }

  const clearApiKey = () => {
    apiKey.value = ''
    localStorage.removeItem('openai_api_key')
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

  const addAnswer = (answer: any) => {
    answers.value.push(answer)
  }

  const resetAnswers = () => {
    answers.value = []
  }

  const commencerQuiz = (newQuestions: any[]) => {
    setQuestions(newQuestions)
    resetAnswers()
    startTime.value = Date.now()
    endTime.value = null
  }

  const terminerQuiz = () => {
    endTime.value = Date.now()
  }

  const quizEnCours = computed(
    () => startTime.value !== null && endTime.value === null,
  )

  const score = computed(() => {
    return answers.value.filter((answer) => answer.correct).length
  })

  return {
    apiKey,
    topic,
    difficulty,
    questions,
    answers,
    startTime,
    endTime,
    quizEnCours,
    setApiKey,
    clearApiKey,
    setTopic,
    setDifficulty,
    setQuestions,
    addAnswer,
    resetAnswers,
    commencerQuiz,
    terminerQuiz,
    score,
  }
})
