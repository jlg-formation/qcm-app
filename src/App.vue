<template>
  <div class="min-h-screen bg-gray-100 text-gray-900">
    <header class="bg-blue-500 py-4 text-white shadow-md">
      <div class="container mx-auto text-center text-2xl font-semibold">
        QCM Dynamique
      </div>
    </header>

    <main class="container mx-auto p-6">
      <router-view />
    </main>

    <footer class="mt-10 bg-gray-200 py-4 text-center text-gray-600">
      <p>&copy; 2025 QCM Dynamique - Créé avec Vue 3 & TailwindCSS</p>
    </footer>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useQuizStore } from './stores/quizStore'

const quizStore = useQuizStore()

onMounted(() => {
  console.log('Application QCM Dynamique chargée !')
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
