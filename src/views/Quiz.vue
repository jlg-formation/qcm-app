<template>
  <div class="w-full max-w-lg rounded-lg bg-white p-4 shadow-md">
    <h2 class="mb-3 text-center text-xl font-bold">
      Quiz : {{ quizStore.topic }}
    </h2>

    <div v-if="loading" class="min-h-[40px] text-center text-gray-500">
      Génération des questions...
    </div>
    <div v-if="error" class="min-h-[40px] text-center text-red-500">
      {{ error }}
    </div>

    <div v-else-if="currentQuestion">
      <p class="text-md text-center font-semibold">
        {{ currentQuestionIndex + 1 }}. {{ currentQuestion.question }}
      </p>

      <div class="mt-2 space-y-1">
        <button
          v-for="(choice, index) in currentQuestion.choices"
          :key="index"
          @click="selectAnswer(index)"
          class="h-10 w-full cursor-pointer rounded border p-2 text-sm transition-all"
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

      <div class="mt-2 flex min-h-[40px] items-center justify-center">
        <p
          v-if="selectedAnswer !== null"
          class="text-center text-sm font-semibold opacity-100 transition-opacity"
        >
          <span v-if="isCorrect" class="text-green-600"
            >✅ Bonne réponse !</span
          >
          <span v-else class="text-red-600"
            >❌ Mauvaise réponse. La bonne réponse était : "{{
              currentQuestion.choices[correctAnswerIndex]
            }}"</span
          >
        </p>
      </div>

      <div class="mt-2 flex min-h-[40px] items-center justify-center">
        <button
          v-if="selectedAnswer !== null"
          @click="nextQuestion"
          class="h-10 w-full cursor-pointer rounded bg-blue-500 px-4 py-2 text-sm text-white transition-all hover:bg-blue-600"
        >
          Suivant
        </button>
      </div>
    </div>

    <div v-else-if="!loading && quizStore.questions.length > 0">
      <p class="text-center">Quiz terminé !</p>
      <router-link to="/results">
        <button
          class="mt-2 h-10 w-full cursor-pointer rounded bg-green-500 px-4 py-2 text-sm text-white transition-all hover:bg-green-600"
        >
          Voir les résultats
        </button>
      </router-link>
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
    quizStore.terminerQuiz()
  }
}

onMounted(async () => {
  quizStore.commencerQuiz()
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
