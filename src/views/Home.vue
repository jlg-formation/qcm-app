<template>
  <div class="mx-auto w-full max-w-lg rounded-xl bg-white p-6 shadow-lg">
    <h1 class="mb-4 text-center text-2xl font-bold text-gray-800">
      🎯 Générateur de QCM Dynamique
    </h1>

    <form @submit.prevent="startQuiz" class="space-y-4">
      <div v-if="quizStore.apiKey" class="text-center text-green-600">
        ✅ Clé OpenAI enregistrée
        <button
          @click="quizStore.clearApiKey"
          type="button"
          class="ml-2 text-red-500 transition hover:text-red-700"
        >
          Changer de clé
        </button>
      </div>

      <input
        v-else
        v-model="apiKey"
        type="password"
        placeholder="Entrez votre clé OpenAI"
        class="w-full rounded-lg border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
      />

      <input
        v-model="topic"
        type="text"
        placeholder="Sujet du quiz (ex: Histoire de France)"
        class="w-full rounded-lg border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        required
      />

      <div>
        <input
          v-model="difficulty"
          type="range"
          min="1"
          max="100"
          class="w-full accent-blue-500"
        />
        <p class="text-center text-gray-700">
          Difficulté : <b>{{ difficulty }}</b>
        </p>
      </div>

      <button
        type="submit"
        class="h-12 w-full cursor-pointer rounded-lg bg-blue-500 px-5 py-3 font-semibold text-white shadow-md transition-all hover:bg-blue-600 hover:shadow-lg"
      >
        🚀 Démarrer le quiz
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useQuizStore } from '../stores/quizStore'
import { ref } from 'vue'

const router = useRouter()
const quizStore = useQuizStore()

const apiKey = ref('')
const topic = ref('')
const difficulty = ref(10)

const startQuiz = () => {
  if (!quizStore.apiKey && !apiKey.value) {
    alert('Veuillez entrer une clé API !')
    return
  }

  if (!quizStore.apiKey) {
    quizStore.setApiKey(apiKey.value)
  }

  if (!topic.value) {
    alert('Veuillez entrer un sujet !')
    return
  }

  quizStore.resetAnswers()
  quizStore.setTopic(topic.value)
  quizStore.setDifficulty(difficulty.value)

  router.push('/quiz')
}
</script>
