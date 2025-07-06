import os
from dotenv import load_dotenv

# Import Google Generative AI
from langchain_google_genai import GoogleGenerativeAI, GoogleGenerativeAIEmbeddings

# Import FAISS and RetrievalQA
from langchain_community.vectorstores import FAISS
from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate

# Load API key from environment variables
load_dotenv()
api_key = os.getenv("GOOGLE_API_KEY")

if not api_key:
    raise ValueError("Google API Key not found. Please set it in your .env file.")

# Ensure FAISS Index Exists
faiss_path = "vector_store/faiss_index"
if not os.path.exists(f"{faiss_path}/index.faiss"):
    raise FileNotFoundError(f"FAISS index file not found at: {faiss_path}/index.faiss. Please create the FAISS index first.")

# Load FAISS Index with deserialization enabled
embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
db = FAISS.load_local(faiss_path, embeddings, allow_dangerous_deserialization=True)

# Create Retriever with similarity search
retriever = db.as_retriever(search_type="similarity", search_kwargs={"k": 5})

# Initialize Google Gemini AI Model
# llm = GoogleGenerativeAI(model="gemini-1.0-pro")
llm = GoogleGenerativeAI(model="gemini-1.5-flash", api_key=api_key)

# Define the Prompt Template
prompt_template = """
You are an expert agricultural assistant helping farmers with practical advice.

User Question: {question}

Here is some relevant information from agricultural resources:
{context}

Based on the above context and your knowledge about agriculture, provide a detailed, 
helpful, and accurate response. If the context doesn't contain enough information 
to fully answer the question, say so clearly and provide general best practices.

Remember to:
- Cite specific data from the context when available
- Provide actionable advice that farmers can implement
- Use clear, non-technical language accessible to all farming backgrounds
- Organize your response with appropriate headings if the answer is complex

Your helpful response:
"""

PROMPT = PromptTemplate(template=prompt_template, input_variables=["context", "question"])

# Create RAG-based Chatbot with RetrievalQA
qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    retriever=retriever,
    return_source_documents=True,
    chain_type_kwargs={"prompt": PROMPT},
    chain_type="stuff"  # Add this to explicitly use the StuffDocumentsChain
)

def ask_chatbot(question):
    """
    Process a user question and return an answer with source references.
    
    Args:
        question (str): The user's query about farming
        
    Returns:
        str: Response with an answer and cited sources.
    """
    result = qa_chain({"query": question})

    answer = result.get("result", "Sorry, I couldn't find an answer.")
    sources = result.get("source_documents", [])

    # Add source attribution to the response
    if sources:
        answer += "\n\n**Sources:**"
        seen_sources = set()
        for doc in sources:
            source = doc.metadata.get("source", "Unknown")
            page = doc.metadata.get("page", "")
            source_info = f"{source} (Page {page})" if page else source
            
            if source_info not in seen_sources:
                seen_sources.add(source_info)
                answer += f"\n- {source_info}"
    
    return answer

if __name__ == "__main__":
    while True:
        query = input("Ask me about farming: ")
        if query.lower() == "exit":
            break
        print("🤖:", ask_chatbot(query))
