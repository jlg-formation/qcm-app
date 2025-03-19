<template>
  <div class="flex h-screen flex-col items-center justify-center space-y-4">
    <h1 class="text-3xl font-bold">Résultats</h1>

    <p>Score : {{ score }} / {{ quizStore.questions.length }}</p>
    <p>Temps écoulé : {{ quizStore.getTimeElapsed }} secondes</p>

    <router-link
      to="/"
      class="mt-4 rounded bg-blue-500 px-6 py-2 text-white hover:bg-blue-600"
    >
      Refaire un quiz
    </router-link>
  </div>
</template>

<script setup>
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
