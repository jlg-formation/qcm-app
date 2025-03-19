import OpenAI from 'openai'

export async function generateQuiz(
  apiKey: string,
  topic: string,
  difficulty: number,
) {
  const client = new OpenAI({
    apiKey,
    dangerouslyAllowBrowser: true, // ⚠️ Risqué, mais requis pour un front-end seul
  })

  const prompt = `Génère un quiz sur le sujet suivant : "${topic}" avec un niveau de difficulté de ${difficulty}/100.
  Retourne exactement 5 questions sous **forme de JSON valide** et structuré comme ci-dessous :
  
  [
    {
      "question": "Texte de la question",
      "choices": ["Réponse A", "Réponse B", "Réponse C", "Réponse D"],
      "correctAnswerIndex": 0
    }
  ]

  La sortie **doit être du JSON pur** sans texte supplémentaire ni balises Markdown.`

  try {
    const completion = await client.chat.completions.create({
      model: 'gpt-4o',
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
