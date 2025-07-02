"use server";

import { Client } from "@gradio/client";

export async function predictCropDisease(image: File) {
  // Read the file as a blob
  const imageBuffer = await image.arrayBuffer();
  const imageBlob = new Blob([imageBuffer], { type: image.type });

  // Connect to your Hugging Face model
  const client = await Client.connect("sankalp2606/Plant-Disease_diagnosis");

  // Call the predict endpoint
  const result = await client.predict("/predict", {
    img: imageBlob,
  });

  return result.data; // Adjust depending on model output
}
