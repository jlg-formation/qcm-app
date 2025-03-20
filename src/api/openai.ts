import OpenAI from 'openai'
import type { Question } from '../interfaces/Question'

export async function generateQuiz(
  apiKey: string,
  topic: string,
  difficulty: number,
) {
  const client = new OpenAI({
    apiKey,
    dangerouslyAllowBrowser: true, // ⚠️ Risqué, mais requis pour un front-end seul
  })

  // Exemple JSON formaté correctement avec JSON.stringify()
  const exampleQuiz = JSON.stringify(
    [
      {
        question: 'Quelle est la capitale de la France ?',
        choices: ['Londres', 'Berlin', 'Madrid', 'Paris'],
        correctAnswerIndex: 3,
      } satisfies Question,
    ],
    null,
    2,
  )

  const prompt = `Génère un quiz sur le sujet suivant : "${topic}" avec un niveau de difficulté de ${difficulty}/100.
  Retourne exactement 5 questions sous **forme de JSON strictement valide** et structuré comme l'exemple suivant :

  ${exampleQuiz}

  **Contraintes** :
  - Mélange **aléatoirement** l’ordre des réponses.
  - **Ne mets la bonne réponse en premier que rarement (moins de 20% du temps)**.
  - Sélectionne un \`correctAnswerIndex\` **aléatoire** entre 0 et 3.
  - La sortie **doit être du JSON pur**, sans texte supplémentaire ni balises Markdown.`

  try {
    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
    })

    const responseContent = completion.choices[0]?.message?.content

    if (!responseContent) {
      throw new Error("Réponse vide de l'API OpenAI.")
    }

    return JSON.parse(responseContent)
  } catch (error) {
    console.error('Erreur API OpenAI :', error)
    return null
  }
}
