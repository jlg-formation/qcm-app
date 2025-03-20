import OpenAI from 'openai'
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

  try {
    const client = new OpenAI({
      apiKey,
      dangerouslyAllowBrowser: true, // ⚠️ Risqué, mais requis pour un front-end seul
    })

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

    const sanitizedTopic = topic.slice(0, 100) // Évite un sujet trop long

    const prompt = `Génère un quiz sur le sujet suivant : "${sanitizedTopic}" avec une difficulté de ${difficulty}/100.
    Retourne exactement 5 questions sous **forme de JSON strictement valide** et structuré comme l'exemple suivant :
  
    ${exampleQuiz}
  
    **Contraintes** :
    - Mélange **aléatoirement** l’ordre des réponses.
    - **Ne mets la bonne réponse en premier que rarement (moins de 20% du temps)**.
    - Sélectionne un \`correctAnswerIndex\` **aléatoire** entre 0 et 3.
    - La sortie **doit être du JSON pur**, sans texte supplémentaire ni balises Markdown.`

    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
    })

    const responseContent = completion.choices[0]?.message?.content

    if (!responseContent) {
      throw new Error("Réponse vide de l'API OpenAI.")
    }

    try {
      return JSON.parse(responseContent)
    } catch (error) {
      console.error('Erreur lors du parsing JSON :', error, { responseContent })
      throw new Error("Réponse mal formatée de l'API OpenAI.")
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'erreur technique'
    console.error('Erreur API OpenAI :', { message })
    throw new Error('Erreur API OpenAI : ' + message)
  }
}
