"use server";

import { Client } from "@gradio/client";

export async function predictFertilizer(data: {
  N: number;
  P: number;
  K: number;
  temperature: number;
  humidity: number;
  moisture: number;
  soil_type: string;
  crop_type: string;
}) {
  const client = await Client.connect("sankalp2606/fertilizer_recommendation");

  const result = await client.predict("/predict", {
    N: data.N,
    P: data.P,
    K: data.K,
    temperature: data.temperature,
    humidity: data.humidity,
    moisture: data.moisture,
    soil_type: data.soil_type,
    crop_type: data.crop_type,
  });

  return result.data;
}
