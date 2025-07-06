"use server";

export const askFarmerChatbot = async (question: string) => {
  try {
    const apiResponse = await fetch(
      "http://farmer-chatbot-1.onrender.com/ask",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      }
    );

    if (!apiResponse.ok) {
      throw new Error(`HTTP error! status: ${apiResponse.status}`);
    }

    const data = await apiResponse.json();
    return { success: true, data };
  } catch (error) {
    console.error("Farmer chatbot error:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to fetch chatbot response",
    };
  }
};
