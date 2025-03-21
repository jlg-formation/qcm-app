<template>
  <div
    class="flex h-screen flex-col bg-gradient-to-br from-gray-100 to-gray-300"
  >
    <Header />

    <main class="flex flex-grow items-center justify-center p-6">
      <router-view />
    </main>

    <footer class="bg-gray-200 py-3 text-center text-gray-600 shadow-inner">
      <p>&copy; 2025 Quizify - Créé avec Vue 3 & TailwindCSS</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import Header from './components/Header.vue'

onMounted(() => {
  console.log('Application Quizify chargée !')
})
</script>

<style>
/* Effet de transition globale */
.fade-enter-active {
  transition: opacity 0.4s ease-in-out;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
