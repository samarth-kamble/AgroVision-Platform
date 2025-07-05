// actions/gemini.ts
"use server";

import { GoogleGenAI } from "@google/genai";

// Initialize Gemini AI
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

// Generic function to ask Gemini
export async function askGemini(prompt: string): Promise<string> {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not set in environment variables");
    }

    if (!prompt || prompt.trim() === "") {
      throw new Error("Prompt cannot be empty");
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    if (!response.text) {
      throw new Error("No response received from Gemini API");
    }

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);

    if (error instanceof Error) {
      if (error.message.includes("API key")) {
        return "❌ API key is missing or invalid. Please check your environment variables.";
      } else if (error.message.includes("quota")) {
        return "❌ API quota exceeded. Please try again later.";
      } else if (error.message.includes("blocked")) {
        return "❌ Content was blocked by safety filters. Please try rephrasing your request.";
      }
    }

    return "❌ Failed to generate a response. Please try again.";
  }
}

// Enhanced Gemini action with better prompting
export async function getCropRemedies(diseaseName: string): Promise<string> {
  try {
    if (!diseaseName || diseaseName.trim() === "") {
      throw new Error("Disease name cannot be empty");
    }

    const cleanName = diseaseName.replace(/.*___/, "").replace(/_/g, " ");

    const prompt = `As an agricultural expert, provide comprehensive information about the crop disease "${cleanName}". Please format your response EXACTLY as follows with these sections and emojis:

**🔍 DISEASE OVERVIEW**
Brief description of the disease and its economic impact.

**🌱 SYMPTOMS**
* Early Stage Symptoms: [List early symptoms]
* Advanced Stage Symptoms: [List advanced symptoms]
* Visual Indicators to Look For: [List visual indicators]

**🦠 CAUSES**
* Primary Pathogen or Cause: [Main cause]
* Environmental Factors That Contribute: [Environmental factors]
* How the Disease Spreads: [Spread mechanism]

**🛡️ PREVENTION MEASURES**
* Preventive Practices: [Prevention methods]
* Crop Management Techniques: [Management practices]
* Environmental Controls: [Environmental controls]

**💊 TREATMENT & REMEDIES**
* Organic/Natural Treatments: [Organic solutions]
* Chemical Treatments (if necessary): [Chemical solutions]
* Cultural Practices for Control: [Cultural methods]

**🚨 IMMEDIATE ACTIONS**
* What to Do if Disease is Detected: [Detection response]
* How to Prevent Spread: [Prevention of spread]

**🌾 AFFECTED CROPS**
* Which Crops Are Commonly Affected: [List crops]
* Susceptible Varieties: [List varieties]

Please provide detailed, actionable advice that farmers can implement immediately. Use bullet points for sub-items and keep the exact format with emojis.`;

    return await askGemini(prompt);
  } catch (error) {
    console.error("Error in getCropRemedies:", error);
    return "❌ Failed to get crop remedies. Please check the disease name and try again.";
  }
}

// 👇 New function to analyze fertilizer
export async function getFertilizerInsights(
  fertilizerName: any,
): Promise<string> {
  try {
    const name = String(fertilizerName).trim(); // Ensure it's a string

    if (!name) {
      throw new Error("Fertilizer name cannot be empty");
    }

    const prompt = `You are an expert agricultural assistant. Provide an in-depth analysis of the fertilizer: **"${name}"**.

Respond strictly in the following format and include the appropriate emojis for clarity:

**🌟 PROS**
- [List top advantages of using this fertilizer]

**⚠️ CONS**
- [List possible disadvantages or risks]

**💰 PRICE ESTIMATE**
- Typical market price in India (INR per kg or per litre)

**⚖️ RECOMMENDED USAGE**
- Suggested application rate (e.g., kg per acre)
- Best time/method to apply

**🧠 EXPERT TIPS**
- Safety precautions
- Storage tips
- Compatibility with other fertilizers/pesticides

Keep the format exactly as shown with the emojis and markdown styling. Be concise but informative.`;

    return await askGemini(prompt);
  } catch (error) {
    console.error("Error in getFertilizerInsights:", error);
    return "❌ Failed to fetch fertilizer analysis. Please try again.";
  }
}
