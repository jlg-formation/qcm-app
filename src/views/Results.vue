<template>
  <div
    class="mx-auto w-full max-w-lg rounded-lg bg-white p-4 text-center shadow-md"
  >
    <h1 class="mb-3 text-xl font-bold">Résultats</h1>

    <p class="text-lg font-semibold">
      Score : {{ score }} / {{ quizStore.questions.length }}
    </p>
    <p class="text-gray-600">
      ⏱ Temps écoulé : {{ quizStore.getTimeElapsed }} secondes
    </p>

    <router-link to="/">
      <button
        class="mt-4 h-10 w-full cursor-pointer rounded bg-blue-500 px-4 py-2 text-sm text-white transition-all hover:bg-blue-600"
      >
        Refaire un quiz
      </button>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { useQuizStore } from '../stores/quizStore'
import { computed } from 'vue'

const quizStore = useQuizStore()

const score = computed(() =>
  quizStore.answers.reduce((sum, answer, index) => {
    return (
      sum + (answer.selected === answer.question.correctAnswerIndex ? 1 : 0)
    )
  }, 0),
)
</script>
