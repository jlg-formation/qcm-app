<template>
  <div class="p-6">
    <h2 class="mb-4 text-2xl font-bold">Quiz sur : {{ quizStore.topic }}</h2>

    <div v-if="loading" class="text-center text-gray-500">
      Génération des questions...
    </div>
    <div v-if="error" class="text-center text-red-500">{{ error }}</div>

    <div v-else-if="currentQuestion">
      <p class="text-lg font-semibold">
        {{ currentQuestionIndex + 1 }}. {{ currentQuestion.question }}
      </p>

      <div class="mt-4 space-y-2">
        <button
          v-for="(choice, index) in currentQuestion.choices"
          :key="index"
          @click="selectAnswer(index)"
          class="w-full cursor-pointer rounded border p-2 transition-all"
          :class="{
            'bg-green-500 text-white': selectedAnswer === index && isCorrect,
            'bg-red-500 text-white': selectedAnswer === index && !isCorrect,
            'bg-green-200 text-black':
              correctAnswerIndex === index && selectedAnswer !== null,
            'hover:bg-gray-200': selectedAnswer === null,
          }"
          :disabled="selectedAnswer !== null"
        >
          {{ choice }}
        </button>
      </div>

      <p v-if="selectedAnswer !== null" class="mt-4 text-lg font-semibold">
        <span v-if="isCorrect" class="text-green-600">✅ Bravo !</span>
        <span v-else class="text-red-600"
          >❌ Mauvaise réponse. La bonne réponse était : "{{
            currentQuestion.choices[correctAnswerIndex]
          }}"</span
        >
      </p>

      <!-- ✅ Bouton "Suivant" ajouté -->
      <button
        v-if="selectedAnswer !== null"
        @click="nextQuestion"
        class="mt-4 rounded bg-blue-500 px-6 py-2 text-white transition-all hover:bg-blue-600"
      >
        Suivant
      </button>
    </div>

    <div v-else-if="!loading && quizStore.questions.length > 0">
      <p class="text-center">Quiz terminé !</p>
      <router-link to="/results" class="text-blue-500"
        >Voir les résultats</router-link
      >
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useQuizStore } from '../stores/quizStore'
import { generateQuiz } from '../api/openai'

const quizStore = useQuizStore()
const loading = ref(true)
const error = ref(null)
const selectedAnswer = ref(null)
const isCorrect = ref(false)
const currentQuestionIndex = ref(0)
const currentQuestion = computed(
  () => quizStore.questions[currentQuestionIndex.value],
)
const correctAnswerIndex = computed(
  () => currentQuestion.value?.correctAnswerIndex ?? -1,
)

const selectAnswer = (index) => {
  selectedAnswer.value = index
  isCorrect.value = index === correctAnswerIndex.value

  quizStore.answers.push({
    question: currentQuestion.value,
    selected: index,
    isCorrect: isCorrect.value,
  })
}

const nextQuestion = () => {
  selectedAnswer.value = null
  currentQuestionIndex.value++

  if (!currentQuestion.value) {
    quizStore.finishQuiz()
  }
}

onMounted(async () => {
  quizStore.startQuiz()
  try {
    const questions = await generateQuiz(
      quizStore.apiKey,
      quizStore.topic,
      quizStore.difficulty,
    )
    quizStore.setQuestions(questions)
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})
</script>
