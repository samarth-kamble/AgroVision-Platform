"use server";

export const getSeasonalAdvice = async (formData: FormData) => {
  try {
    const location = formData.get("location") as string;
    const crop_type = formData.get("crop_type") as string;
    const hemisphere = formData.get("hemisphere") as string;

    if (!location || !crop_type || !hemisphere) {
      return {
        success: false,
        error: "All fields are required.",
      };
    }

    const apiResponse = await fetch(
      "http://farmer-chatbot-1.onrender.com/seasonal_advice",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          location,
          crop_type,
          hemisphere,
        }),
      },
    );

    if (!apiResponse.ok) {
      throw new Error(`API request failed with status ${apiResponse.status}`);
    }

    const data = await apiResponse.json();

    return {
      success: true,
      advice: data,
    };
  } catch (error) {
    console.error("Seasonal advice API error:", error);
    return {
      success: false,
      error: "Failed to fetch seasonal advice. Please try again later.",
    };
  }
};
