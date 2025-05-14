import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image"; // Import Next.js Image component
import useVoiceRecognition from "@/hooks/useVoiceRecognition";
import { Search, Mic, MicOff, AlertTriangle } from 'lucide-react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSupportMenuOpen, setIsSupportMenuOpen] = useState(false);
  const supportMenuRef = useRef<HTMLDivElement>(null);
  const supportButtonRef = useRef<HTMLButtonElement>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const {
    isListening,
    transcript,
    error: voiceError,
    browserSupportsSpeechRecognition,
    startListening,
    stopListening,
    resetTranscript
  } = useVoiceRecognition();

  useEffect(() => {
    if (transcript) {
      setSearchQuery(transcript);
    }
  }, [transcript]);

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    if (transcript && event.target.value !== transcript) {
        resetTranscript();
    }
  };

  const handleVoiceSearchToggle = () => {
    if (isListening) {
      stopListening();
    } else {
      setSearchQuery("");
      resetTranscript();
      startListening();
    }
  };
  
  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Search submitted:", searchQuery);
  };

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleSupportMenu = () => {
    setIsSupportMenuOpen(!isSupportMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        supportMenuRef.current &&
        !supportMenuRef.current.contains(event.target as Node) &&
        supportButtonRef.current &&
        !supportButtonRef.current.contains(event.target as Node)
      ) {
        setIsSupportMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSupportMenuKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsSupportMenuOpen(false);
      supportButtonRef.current?.focus();
    }
  };

  const handleSupportItemKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      // Let the Link component handle navigation
    } else if (event.key === "Escape") {
      setIsSupportMenuOpen(false);
      supportButtonRef.current?.focus();
    }
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-50 top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
                {/* Replace CSS monogram with Image component */}
                <Image 
                  src="/images/EdPsych_Connect_Logo.png" 
                  alt="EdPsych Connect Logo" 
                  width={180} // Adjust width as needed, maintaining aspect ratio
                  height={40} // Adjust height as needed, maintaining aspect ratio
                  priority // Load logo quickly
                />
              </Link>
            </div>
            {/* Conceptual Search Bar with Voice Input */}
            <div className="hidden sm:ml-6 sm:flex items-center">
              <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                <input 
                  type="search" 
                  name="search" 
                  placeholder="Search platform..."
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  className="py-2 px-4 border border-gray-300 rounded-l-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                />
                {browserSupportsSpeechRecognition && (
                  <button 
                    type="button"
                    onClick={handleVoiceSearchToggle}
                    title={isListening ? "Stop listening" : "Search with voice"}
                    className={`p-2 border-t border-b ${isListening ? "border-red-500 bg-red-100 text-red-700" : "border-gray-300 hover:bg-gray-100"} focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                  >
                    {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                    <span className="sr-only">{isListening ? "Stop voice search" : "Start voice search"}</span>
                  </button>
                )}
                <button 
                  type="submit"
                  className="p-2 border border-l-0 border-gray-300 rounded-r-md bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  title="Submit search"
                >
                  <Search size={18} />
                  <span className="sr-only">Submit search</span>
                </button>
              </form>
              {voiceError && (
                <p className="ml-2 text-xs text-red-600 flex items-center"><AlertTriangle size={14} className="mr-1"/> {voiceError}</p>
              )}
            </div>
          </div>

          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-8">
            <button 
              onClick={() => scrollToSection("features")}
              className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Features
            </button>
            <Link href="/resources" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Resources
            </Link>
            <Link href="/professional-development" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Professional Development
            </Link>
            <div className="relative" ref={supportMenuRef}>
              <button 
                ref={supportButtonRef}
                onClick={toggleSupportMenu}
                onKeyDown={handleSupportMenuKeyDown}
                aria-haspopup="true"
                aria-expanded={isSupportMenuOpen}
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Support <span className={`ml-1 transform transition-transform duration-200 ${isSupportMenuOpen ? "rotate-180" : "rotate-0"}`}>▼</span>
              </button>
              {isSupportMenuOpen && (
                <div 
                  className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 ring-1 ring-black ring-opacity-5"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="support-menu-button"
                  onKeyDown={handleSupportMenuKeyDown}
                >
                  <Link href="/executive-dysfunction" onClick={() => setIsSupportMenuOpen(false)} onKeyDown={(e) => handleSupportItemKeyDown(e)} role="menuitem" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none">
                    Executive Dysfunction
                  </Link>
                  <Link href="/semh-support" onClick={() => setIsSupportMenuOpen(false)} onKeyDown={(e) => handleSupportItemKeyDown(e)} role="menuitem" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none">
                    SEMH Support
                  </Link>
                </div>
              )}
            </div>
            <Link href="/about" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              About
            </Link>
            <Link href="/contact" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Contact
            </Link>
            <Link href="/login" className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Log in
            </Link>
            <Link href="/register" className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Sign up
            </Link>
          </div>

          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <span className="sr-only">Open main menu</span>
              {!isMobileMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="pt-2 pb-3 space-y-1 px-2">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center mb-2">
              <input 
                type="search" 
                name="search-mobile" 
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchInputChange}
                className="w-full py-2 px-4 border border-gray-300 rounded-l-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              />
              {browserSupportsSpeechRecognition && (
                <button 
                  type="button"
                  onClick={handleVoiceSearchToggle}
                  title={isListening ? "Stop listening" : "Search with voice"}
                  className={`p-2 border-t border-b ${isListening ? "border-red-500 bg-red-100 text-red-700" : "border-gray-300 hover:bg-gray-100"} focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                >
                  {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                  <span className="sr-only">{isListening ? "Stop voice search" : "Start voice search"}</span>
                </button>
              )}
              <button 
                type="submit"
                className="p-2 border border-l-0 border-gray-300 rounded-r-md bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                title="Submit search"
              >
                <Search size={18} />
                <span className="sr-only">Submit search</span>
              </button>
            </form>
            {voiceError && (
                <p className="px-3 pb-2 text-xs text-red-600 flex items-center"><AlertTriangle size={14} className="mr-1"/> {voiceError}</p>
            )}
            <button onClick={() => { scrollToSection("features"); setIsMobileMenuOpen(false); }} className="block w-full text-left pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              Features
            </button>
            <Link href="/resources" onClick={() => setIsMobileMenuOpen(false)} className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              Resources
            </Link>
            <Link href="/professional-development" onClick={() => setIsMobileMenuOpen(false)} className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              Professional Development
            </Link>
            <Link href="/executive-dysfunction" onClick={() => setIsMobileMenuOpen(false)} className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              Executive Dysfunction
            </Link>
            <Link href="/semh-support" onClick={() => setIsMobileMenuOpen(false)} className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              SEMH Support
            </Link>
            <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              About
            </Link>
            <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              Contact
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-4">
              <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="block text-base font-medium text-gray-500 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                Log in
              </Link>
            </div>
            <div className="mt-3 px-2 space-y-1">
              <Link href="/register" onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

