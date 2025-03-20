import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Question } from '../interfaces/Question'
import CryptoJS from 'crypto-js'

const SECRET_KEY: string = 'salt' + import.meta.env.VITE_SECRET_KEY + 'salt'
console.log('SECRET_KEY: ', SECRET_KEY)

const encryptAPIKey = (key: string): string => {
  return CryptoJS.AES.encrypt(key, SECRET_KEY).toString()
}

const decryptAPIKey = (encryptedKey: string): string => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedKey, SECRET_KEY)
    return bytes.toString(CryptoJS.enc.Utf8)
  } catch {
    return ''
  }
}

export const useQuizStore = defineStore('quiz', () => {
  const storedKey = localStorage.getItem('openai_api_key')
  const apiKey = ref(storedKey ? decryptAPIKey(storedKey) : '')
  const topic = ref('')
  const difficulty = ref(10)
  const questions = ref<Question[]>([])
  const answers = ref<any[]>([])
  const startTime = ref<number | null>(null)
  const endTime = ref<number | null>(null)

  const setApiKey = (key: string) => {
    apiKey.value = key
    const encryptedKey = encryptAPIKey(key)
    localStorage.setItem('openai_api_key', encryptedKey)
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
    addAnswer,
    resetAnswers,
    commencerQuiz,
    terminerQuiz,
    score,
    timeElapsed,
  }
})
