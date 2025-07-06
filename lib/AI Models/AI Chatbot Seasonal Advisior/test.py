import os
from dotenv import load_dotenv
from langchain_google_genai import GoogleGenerativeAI
from langchain_community.vectorstores import FAISS
from langchain_google_genai import GoogleGenerativeAIEmbeddings

# Load API key
load_dotenv()

# Initialize embedding model
embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")

# Load FAISS Index
faiss_index = FAISS.load_local("vector_store/faiss_index", embeddings, allow_dangerous_deserialization=True)

# Initialize Gemini model 
llm = GoogleGenerativeAI(model="gemini-1.5-flash")

# Define a simple test query function
def test_query(question):
    # Retrieve relevant documents
    docs = faiss_index.similarity_search(question, k=3)
    
    # Extract the content from retrieved documents
    context = "\n\n".join([doc.page_content for doc in docs])
    
    # Create a prompt with the context and question
    prompt = f"""
    You are an expert agricultural assistant helping farmers with practical advice.
    
    Question: {question}
    
    Here is information from agricultural resources:
    {context}
    
    Based on this information and your knowledge, provide a helpful response to the question.
    """
    
    # Get response from Gemini
    response = llm.invoke(prompt)
    
    # Return the response
    return response

# Test with a farming question
query = "What are good practices for organic farming?"
response = test_query(query)
print("\nQuestion:", query)
print("\nResponse:", response)