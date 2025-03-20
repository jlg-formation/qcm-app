<template>
  <div class="flex h-screen flex-col">
    <header class="bg-blue-500 py-4 text-white shadow-md">
      <div class="container mx-auto text-center text-2xl font-semibold">
        {{ appName }}
      </div>
    </header>

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
