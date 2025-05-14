import { useState, useEffect, useCallback } from "react";

interface SpeechRecognitionHook {
  isListening: boolean;
  transcript: string;
  error: string | null;
  browserSupportsSpeechRecognition: boolean;
  startListening: () => void;
  stopListening: () => void;
  resetTranscript: () => void;
}

const useVoiceRecognition = (): SpeechRecognitionHook => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [browserSupportsSpeechRecognition, setBrowserSupportsSpeechRecognition] = useState(false);

  useEffect(() => {
    const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognitionAPI) {
      setBrowserSupportsSpeechRecognition(true);
      const newRecognition = new SpeechRecognitionAPI();
      newRecognition.continuous = false; // Get a single final result
      newRecognition.interimResults = true; // Get interim results as user speaks
      newRecognition.lang = "en-GB"; // Set to UK English

      newRecognition.onstart = () => {
        setIsListening(true);
        setError(null);
      };

      newRecognition.onresult = (event: SpeechRecognitionEvent) => {
        let interimTranscript = "";
        let finalTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
        // Show interim results, but final result will overwrite it
        setTranscript(finalTranscript || interimTranscript);
        if (finalTranscript) {
            // Automatically stop listening once a final result is obtained for non-continuous mode
            // However, some browsers might require explicit stop or handle 'end' event.
        }
      };

      newRecognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error("Speech recognition error", event.error);
        if (event.error === "no-speech") {
          setError("No speech was detected. Please try again.");
        } else if (event.error === "audio-capture") {
          setError("Microphone problem. Ensure it is enabled and permissions are granted.");
        } else if (event.error === "not-allowed") {
          setError("Microphone access was denied. Please enable it in your browser settings.");
        } else {
          setError(`Error: ${event.error}`);
        }
        setIsListening(false);
      };

      newRecognition.onend = () => {
        setIsListening(false);
        // Transcript should already be set by onresult
      };
      setRecognition(newRecognition);
    } else {
      setBrowserSupportsSpeechRecognition(false);
      console.warn("Browser does not support SpeechRecognition API.");
      setError("Voice input is not supported by your browser.");
    }

    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run only once on mount

  const startListening = useCallback(() => {
    if (recognition && !isListening) {
      try {
        setTranscript(""); // Clear previous transcript
        setError(null);
        recognition.start();
      } catch (e) {
        // Catch errors if recognition is already started (though isListening should prevent this)
        console.error("Error starting speech recognition:", e);
        setError("Could not start voice input. Please try again.");
        setIsListening(false);
      }
    }
  }, [recognition, isListening]);

  const stopListening = useCallback(() => {
    if (recognition && isListening) {
      recognition.stop();
      setIsListening(false); // Explicitly set listening to false
    }
  }, [recognition, isListening]);

  const resetTranscript = useCallback(() => {
    setTranscript("");
  }, []);

  return {
    isListening,
    transcript,
    error,
    browserSupportsSpeechRecognition,
    startListening,
    stopListening,
    resetTranscript
  };
};

export default useVoiceRecognition;

