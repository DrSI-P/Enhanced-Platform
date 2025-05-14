import os
import re
from langchain_community.document_loaders import TextLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import FAISS
from dotenv import load_dotenv

# Load environment variables from .env file
# Ensure this path is correct relative to where this script will be run from
# or that the .env file is in the root of the project when running Next.js
dotenv_path = os.path.join(os.path.dirname(__file__), "../../.env") 
# Assuming this script is in src/lib and .env is in the project root
load_dotenv(dotenv_path=dotenv_path)

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

if not OPENAI_API_KEY:
    raise ValueError("OpenAI API key not found. Please set it in the .env file.")

# Define the path to the knowledge base file and the vector store
KB_FILE_PATH = os.path.join(os.path.dirname(__file__), "../../chatbot_knowledge_base.md") 
# Assuming chatbot_knowledge_base.md is in the project root
VECTOR_STORE_PATH = os.path.join(os.path.dirname(__file__), "../../vector_store_faiss")

def create_or_load_vector_store(recreate: bool = False) -> FAISS:
    """
    Creates a new vector store from the knowledge base file or loads an existing one.

    Args:
        recreate: If True, forces recreation of the vector store even if it exists.

    Returns:
        An FAISS vector store instance.
    """
    embeddings = OpenAIEmbeddings(openai_api_key=OPENAI_API_KEY)

    if os.path.exists(VECTOR_STORE_PATH) and not recreate:
        print(f"Loading existing vector store from {VECTOR_STORE_PATH}")
        try:
            vector_store = FAISS.load_local(VECTOR_STORE_PATH, embeddings, allow_dangerous_deserialization=True)
            print("Vector store loaded successfully.")
            return vector_store
        except Exception as e:
            print(f"Error loading existing vector store: {e}. Will attempt to recreate.")
            # Fall through to recreate if loading fails

    print(f"Creating new vector store from {KB_FILE_PATH}...")
    if not os.path.exists(KB_FILE_PATH):
        raise FileNotFoundError(f"Knowledge base file not found at {KB_FILE_PATH}")

    # Load the knowledge base document
    # Using TextLoader for .md files, assuming it handles Markdown reasonably well for splitting.
    loader = TextLoader(KB_FILE_PATH, encoding="utf-8")
    documents = loader.load()

    # Split the document into chunks
    # Using RecursiveCharacterTextSplitter which is good for generic text and tries to keep paragraphs together.
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,  # Max size of a chunk
        chunk_overlap=200, # Overlap between chunks to maintain context
        length_function=len,
        is_separator_regex=False, # Treat separators literally
        separators=[
            "\n\n## ", # Split by H2 headings
            "\n\n### ", # Split by H3 headings
            "\n\n#### ", # Split by H4 headings
            "\n\n",  # Split by double newlines (paragraphs)
            "\n",    # Split by single newlines
            " ",     # Split by spaces
            ""       # Split by characters as a last resort
        ]
    )
    docs_chunks = text_splitter.split_documents(documents)
    
    if not docs_chunks:
        raise ValueError("No document chunks were created. Check the knowledge base file and splitter settings.")

    print(f"Knowledge base split into {len(docs_chunks)} chunks.")

    # Create the FAISS vector store from the document chunks
    try:
        vector_store = FAISS.from_documents(docs_chunks, embeddings)
        vector_store.save_local(VECTOR_STORE_PATH)
        print(f"New vector store created and saved to {VECTOR_STORE_PATH}")
        return vector_store
    except Exception as e:
        print(f"Error creating vector store: {e}")
        raise

async def main_setup_vector_store():
    print("Setting up chatbot vector store...")
    try:
        # Force recreate if you update the knowledge base significantly
        # For initial run, recreate=True is good.
        # For subsequent runs, recreate=False to load existing unless KB changed.
        store = create_or_load_vector_store(recreate=True) 
        
        # Test a similarity search (optional)
        if store:
            query = "What is an EHCP?"
            results = store.similarity_search(query, k=2)
            print(f"\n--- Test Similarity Search for: {query} ---")
            for i, doc in enumerate(results):
                # Limit page_content display for brevity
                content_preview = doc.page_content[:200] + "..." if len(doc.page_content) > 200 else doc.page_content
                print(f"Result {i+1}:\n{content_preview}\nMetadata: {doc.metadata}\n")
            print("-----------------------------------------")
    except Exception as e:
        print(f"Failed to set up vector store: {e}")

if __name__ == "__main__":
    import asyncio
    # This script would typically be run once to create the store,
    # or the create_or_load_vector_store function would be called by the chatbot service.
    # Ensure .env file is at /home/ubuntu/edpsychconnect/.env with OPENAI_API_KEY
    asyncio.run(main_setup_vector_store())


