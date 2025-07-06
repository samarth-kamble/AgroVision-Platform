import os
from dotenv import load_dotenv
import sys

# Import FAISS and LangChain components
from langchain_community.vectorstores import FAISS
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import DirectoryLoader, PyPDFLoader

# Load API Key
load_dotenv()
api_key = os.getenv("GOOGLE_API_KEY")

if not api_key:
    raise ValueError("Google API Key not found. Please set it in your .env file.")

# Load Documents from a folder
data_path = "data"  # Use relative path
if not os.path.exists(data_path):
    raise FileNotFoundError(f"Directory '{data_path}' not found. Place your documents there.")

print(f"Current working directory: {os.getcwd()}")
print(f"Looking for documents in: {os.path.abspath(data_path)}")

# Try to load PDF files directly
documents = []
pdf_files = [f for f in os.listdir(data_path) if f.endswith('.pdf')]
print(f"Found {len(pdf_files)} PDF files")

for pdf_file in pdf_files[:3]:  # Start with just a few files to test
    try:
        pdf_path = os.path.join(data_path, pdf_file)
        print(f"Loading PDF: {pdf_path}")
        loader = PyPDFLoader(pdf_path)
        pdf_docs = loader.load()
        print(f"  - Loaded {len(pdf_docs)} pages from {pdf_file}")
        documents.extend(pdf_docs)
    except Exception as e:
        print(f"Error loading {pdf_file}: {e}")

if not documents:
    print("No documents were loaded. Trying DirectoryLoader as fallback...")
    try:
        loader = DirectoryLoader(data_path, glob="**/*.pdf")
        documents = loader.load()
        print(f"Loaded {len(documents)} documents with DirectoryLoader")
    except Exception as e:
        print(f"DirectoryLoader failed: {e}")

# Exit if no documents loaded
if not documents:
    print("ERROR: No documents were loaded. Check your data directory and file formats.")
    sys.exit(1)

# Split documents into smaller chunks
print(f"Splitting {len(documents)} documents into chunks...")
text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=100)
docs = text_splitter.split_documents(documents)
print(f"Split into {len(docs)} chunks")

# Check if docs are empty
if not docs:
    print("ERROR: No text chunks were created after splitting. Check your documents.")
    sys.exit(1)

# Generate Embeddings - with error handling
try:
    print("Initializing embedding model...")
    embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
    
    # Test with a single embedding first
    print("Testing embedding generation...")
    test_embedding = embeddings.embed_query("Agriculture test")
    print(f"Test embedding successful, vector length: {len(test_embedding)}")
    
    # Create FAISS Index
    print(f"Creating FAISS index for {len(docs)} documents...")
    faiss_index = FAISS.from_documents(docs, embeddings)
    
    # Save the FAISS Index
    index_path = "vector_store/faiss_index"
    os.makedirs(index_path, exist_ok=True)
    faiss_index.save_local(index_path)
    
    print("✅ FAISS Index successfully created and saved!")
except Exception as e:
    print(f"ERROR during embedding or indexing: {e}")
    import traceback
    traceback.print_exc()
    sys.exit(1)