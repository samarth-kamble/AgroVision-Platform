from fastapi import FastAPI
from pydantic import BaseModel
from chatbot import ask_chatbot  # Import chatbot logic
from scripts.seasonal_advice import get_seasonal_advice, get_current_season

app = FastAPI(title="Farm Advisor AI API", description="API for AI-powered agricultural assistant", version="1.0.0")

# Request Body Models
class QueryRequest(BaseModel):
    question: str

class SeasonalAdviceRequest(BaseModel):
    location: str
    crop_type: str = ""
    hemisphere: str

# 🟢 Home Route
@app.get("/")
def home():
    return {"message": "Farm Advisor AI API is running!"}

# 🟢 Chatbot API
@app.post("/ask")
def ask_question(request: QueryRequest):
    response = ask_chatbot(request.question)
    return {"question": request.question, "answer": response}

# 🟢 Seasonal Advice API
@app.post("/seasonal_advice")
def seasonal_advice(request: SeasonalAdviceRequest):
    season = get_current_season(request.hemisphere.lower())
    advice = get_seasonal_advice(request.location, request.crop_type, request.hemisphere.lower())

    return {
        "location": request.location,
        "season": season,
        "crop_type": request.crop_type,
        "advice": advice
    }

# 🟢 Quick Questions API
@app.get("/quick_questions")
def quick_questions():
    return {
        "questions": [
            "How do I improve soil quality naturally?",
            "What crops are best for sandy soil?",
            "How to prevent pest infestations in crops?",
            "What are the best irrigation techniques?"
        ]
    }

# 🟢 Run API using: uvicorn api:app --host 0.0.0.0 --port 8000 --reload
# uvicorn api:app --host 0.0.0.0 --port 8000 --reload
