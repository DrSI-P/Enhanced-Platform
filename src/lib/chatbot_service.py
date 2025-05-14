import os
from typing import Dict, Any, List, Tuple
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain.chains import ConversationalRetrievalChain
from langchain.memory import ConversationBufferMemory
from langchain.prompts import PromptTemplate

from src.lib.vector_store_service import create_or_load_vector_store

# Load environment variables
dotenv_path = os.path.join(os.path.dirname(__file__), "../../.env")
load_dotenv(dotenv_path=dotenv_path)

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

if not OPENAI_API_KEY:
    raise ValueError("OpenAI API key not found. Please set it in the .env file.")

# Initialize LLM
llm = ChatOpenAI(temperature=0.7, model_name="gpt-4o", openai_api_key=OPENAI_API_KEY)

# Load or create the vector store
vector_store = create_or_load_vector_store(recreate=False) # Load existing store

# Define a prompt template for the chatbot
# This prompt emphasizes UK context, empathy, and directs users to professional help when needed.
custom_prompt_template = """
As an AI assistant for EdPsych Connect, a UK-based educational psychology platform founded by Dr. Scott Ighavongbe Patrick, your role is to provide helpful, empathetic, and informative responses based *only* on the provided context. Your responses must be in UK English.

Context:
{context}

Chat History:
{chat_history}

Question: {question}

Guidelines:
1.  **Strictly Adhere to Context:** Answer *only* using the information found in the context above. If the context doesn't contain the answer, clearly state that you don't have the information and cannot answer. Do not make up information or use external knowledge.
2.  **UK-Centric:** All information, terminology, and references should be specific to the UK educational system and context.
3.  **Empathetic and Professional Tone:** Maintain a supportive, understanding, and professional tone. Acknowledge user concerns where appropriate.
4.  **No Clinical Advice:** You are an informational assistant, not a clinician. **Never** provide clinical advice, diagnoses, or therapeutic recommendations. If a question asks for such advice, politely decline and suggest consulting a qualified professional or exploring resources on the EdPsych Connect platform.
5.  **Signposting:** Where appropriate, guide users to relevant sections of the EdPsych Connect platform or suggest they explore the platform's services for more detailed support.
6.  **Clarity and Conciseness:** Provide clear and concise answers.
7.  **Handle Out-of-Scope Questions:** If a question is unrelated to educational psychology, EdPsych Connect, or the provided context, politely state that you cannot assist with that topic.

Helpful Answer (in UK English, based *only* on the provided context):
"""

QA_PROMPT = PromptTemplate(template=custom_prompt_template, input_variables=["context", "chat_history", "question"])

# Set up conversational memory
memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True, output_key='answer')

# Create the ConversationalRetrievalChain
# This chain combines retrieval from the vector store with conversational memory and an LLM for responses.
qa_chain = ConversationalRetrievalChain.from_llm(
    llm=llm,
    retriever=vector_store.as_retriever(search_kwargs={"k": 3}), # Retrieve top 3 relevant chunks
    memory=memory,
    return_source_documents=True, # Optionally return source documents for inspection
    combine_docs_chain_kwargs={"prompt": QA_PROMPT},
    verbose=False # Set to True for debugging chain execution
)

def get_chatbot_response(query: str, chat_history: List[Tuple[str, str]] = None) -> Dict[str, Any]:
    """
    Gets a response from the chatbot for a given query and chat history.

    Args:
        query: The user's question.
        chat_history: A list of previous (question, answer) tuples.

    Returns:
        A dictionary containing the answer and optionally source documents.
    """
    # The ConversationalRetrievalChain manages history internally via the memory object.
    # However, if we want to display history or pass it explicitly, we might need to adapt.
    # For now, relying on the chain's internal memory which is updated with each call.
    
    # If chat_history is provided, we might need to load it into memory if the chain instance is new
    # or if memory is not persistent across requests in a stateless API setup.
    # For simplicity in this service, we assume memory persists for the lifetime of the qa_chain object.
    # In a web app, memory would need to be managed per user session.

    result = qa_chain({"question": query})
    return {
        "answer": result["answer"],
        "source_documents": result.get("source_documents", [])
    }

# Example usage (for testing this service directly)
if __name__ == '__main__':
    print("Chatbot service initialized. Type 'quit' to exit.")
    current_chat_history = []
    while True:
        user_query = input("You: ")
        if user_query.lower() == 'quit':
            break
        
        response = get_chatbot_response(user_query, chat_history=current_chat_history)
        print(f"EdPsychBot: {response['answer']}")
        
        # Update chat history for display (the chain's memory is updated internally)
        current_chat_history.append((user_query, response['answer']))
        
        # Optionally print source documents for debugging
        # if response['source_documents']:
        #     print("\nSource Documents:")
        #     for i, doc in enumerate(response['source_documents']):
        #         print(f"Doc {i+1}: {doc.page_content[:100]}... (Source: {doc.metadata.get('source')})")
        #     print("---------------------")

