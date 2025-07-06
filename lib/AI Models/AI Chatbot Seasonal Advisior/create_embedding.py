import os
from langchain.embeddings import GoogleGenerativeAIEmbeddings
from langchain.vectorstores import FAISS
from scripts.load_data import load_and_split
from dotenv import load_dotenv

# Load API Key
load_dotenv()
api_key = os.getenv("GOOGLE_API_KEY")

def create_embeddings():
    """
    Load documents, create embeddings, and store in FAISS index.
    """
    # Ensure vector_store directory exists
    os.makedirs("vector_store", exist_ok=True)
    
    # Load and embed documents
    print("Loading and splitting documents...")
    documents = load_and_split()
    
    print(f"Creating embeddings for {len(documents)} document chunks...")
    embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")

    # Store in FAISS
    print("Storing embeddings in FAISS vector database...")
    db = FAISS.from_documents(documents, embeddings)
    
    # Save to disk
    print("Saving FAISS index to disk...")
    db.save_local("vector_store/faiss_index")

    print("FAISS vector store updated successfully!")
    return len(documents)

if __name__ == "__main__":
    num_chunks = create_embeddings()
    print(f"Process complete! {num_chunks} document chunks embedded and stored.")