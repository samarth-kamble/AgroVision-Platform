import streamlit as st
from chatbot import ask_chatbot
from scripts.seasonal_advice import get_seasonal_advice, get_current_season
import os

# Page configuration
st.set_page_config(
    page_title="Farm Advisor AI",
    page_icon="🌱",
    layout="wide"
)

# Custom CSS
st.markdown("""
<style>
    .main-header {
        font-size: 2.5rem;
        color: #2E7D32;
    }
    .subheader {
        font-size: 1.5rem;
        color: #558B2F;
    }
    .stTextInput>div>div>input {
        border-radius: 10px;
    }
    .seasonal-advice {
        background-color: #E8F5E9;
        padding: 20px;
        border-radius: 10px;
        margin: 20px 0;
    }
</style>
""", unsafe_allow_html=True)

# App tabs
tab1, tab2 = st.tabs(["Chat with Farm Advisor", "Seasonal Advice"])

with tab1:
    st.markdown('<p class="main-header">🌾 Farm Advisor AI</p>', unsafe_allow_html=True)
    st.markdown('<p class="subheader">Your AI-powered agricultural assistant</p>', unsafe_allow_html=True)

    # Initialize chat history
    if "messages" not in st.session_state:
        st.session_state.messages = []

    # Display chat history
    for message in st.session_state.messages:
        with st.chat_message(message["role"]):
            st.markdown(message["content"])

    # Chat input
    query = st.chat_input("Ask me anything about farming...")

    if query:
        # Add user message to chat history
        st.session_state.messages.append({"role": "user", "content": query})
        
        # Display user message
        with st.chat_message("user"):
            st.markdown(query)
        
        # Generate and display assistant response
        with st.chat_message("assistant"):
            with st.spinner("Thinking..."):
                response = ask_chatbot(query)
            st.markdown(response)
        
        # Add assistant response to chat history
        st.session_state.messages.append({"role": "assistant", "content": response})

    # Quick question suggestions
    st.markdown("### Quick Questions")
    col1, col2 = st.columns(2)

    with col1:
        if st.button("How do I improve soil quality naturally?"):
            query = "How do I improve soil quality naturally?"
            st.session_state.messages.append({"role": "user", "content": query})
            with st.chat_message("assistant"):
                with st.spinner("Thinking..."):
                    response = ask_chatbot(query)
                st.markdown(response)
            st.session_state.messages.append({"role": "assistant", "content": response})

    with col2:
        if st.button("What crops are best for sandy soil?"):
            query = "What crops are best for sandy soil?"
            st.session_state.messages.append({"role": "user", "content": query})
            with st.chat_message("assistant"):
                with st.spinner("Thinking..."):
                    response = ask_chatbot(query)
                st.markdown(response)
            st.session_state.messages.append({"role": "assistant", "content": response})

with tab2:
    st.markdown('<p class="main-header">🍃 Seasonal Farming Advice</p>', unsafe_allow_html=True)
    
    # Form for seasonal advice
    with st.form("seasonal_advice_form"):
        col1, col2 = st.columns(2)
        
        with col1:
            location = st.text_input("Your location (country/region):", "United States Midwest")
            crop_type = st.text_input("Crop type (optional):", "")
        
        with col2:
            hemisphere = st.radio("Hemisphere:", ["Northern", "Southern"])
        
        submit_button = st.form_submit_button("Get Seasonal Advice")
    
    if submit_button:
        with st.spinner("Generating seasonal advice..."):
            season = get_current_season(hemisphere.lower())
            advice = get_seasonal_advice(location, crop_type, hemisphere.lower())
            
            st.markdown(f"### 🌿 {season} Farming Advice for {location}")
            if crop_type:
                st.markdown(f"#### Focus: {crop_type} cultivation")
            
            with st.container():
                st.markdown(f'<div class="seasonal-advice">{advice}</div>', unsafe_allow_html=True)
            
            st.download_button(
                label="Download Advice as Text",
                data=f"# {season} Farming Advice for {location}\n\n{advice}",
                file_name=f"{season.lower()}_farming_advice.txt",
                mime="text/plain"
            )

# Sidebar with information
with st.sidebar:
    st.image("https://api.placeholder.com/120/120", width=120)
    st.markdown("### Farm Advisor AI")
    st.markdown("This AI assistant helps with:")
    st.markdown("- Crop management recommendations")
    st.markdown("- Soil quality assessment")
    st.markdown("- Pest and disease identification")
    st.markdown("- Sustainable farming practices")
    st.markdown("- Agricultural technology advice")
    
    st.markdown("---")
    st.markdown("### Data Sources")
    st.markdown("This chatbot is trained on agricultural publications, research papers, and farming guides.")