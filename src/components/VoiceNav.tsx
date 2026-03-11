import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function VoiceNav() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState('');
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    try {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
          setIsListening(true);
          setError('');
          setTranscript('');
        };

        recognition.onresult = (event: any) => {
          try {
            const current = event.resultIndex;
            if (event.results && event.results[current]) {
              const result = event.results[current][0].transcript.toLowerCase();
              setTranscript(result);
              handleCommand(result);
            }
          } catch (err) {
            console.error('Error processing speech result:', err);
          }
        };

        recognition.onerror = (event: any) => {
          console.error('Speech recognition error', event.error);
          if (event.error === 'not-allowed') {
            setError('Microphone access denied. Please allow microphone permissions.');
          } else {
            setError('Could not hear you clearly. Try again.');
          }
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      } else {
        setError('Voice navigation not supported in this browser.');
      }
    } catch (err) {
      console.error('Error initializing speech recognition:', err);
      setError('Voice navigation not supported in this browser.');
    }
  }, []);

  const handleCommand = (command: string) => {
    let targetId = '';

    if (command.includes('interior') || command.includes('design') || command.includes('work') || command.includes('project') || command.includes('portfolio') || command.includes('bakery') || command.includes('tatwa') || command.includes('wallnut')) {
      targetId = 'work';
    } else if (command.includes('service') || command.includes('expertise') || command.includes('stack') || command.includes('technology')) {
      targetId = 'services';
    } else if (command.includes('about') || command.includes('team') || command.includes('story') || command.includes('who')) {
      targetId = 'about';
    } else if (command.includes('terminal') || command.includes('code') || command.includes('engine') || command.includes('developer') || command.includes('contact') || command.includes('hire') || command.includes('book')) {
      targetId = 'terminal';
    }

    if (targetId) {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      setError(`Command not recognized: "${command}"`);
    }
  };

  const toggleListening = () => {
    if (!recognitionRef.current) {
      setError('Voice navigation not supported in this browser.');
      return;
    }
    try {
      if (isListening) {
        recognitionRef.current.stop();
      } else {
        recognitionRef.current.start();
      }
    } catch (err) {
      console.error('Error toggling speech recognition:', err);
      setIsListening(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[100] flex flex-col items-end gap-2">
      <AnimatePresence>
        {(isListening || transcript || error) && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="bg-[#1c1b19]/90 backdrop-blur-md border border-[#c4a277]/30 px-4 py-3 rounded-xl shadow-2xl max-w-[250px] text-right"
          >
            {isListening && !transcript && !error && (
              <div className="flex items-center justify-end gap-2 text-[#c4a277]">
                <Loader2 className="w-3 h-3 animate-spin" />
                <span className="text-[10px] font-mono uppercase tracking-widest">Listening...</span>
              </div>
            )}
            {transcript && !error && (
              <div className="text-xs font-mono text-[#e6e2d3]">
                "{transcript}"
              </div>
            )}
            {error && (
              <div className="text-[10px] font-mono text-red-400 uppercase tracking-widest">
                {error}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <a
        href="https://wa.me/919730575099"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-3 py-2 rounded-full bg-[#1c1b19]/80 backdrop-blur-md border border-[#c4a277]/30 text-[#c4a277] hover:bg-[#c4a277] hover:text-[#1c1b19] transition-all duration-300 shadow-xl"
        title="Chat on WhatsApp"
      >
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <span className="text-xs font-mono uppercase tracking-widest font-bold">+91 9730575099</span>
      </a>

      <button
        onClick={toggleListening}
        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl border ${
          isListening 
            ? 'bg-red-500/20 border-red-500/50 text-red-500' 
            : 'bg-[#1c1b19]/80 backdrop-blur-md border-[#c4a277]/30 text-[#c4a277] hover:bg-[#c4a277] hover:text-[#1c1b19]'
        }`}
        title="Voice Navigation"
      >
        {isListening ? (
          <div className="relative flex items-center justify-center">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-40"></span>
            <Mic className="w-5 h-5 relative z-10" />
          </div>
        ) : (
          <Mic className="w-5 h-5" />
        )}
      </button>
    </div>
  );
}
