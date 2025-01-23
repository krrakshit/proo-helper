export const config = {
    geminiApiKey: process.env.GEMINI_API_KEY,
  }
  
  // Function to validate environment variables
  export function validateEnv() {
    if (!config.geminiApiKey) {
      throw new Error("GEMINI_API_KEY is not set in the environment variables")
    }
  }
  
  