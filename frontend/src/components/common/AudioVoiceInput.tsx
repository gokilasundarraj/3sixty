import React, { useState, useEffect, useRef } from 'react';
import { FiMic, FiMicOff } from 'react-icons/fi';

interface AudioVoiceInputProps {
  onTranscript: (text: string) => void;
  className?: string;
}

export const AudioVoiceInput: React.FC<AudioVoiceInputProps> = ({ onTranscript, className = '' }) => {
  const [isListening, setIsListening] = useState(false);
  const [language, setLanguage] = useState<'ta-IN' | 'en-IN' | 'hi-IN'>('en-IN');
  const [supported, setSupported] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = language;

    recognition.onstart = () => {
      setIsListening(true);
      setErrorMessage(null);
    };

    recognition.onresult = (event: any) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript + ' ';
        }
      }
      if (finalTranscript) {
        onTranscript(finalTranscript.trim());
      }
    };

    recognition.onerror = (event: any) => {
      console.warn('Speech recognition status:', event.error);
      if (event.error === 'not-allowed') {
        setErrorMessage('Microphone access was denied. Please allow mic permissions in your browser.');
      } else if (event.error === 'network') {
        setErrorMessage('Voice recognition network connection error.');
      }
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {}
      }
    };
  }, [language, onTranscript]);

  const toggleListening = () => {
    if (!supported) {
      setErrorMessage('Voice recognition is not supported in this browser. Please type your message.');
      return;
    }

    if (isListening) {
      try {
        recognitionRef.current?.stop();
      } catch {}
      setIsListening(false);
    } else {
      setErrorMessage(null);
      try {
        if (recognitionRef.current) {
          recognitionRef.current.lang = language;
          recognitionRef.current.start();
        }
      } catch (err) {
        console.warn('Speech recognition start error:', err);
      }
    }
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div className="flex items-center gap-2">
        {/* Language selector */}
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value as any)}
          disabled={isListening}
          aria-label="Speech recognition language"
          className="bg-[#140e0b] text-[#f6e9e1] text-xs rounded-lg px-2.5 py-1.5 border border-[#c8714d]/30 focus:border-[#f0a07a] focus:outline-none cursor-pointer"
        >
          <option value="en-IN">English (India)</option>
          <option value="ta-IN">Tamil (தமிழ்)</option>
          <option value="hi-IN">Hindi (हिन्दी)</option>
        </select>

        {/* Mic Toggle Button */}
        <button
          type="button"
          onClick={toggleListening}
          aria-label={isListening ? 'Stop voice recording' : 'Start voice recording'}
          className={`relative flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 ${
            isListening
              ? 'bg-red-500/20 text-red-400 border border-red-500/60 shadow-[0_0_15px_rgba(239,68,68,0.4)]'
              : 'bg-[#18110c] hover:bg-[#251a14] text-[#f0a07a] border border-[#c8714d]/40'
          }`}
        >
          {isListening ? (
            <>
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <FiMicOff className="w-4 h-4 text-red-400" />
              <span>Listening ({language.split('-')[0]})...</span>
            </>
          ) : (
            <>
              <FiMic className="w-4 h-4 text-[#f0a07a]" />
              <span>Speak Message</span>
            </>
          )}
        </button>
      </div>

      {errorMessage && (
        <p className="text-xs text-[#f0a07a] font-normal mt-1">
          {errorMessage}
        </p>
      )}
    </div>
  );
};
