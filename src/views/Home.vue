<template>
  <div class="mx-auto w-full max-w-lg rounded-lg bg-white p-4 shadow-md">
    <h1 class="mb-3 text-center text-xl font-bold">
      Générateur de QCM Dynamique
    </h1>

    <form @submit.prevent="startQuiz" class="space-y-3">
      <div v-if="quizStore.apiKey" class="text-center text-green-600">
        ✅ Clé OpenAI enregistrée
        <button
          @click="quizStore.clearApiKey"
          type="button"
          class="ml-2 text-red-500 underline"
        >
          Changer de clé
        </button>
      </div>

      <input
        v-else
        v-model="apiKey"
        type="password"
        placeholder="Entrez votre clé OpenAI"
        class="w-full rounded border p-2"
      />

      <input
        v-model="topic"
        type="text"
        placeholder="Sujet du quiz (ex: Histoire de France)"
        class="w-full rounded border p-2"
        required
      />

      <div>
        <input
          v-model="difficulty"
          type="range"
          min="1"
          max="100"
          class="w-full"
        />
        <p class="text-center">Difficulté : {{ difficulty }}</p>
      </div>

      <button
        type="submit"
        class="h-10 w-full cursor-pointer rounded bg-blue-500 px-4 py-2 text-sm text-white transition-all hover:bg-blue-600"
      >
        Démarrer le quiz
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
