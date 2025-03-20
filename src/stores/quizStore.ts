import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Question } from '../interfaces/Question'
import { getDecryptedKey, setEncryptedKey } from '../utils/apiKey'

export const useQuizStore = defineStore('quiz', () => {
  const apiKey = ref(getDecryptedKey())

  const topic = ref('')
  const difficulty = ref(10)
  const questions = ref<Question[]>([])
  const answers = ref<any[]>([])
  const startTime = ref<number | null>(null)
  const endTime = ref<number | null>(null)

  const setApiKey = (key: string) => {
    apiKey.value = key
    setEncryptedKey(key)
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

  const setQuestions = (newQuestions: Question[]) => {
    questions.value = newQuestions
  }

  const resetAnswers = () => {
    answers.value = []
  }

  const commencerQuiz = () => {
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

  const timeElapsed = computed(() => {
    if (startTime.value === null) return 0
    const end = endTime.value ?? Date.now()
    return Math.floor((end - startTime.value) / 1000)
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
    resetAnswers,
    commencerQuiz,
    terminerQuiz,
    score,
    timeElapsed,
  }
})
