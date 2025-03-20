<template>
  <header class="bg-blue-600 p-4 text-white">
    <nav class="container mx-auto flex justify-center">
      <a
        href="#"
        class="text-2xl font-bold hover:underline"
        @click="handleNavigation"
      >
        Quizify
      </a>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useQuizStore } from '../stores/quizStore'

const router = useRouter()
const quizStore = useQuizStore()

const handleNavigation = (event: MouseEvent) => {
  if (quizStore.quizEnCours) {
    const confirmation = confirm(
      'Vous êtes en train de faire un quiz. Voulez-vous vraiment quitter ?',
    )
    if (!confirmation) {
      event.preventDefault()
      return
    }
    quizStore.terminerQuiz()
  }
  router.push('/')
}
</script>
