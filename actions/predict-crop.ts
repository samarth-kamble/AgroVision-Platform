"use server";

import { Client } from "@gradio/client";

export async function predictCrop(formData: FormData) {
  const N = Number(formData.get("N"));
  const P = Number(formData.get("P"));
  const K = Number(formData.get("K"));
  const temperature = Number(formData.get("temperature"));
  const humidity = Number(formData.get("humidity"));
  const ph = Number(formData.get("ph"));
  const rainfall = Number(formData.get("rainfall"));

  try {
    const client = await Client.connect(
      "sidmidccompany/Crop_Recommendation_system"
    );

    const result = await client.predict("/predict_crop", {
      N,
      P,
      K,
      temperature,
      humidity,
      ph,
      rainfall,
    });

    return { success: true, data: result.data };
  } catch (error: unknown) {
    console.error("Prediction Error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
