import datetime
from langchain_google_genai import GoogleGenerativeAI
from dotenv import load_dotenv
import os

# Load API key
load_dotenv()
api_key = os.getenv("GOOGLE_API_KEY")

# Initialize Gemini Model
llm = GoogleGenerativeAI(model="gemini-1.5-flash")

# Define seasons for Northern and Southern hemispheres
NORTHERN_SEASONS = {
    (3, 21): "Spring",
    (6, 21): "Summer",
    (9, 21): "Fall",
    (12, 21): "Winter"
}

SOUTHERN_SEASONS = {
    (3, 21): "Fall",
    (6, 21): "Winter",
    (9, 21): "Spring",
    (12, 21): "Summer"
}

def get_current_season(hemisphere="northern"):
    """
    Determine the current season based on date and hemisphere.
    
    Args:
        hemisphere (str): "northern" or "southern"
    
    Returns:
        str: Current season name
    """
    today = datetime.datetime.now()
    current_month, current_day = today.month, today.day
    
    seasons = NORTHERN_SEASONS if hemisphere.lower() == "northern" else SOUTHERN_SEASONS
    season_dates = list(seasons.keys())
    
    # Find the current season based on date
    for i, (month, day) in enumerate(season_dates):
        next_i = (i + 1) % len(season_dates)
        next_month, next_day = season_dates[next_i]
        
        # Handle year wrap-around
        if next_month < month:
            if current_month < next_month or current_month > month:
                return seasons[(month, day)]
        else:
            if month < current_month < next_month:
                return seasons[(month, day)]
            elif current_month == month and current_day >= day:
                return seasons[(month, day)]
            elif current_month == next_month and current_day < next_day:
                return seasons[(month, day)]
    
    # Default to winter if something goes wrong
    return seasons[(12, 21)]

def get_seasonal_advice(location, crop_type=None, hemisphere="northern"):
    """
    Generate seasonal farming advice based on location, crop type, and current season.
    
    Args:
        location (str): Geographic location (country, region, etc.)
        crop_type (str, optional): Specific crop for targeted advice
        hemisphere (str): "northern" or "southern"
    
    Returns:
        str: Seasonal farming advice
    """
    season = get_current_season(hemisphere)
    
    # Construct prompt for LLM
    prompt = f"""
    As an agricultural expert, provide practical seasonal farming advice for {location} 
    during {season} season. 
    
    {"Focus specifically on " + crop_type + " cultivation. " if crop_type else ""}
    
    Include:
    1. Key activities farmers should focus on during {season}
    2. Common challenges during this season and how to address them
    3. Resource management advice (water, soil, etc.)
    4. Preparation recommendations for the upcoming season
    5. Sustainable farming practices relevant to this time of year
    
    Format the response with clear headings and bullet points for easy reading.
    """
    
    # Get response from Gemini
    response = llm.invoke(prompt)
    
    # The response itself is the generated text, not response.content
    return response

if __name__ == "__main__":
    advice = get_seasonal_advice("United States Midwest", "corn", "northern")
    print(advice)