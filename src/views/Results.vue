<template>
  <div
    class="mx-auto w-full max-w-lg rounded-lg bg-white p-4 text-center shadow-md"
  >
    <h1 class="mb-3 text-xl font-bold">Résultats</h1>

    <p class="text-lg font-semibold">
      Score : {{ score }} / {{ quizStore.questions.length }}
    </p>
    <p class="text-gray-600">
      ⏱ Temps écoulé : {{ quizStore.timeElapsed }} secondes
    </p>

    <button
      class="mt-4 h-10 w-full cursor-pointer rounded bg-blue-500 px-4 py-2 text-sm text-white transition-all hover:bg-blue-600"
      @click="restartQuiz"
    >
      Refaire un quiz
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useQuizStore } from '../stores/quizStore'
import { useRouter } from 'vue-router'

const quizStore = useQuizStore()
const router = useRouter()

const score = computed(() =>
  quizStore.answers.reduce((sum, answer) => {
    return (
      sum + (answer.selected === answer.question.correctAnswerIndex ? 1 : 0)
    )
  }, 0),
)

const restartQuiz = () => {
  console.log('restartQuiz')
  quizStore.resetAnswers()
  quizStore.setQuestions([])
  router.push('/')
}
</script>
