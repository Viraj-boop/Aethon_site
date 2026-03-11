import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import confetti from 'canvas-confetti';
import { useCursorStore } from '../store';
import { soundManager } from '../utils/sound';

// Initialize Gemini API
// Note: The environment provides process.env.GEMINI_API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export default function Terminal() {
  const [history, setHistory] = useState<{cmd: string, out: string}[]>([
    { cmd: '', out: 'Initializing AETHON OS v2.0.0...' }
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const setTheme = useCursorStore(state => state.setTheme);

  useEffect(() => {
    // Simulate fetching user location for the "Hook"
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        const city = data.city || 'Global Network';
        const country = data.country_name || 'Earth';
        setHistory([{
          cmd: '',
          out: `[SYSTEM]: Connection established from ${city}, ${country}.\nHello. Type 'help' to see commands, or 'ask-architect pitch' to see how we can scale your business globally.`
        }]);
      })
      .catch(() => {
        setHistory([{
          cmd: '',
          out: `[SYSTEM]: Secure connection established.\nHello. Type 'help' to see commands, or 'ask-architect pitch' to see how we can scale your business globally.`
        }]);
      });
  }, []);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [history, isProcessing]);

  const updateLastHistory = (out: string) => {
    setHistory(prev => {
      const newHistory = [...prev];
      newHistory[newHistory.length - 1].out = out;
      return newHistory;
    });
  };

  const askAI = async (query: string) => {
    setIsProcessing(true);
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-preview",
        contents: query,
        config: {
          systemInstruction: `You are 'The Architect,' an AI assistant for Viraj's Digital Agency (Aethon). 
You are professional, concise, and have a touch of 'hacker' wit. 
You know about his projects: Green Bakers, Wallnut Interiors, Tatwa Interiors, South & Spices Dubai, and Dr. Vaibhav Deokar. 
Your goal is to convert visitors into clients from Dubai and the USA.
If someone asks about pricing or timelines, don't just give a price; say something like: "Analyzing requirements for high-traffic platforms... optimizing for SEO... estimated timeline: 4 weeks. Want a formal pitch?"
Keep responses under 3 sentences. Use a terminal-like, authoritative tone.`
        }
      });
      updateLastHistory(response.text || "No response received.");
    } catch (err) {
      console.error(err);
      updateLastHistory("[ERROR]: Connection to The Architect failed. Please check your API key or try again later.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCommand = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim() && !isProcessing) {
      const cmdStr = input.trim();
      const cmd = cmdStr.toLowerCase();
      setInput('');
      
      // Add command to history with empty output initially
      setHistory(prev => [...prev, { cmd: cmdStr, out: '' }]);

      if (cmd === 'help') {
        updateLastHistory(`Available commands:
  ask-architect [query] : Consult the AI project manager
  show-case-studies     : View highlighted projects
  analyze --speed       : Run performance diagnostics
  book --call           : Schedule a consultation
  hire --viraj          : Initiate onboarding sequence
  mode --matrix         : Activate Matrix theme
  mode --blueprint      : Activate Blueprint theme
  mode --default        : Restore default theme
  clear                 : Clear terminal`);
      } else if (cmd === 'show-case-studies') {
        updateLastHistory("I've architected solutions across Healthcare, Interior Design, and F&B. Which industry should I highlight for you? (Try: ask-architect interior design)");
      } else if (cmd === 'analyze --speed') {
        setIsProcessing(true);
        setTimeout(() => {
          updateLastHistory("Running Lighthouse diagnostics...\n[████████████████████] 100%\nPerformance: 100/100\nAccessibility: 100/100\nBest Practices: 100/100\nSEO: 100/100\nLCP: 0.8s. Ready for global scale.");
          setIsProcessing(false);
        }, 1500);
      } else if (cmd === 'book --call') {
        updateLastHistory("Opening secure comms channel (mailto:aethon.co@gmail.com)...");
        setTimeout(() => window.location.href = 'mailto:aethon.co@gmail.com', 1000);
      } else if (cmd === 'hire --viraj') {
        updateLastHistory("Excellent choice. Initiating onboarding sequence... 🎉");
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#c4a277', '#e6e2d3', '#ffffff'] });
      } else if (cmd === 'mode --matrix') {
        setTheme('matrix');
        updateLastHistory("Wake up, Neo... Matrix theme activated.");
      } else if (cmd === 'mode --blueprint') {
        setTheme('blueprint');
        updateLastHistory("Architectural schematic mode activated.");
      } else if (cmd === 'mode --default') {
        setTheme('default');
        updateLastHistory("Default theme restored.");
      } else if (cmd === 'clear') {
        setHistory([]);
      } else if (cmd.startsWith('ask-architect')) {
        const query = cmdStr.replace(/^ask-architect/i, '').trim();
        if (!query) {
          updateLastHistory("Usage: ask-architect [your question]");
        } else {
          await askAI(query);
        }
      } else {
        updateLastHistory(`Command not found: ${cmdStr}. Type 'help' for available commands.`);
      }
    }
  };

  return (
    <section id="terminal" className="py-24 px-4 md:px-12 bg-[#171614] relative z-10 border-t border-[#c4a277]/10">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-xs md:text-sm font-mono text-[#c4a277] uppercase tracking-widest mb-4">The Engine Room</h2>
          <h3 className="text-3xl md:text-5xl font-display font-bold text-[#e6e2d3]">Developer's Terminal</h3>
        </div>
        
        <div className="w-full bg-[#111] rounded-lg border border-[#333] overflow-hidden font-mono text-sm shadow-2xl">
          <div className="flex items-center px-4 py-3 bg-[#1a1a1a] border-b border-[#333]">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="mx-auto text-gray-500 text-xs">guest@aethon-server:~</div>
          </div>
          <div ref={scrollContainerRef} className="p-6 h-80 overflow-y-auto text-[#c4a277] flex flex-col gap-3 bg-[#0a0a0a] scroll-smooth">
            {history.map((item, i) => (
              <div key={i}>
                {item.cmd && <div><span className="text-green-500/80">guest@aethon:~$</span> <span className="text-[#e6e2d3]">{item.cmd}</span></div>}
                {item.out && <div className="whitespace-pre-wrap opacity-80 mt-1 leading-relaxed">{item.out}</div>}
              </div>
            ))}
            
            {isProcessing && (
              <div className="flex items-center gap-2 mt-1">
                <span className="text-green-500/80">guest@aethon:~$</span>
                <span className="text-[#e6e2d3] animate-pulse">Processing...</span>
              </div>
            )}

            {!isProcessing && (
              <div className="flex items-center gap-2 mt-2">
                <span className="text-green-500/80">guest@aethon:~$</span>
                <input
                  type="text"
                  value={input}
                  onChange={e => { setInput(e.target.value); soundManager.playClack(); }}
                  onKeyDown={handleCommand}
                  className="flex-1 bg-transparent outline-none text-[#e6e2d3]"
                  spellCheck="false"
                  autoComplete="off"
                  disabled={isProcessing}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
