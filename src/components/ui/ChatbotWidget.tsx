import React, { useState, useEffect, useRef, FormEvent } from 'react';
import { MessageSquare, Send, X, Bot, User, Loader2 } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  source_documents?: any[];
}

const ChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const inputRef = useRef<null | HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      // Add initial bot message when chat opens
      setMessages([
        {
          id: 'initial-bot-message',
          text: "Hello! I am the EdPsych Connect AI assistant. How can I help you today with information about UK educational psychology, EHCNA, or EBSA? Please note, I cannot provide clinical advice.",
          sender: 'bot',
        },
      ]);
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setMessages([]); // Clear messages when closing
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: inputValue,
      sender: 'user',
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const chatHistory = messages
        .filter(msg => msg.id !== 'initial-bot-message') // Exclude initial message from history for API
        .map(msg => [msg.sender === 'user' ? 'Human' : 'AI', msg.text]);

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: userMessage.text, chat_history: chatHistory }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get response from chatbot');
      }

      const data = await response.json();
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        text: data.answer || "I'm sorry, I couldn't process that request.",
        sender: 'bot',
        source_documents: data.source_documents,
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error: any) {
      console.error('Chatbot error:', error);
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        text: error.message || 'An error occurred. Please try again.',
        sender: 'bot',
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }
    setIsLoading(false);
    inputRef.current?.focus();
  };

  if (!isOpen) {
    return (
      <button
        onClick={toggleOpen}
        className="fixed bottom-5 right-5 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50"
        aria-label="Open chat"
      >
        <MessageSquare size={24} />
      </button>
    );
  }

  return (
    <div className="fixed bottom-5 right-5 w-full max-w-md h-[70vh] max-h-[600px] bg-white border border-gray-300 rounded-lg shadow-xl flex flex-col z-50">
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center rounded-t-lg">
        <h3 className="font-semibold text-lg">EdPsych Connect Assistant</h3>
        <button onClick={toggleOpen} className="text-white hover:text-gray-200" aria-label="Close chat">
          <X size={24} />
        </button>
      </header>

      <div className="flex-grow p-4 overflow-y-auto bg-gray-50">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex mb-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`p-3 rounded-lg max-w-[80%] ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
              <div className="flex items-center mb-1">
                {msg.sender === 'bot' ? <Bot size={18} className="mr-2 text-blue-600" /> : <User size={18} className="mr-2 text-white" />}
                <span className="font-semibold text-sm">{msg.sender === 'user' ? 'You' : 'Assistant'}</span>
              </div>
              <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
              {/* Optionally display source documents for bot messages for debugging/transparency */}
              {/* {msg.sender === 'bot' && msg.source_documents && msg.source_documents.length > 0 && (
                <div className="mt-2 text-xs text-gray-500">
                  <p className="font-semibold">Sources:</p>
                  {msg.source_documents.map((doc, index) => (
                    <p key={index} className="truncate">- {doc.metadata?.source || 'Unknown source'}: {doc.page_content.substring(0,50)}...</p>
                  ))}
                </div>
              )} */}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
        {isLoading && (
          <div className="flex justify-center items-center p-2">
            <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
            <span className="ml-2 text-sm text-gray-600">Assistant is typing...</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="border-t border-gray-300 p-3 bg-white rounded-b-lg">
        <div className="flex items-center">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask a question..."
            className="flex-grow p-2 border border-gray-300 rounded-l-md focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded-r-md hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
            disabled={isLoading || !inputValue.trim()}
            aria-label="Send message"
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatbotWidget;

