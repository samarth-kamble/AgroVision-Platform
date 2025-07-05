"use server";

import { Client } from "@gradio/client";

export async function predictCropDisease(image: File) {
  const imageBuffer = await image.arrayBuffer();
  const imageBlob = new Blob([imageBuffer], { type: image.type });

  const client = await Client.connect("Shwetask/crop-disease-detection");

  const result = await client.predict("/predict", {
    image: imageBlob,
  });

  return result.data;
}
