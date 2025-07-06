from langchain.document_loaders import PyPDFLoader, TextLoader, CSVLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
import os
import glob

def load_and_split():
    """
    Load documents from various sources and split into chunks with metadata preservation.
    
    Returns:
        list: List of Document objects with text and metadata
    """
    documents = []
    
    # Load all PDFs in data folder
    pdf_files = glob.glob("data/*.pdf")
    for file in pdf_files:
        loader = PyPDFLoader(file)
        docs = loader.load()
        # Add file source to metadata
        for doc in docs:
            doc.metadata["source"] = os.path.basename(file)
        documents.extend(docs)
    
    # Load all text files
    txt_files = glob.glob("data/*.txt")
    for file in txt_files:
        loader = TextLoader(file)
        docs = loader.load()
        # Add metadata
        for doc in docs:
            doc.metadata["source"] = os.path.basename(file)
        documents.extend(docs)
    
    # Load all CSV files
    csv_files = glob.glob("data/*.csv")
    for file in csv_files:
        try:
            loader = CSVLoader(file)
            docs = loader.load()
            # Add metadata
            for doc in docs:
                doc.metadata["source"] = os.path.basename(file)
            documents.extend(docs)
        except Exception as e:
            print(f"Error loading CSV file {file}: {e}")
    
    print(f"Loaded {len(documents)} documents from {len(pdf_files)} PDFs, {len(txt_files)} TXTs, and {len(csv_files)} CSVs")
    
    # Split documents into manageable chunks
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,  # Increased chunk size for better context
        chunk_overlap=200,  # Increased overlap
        separators=["\n\n", "\n", " ", ""]
    )
    
    split_docs = text_splitter.split_documents(documents)
    print(f"Split into {len(split_docs)} chunks")
    
    return split_docs

if __name__ == "__main__":
    documents = load_and_split()
    print(f"Loaded and split {len(documents)} text chunks from all documents!")