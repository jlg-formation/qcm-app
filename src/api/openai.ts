import OpenAI from 'openai'
import { zodResponseFormat } from 'openai/helpers/zod'
import { z } from 'zod'
import type { Question } from '../interfaces/Question'

export async function generateQuiz(
  apiKey: string,
  topic: string,
  difficulty: number,
): Promise<Question[]> {
  if (!apiKey) {
    console.error('Erreur : Aucune clé API fournie.')
    throw new Error('Aucune clé API fournie.')
  }

  const client = new OpenAI({
    apiKey,
    dangerouslyAllowBrowser: true,
  })

  const sanitizedTopic = topic.slice(0, 100)

  const QuizSchema = z.object({
    questionList: z.array(
      z.object({
        question: z.string(),
        choices: z.array(z.string()),
        correctAnswerIndex: z.number().int(),
      }),
    ),
  })

  const responseFormat = zodResponseFormat(QuizSchema, 'quiz')
  console.log('responseFormat: ', responseFormat)

  const completion = await client.beta.chat.completions.parse({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'user',
        content: `Génère un quiz sur le sujet suivant : "${sanitizedTopic}" avec une difficulté de ${difficulty}/100.

        Retourne exactement 5 questions avec les champs suivants :
        - question : une chaîne de caractères
        - choices : un tableau de 4 propositions
        - correctAnswerIndex : un nombre entre 0 et 3

        Contraintes :
        - Les réponses doivent être dans un ordre aléatoire.
        - Ne mets la bonne réponse en premier que rarement (moins de 20% du temps).
        `,
      },
    ],
    response_format: responseFormat,
  })

  const response = completion.choices[0].message.parsed
  if (response === null) {
    console.error('Erreur : Impossible de générer un quiz.')
    throw new Error('Impossible de générer un quiz.')
  }

  return response.questionList
}
