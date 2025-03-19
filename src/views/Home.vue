<template>
  <div class="flex h-screen flex-col items-center justify-center space-y-4">
    <h1 class="text-3xl font-bold">Générateur de QCM Dynamique</h1>

    <!-- ✅ Si la clé API est déjà enregistrée, afficher un message -->
    <div v-if="quizStore.apiKey">
      <p class="text-green-600">✅ Clé OpenAI enregistrée</p>
      <button
        @click="quizStore.clearApiKey"
        class="mt-2 text-red-500 underline"
      >
        Changer de clé
      </button>
    </div>

    <!-- ✅ Champ affiché uniquement si aucune clé API n'est enregistrée -->
    <input
      v-else
      v-model="apiKey"
      type="password"
      placeholder="Entrez votre clé OpenAI"
      class="w-80 rounded border p-2"
    />

    <input
      v-model="topic"
      type="text"
      placeholder="Sujet du quiz (ex: Histoire de France)"
      class="w-80 rounded border p-2"
    />

    <input v-model="difficulty" type="range" min="1" max="100" class="w-80" />
    <p>Difficulté : {{ difficulty }}</p>

    <button
      @click="startQuiz"
      class="rounded bg-blue-500 px-6 py-2 text-white hover:bg-blue-600"
    >
      Démarrer le quiz
    </button>
  </div>
</template>

<script setup>
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

  quizStore.resetQuiz()
  quizStore.setTopic(topic.value)
  quizStore.setDifficulty(difficulty.value)

  router.push('/quiz')
}
</script>
