"use server"

import { GoogleGenerativeAI } from "@google/generative-ai"

// Initialize the Gemini AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")

export async function generateProjectIdeas(niche: string, difficulty: string, audience: string) {
  try {
    // Initialize the model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" })

    // Generate content
    const result = await model.generateContent(
      `Generate 3 project ideas for ${niche} with ${difficulty} difficulty level, targeting ${audience}. Format each idea as a numbered list with a brief description.`,
    )
    const response = await result.response
    const text = response.text()

    // Process the response into an array of ideas
    const ideas = text
      .split("\n")
      .filter((line) => line.trim().length > 0 && /^\d+\./.test(line.trim()))
      .map((idea) => idea.trim())

    if (!ideas.length) {
      throw new Error("No project ideas were generated")
    }

    return { success: true, data: ideas }
  } catch (error) {
    console.error("Error generating project ideas:", error)
    return {
      success: false,
      error: "Failed to generate project ideas. Please try again.",
    }
  }
}

