<template>
  <div class="flex h-screen flex-col">
    <Header />

    <main class="flex flex-grow items-center justify-center bg-gray-100 p-4">
      <router-view />
    </main>

    <footer class="bg-gray-200 py-3 text-center text-gray-600">
      <p>&copy; 2025 Quizify - Créé avec Vue 3 & TailwindCSS</p>
    </footer>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import Header from './components/Header.vue'
import { useQuizStore } from './stores/quizStore'

const appName = 'Quizify'

const quizStore = useQuizStore()

onMounted(() => {
  console.log('Application Quizify chargée !')
})
</script>

<style>
/* Ajout d'une animation d'entrée globale */
.fade-enter-active {
  transition: opacity 0.5s ease-in-out;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
