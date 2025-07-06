from dotenv import load_dotenv
import os
import google.generativeai as genai

# Load environment variables from .env file
load_dotenv()

# Get API key from environment variables
api_key = os.getenv("GOOGLE_API_KEY")  # Make sure this matches your .env variable name
genai.configure(api_key=api_key)

# Now you can list models
for model in genai.list_models():
    print(model)