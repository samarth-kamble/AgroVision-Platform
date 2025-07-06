"use server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

if (!GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is not set in environment variables.");
}

interface CattleDisease {
  name: string;
  symptoms: string[];
  possible_causes: string[];
  severity: string;
  description: string;
}

interface Remedy {
  disease: string;
  treatment: string;
  prevention: string;
  dosage?: string;
  duration?: string;
  urgency: string;
}

interface AnalysisResult {
  is_cattle: boolean;
  cattle_diseases: CattleDisease[];
  remedies: Remedy[];
  confidence_level: string;
  recommendations: string[];
}

interface ErrorResult {
  error: string;
  details?: string;
  raw?: any;
}

async function getBase64FromFile(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  return Buffer.from(buffer).toString("base64");
}

export async function analyzeCattleDisease(
  formData: FormData,
): Promise<AnalysisResult | ErrorResult> {
  try {
    const file = formData.get("image") as File | null;

    if (!file) {
      return { error: "No image uploaded" };
    }

    const base64Image = await getBase64FromFile(file);

    const prompt = `
First, identify if this image contains cattle (cows, bulls, oxen, or calves). If the image does not contain cattle, return an error.

If the image contains cattle, analyze it thoroughly for signs of disease and health conditions.

Look for the following indicators:
- Skin conditions: lesions, ulcers, rashes, unusual growths, lumps, wounds, or skin discoloration
- Respiratory signs: nasal discharge, mouth breathing, coughing posture
- Eye conditions: discharge, swelling, cloudiness, or unusual appearance
- Physical abnormalities: swelling, inflammation, lameness, abnormal posture
- Coat condition: dullness, hair loss, patchy appearance, or poor condition
- Body condition: emaciation, bloating, or unusual body shape
- Behavioral signs: signs of distress, lethargy, or abnormal positioning
- Environmental factors: poor living conditions that might affect health

Provide a detailed analysis including severity assessment and urgency level.

Respond ONLY in JSON format with the following structure:
{
  "is_cattle": true/false,
  "cattle_diseases": [
    {
      "name": "Disease Name",
      "description": "Detailed description of the disease",
      "symptoms": ["Symptom1", "Symptom2", "Symptom3"],
      "possible_causes": ["Cause1", "Cause2", "Cause3"],
      "severity": "Mild/Moderate/Severe/Critical"
    }
  ],
  "remedies": [
    {
      "disease": "Disease Name",
      "treatment": "Detailed treatment plan with steps",
      "prevention": "Comprehensive prevention strategies",
      "dosage": "Medication dosage if applicable",
      "duration": "Treatment duration",
      "urgency": "Low/Medium/High/Emergency"
    }
  ],
  "confidence_level": "Low/Medium/High",
  "recommendations": [
    "General recommendation 1",
    "General recommendation 2",
    "When to consult veterinarian"
  ]
}

If the image does not contain cattle, respond with:
{
  "is_cattle": false,
  "error": "Image does not contain cattle. Please upload an image of cattle (cows, bulls, oxen, or calves) for disease analysis."
}

Do not include any extra text outside the JSON.
`;

    const requestBody = {
      contents: [
        {
          role: "user",
          parts: [
            { text: prompt },
            {
              inline_data: {
                mime_type: file.type,
                data: base64Image,
              },
            },
          ],
        },
      ],
    };

    const response = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();

    if (data.candidates && data.candidates.length > 0) {
      let responseText = data.candidates[0].content.parts[0].text.trim();

      // Clean up response text if it's wrapped in code blocks
      if (responseText.startsWith("```json")) {
        responseText = responseText.replace(/```json\s*|\s*```/g, "").trim();
      }

      try {
        const parsedResponse: AnalysisResult = JSON.parse(responseText);
        return parsedResponse;
      } catch (error) {
        return {
          error: "Invalid JSON response",
          raw: responseText,
        };
      }
    } else {
      return {
        error: "No valid response from Gemini API",
        raw: data,
      };
    }
  } catch (error: any) {
    return {
      error: "Internal Server Error",
      details: error.message,
    };
  }
}
