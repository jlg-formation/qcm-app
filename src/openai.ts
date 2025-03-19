import OpenAI from 'openai'

export async function generateQuiz(
  apiKey: string,
  topic: string,
  difficulty: number,
) {
  const client = new OpenAI({ apiKey })

  const prompt = `Génère un quiz sur "${topic}" avec une difficulté de ${difficulty}/100.
  Donne-moi 5 questions avec 4 choix de réponse et indique la bonne réponse.`

  try {
    const completion = await client.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
    })

    return completion.choices[0].message.content
  } catch (error) {
    console.error('Erreur lors de la génération du quiz :', error)
    return null
  }
}
