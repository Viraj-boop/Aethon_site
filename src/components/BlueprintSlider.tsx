import React, { useState, useRef } from 'react';
import { useCursorStore } from '../store';
import { soundManager } from '../utils/sound';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

export default function BlueprintSlider({ wireframe, final, title, description }: { wireframe: string, final: string, title: string, description: string }) {
  const [sliderPos, setSliderPos] = useState(50);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastSwooshTime = useRef(0);
  const { setActive, setText } = useCursorStore();

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = (x / rect.width) * 100;
    setSliderPos(Math.max(0, Math.min(100, percent)));
    
    const now = Date.now();
    if (now - lastSwooshTime.current > 100) {
      soundManager.playSwoosh();
      lastSwooshTime.current = now;
    }
  };

  return (
    <>
      <div className="flex flex-col gap-6 w-full mb-24 cursor-pointer" onClick={() => setIsOpen(true)}>
        <div
          ref={containerRef}
          className="relative w-full aspect-[4/3] md:aspect-[21/9] bg-[#171614] rounded-xl overflow-hidden cursor-ew-resize select-none border border-[#c4a277]/20 shadow-2xl"
          onMouseMove={(e) => { e.stopPropagation(); handleMove(e.clientX); }}
          onTouchMove={(e) => { e.stopPropagation(); handleMove(e.touches[0].clientX); }}
          onMouseEnter={() => { setActive(true); setText('DRAG'); }}
          onMouseLeave={() => { setActive(false); setText(''); }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Final Image (Background) */}
          <img src={final} alt="Final" className="absolute inset-0 w-full h-full object-cover pointer-events-none grayscale-[20%] sepia-[10%]" />

          {/* Wireframe Image (Foreground, Clipped) */}
          <div
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
          >
            <img src={wireframe} alt="Wireframe" className="absolute inset-0 w-full h-full object-cover grayscale opacity-80 contrast-150" />
            {/* Blueprint Overlay */}
            <div className="absolute inset-0 bg-[#1c1b19]/60 mix-blend-multiply" />
            <div className="absolute inset-0 bg-[#c4a277]/10 mix-blend-overlay" />
            
            {/* Grid lines for wireframe feel */}
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(#c4a277 1px, transparent 1px), linear-gradient(90deg, #c4a277 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
          </div>

          {/* Slider Handle */}
          <div
            className="absolute top-0 bottom-0 w-[1px] bg-[#c4a277] pointer-events-none"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-[#1c1b19] border border-[#c4a277] rounded-full flex items-center justify-center shadow-lg">
              <div className="flex gap-1">
                <div className="w-[1px] h-3 bg-[#c4a277]" />
                <div className="w-[1px] h-3 bg-[#c4a277]" />
              </div>
            </div>
          </div>
          
          {/* Labels */}
          <div className="absolute top-4 left-4 bg-[#1c1b19]/80 backdrop-blur text-[#c4a277] text-[10px] font-mono px-2 py-1 rounded border border-[#c4a277]/30">WIREFRAME / CODE</div>
          <div className="absolute top-4 right-4 bg-[#1c1b19]/80 backdrop-blur text-[#c4a277] text-[10px] font-mono px-2 py-1 rounded border border-[#c4a277]/30">LIVE SITE</div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 group">
           <h4 className="text-2xl md:text-4xl font-display text-[#e6e2d3] group-hover:text-[#c4a277] transition-colors">{title}</h4>
           <div className="flex flex-col items-end gap-2">
             <p className="text-sm font-mono text-[#c4a277] max-w-md text-right">{description}</p>
             <span className="text-[10px] font-sans uppercase tracking-widest text-[#e6e2d3] border-b border-[#e6e2d3]/30 pb-1">View Case Study</span>
           </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed inset-0 z-[99999] bg-[#171614] overflow-y-auto"
          >
            <div className="max-w-5xl mx-auto px-4 py-12 md:py-24 relative">
              <button 
                onClick={() => setIsOpen(false)}
                className="fixed top-8 right-8 w-12 h-12 rounded-full bg-[#1c1b19] border border-[#c4a277]/30 flex items-center justify-center text-[#c4a277] hover:bg-[#c4a277] hover:text-[#1c1b19] transition-colors z-50"
              >
                <X className="w-6 h-6" />
              </button>

              <h2 className="text-4xl md:text-7xl font-display font-bold text-[#e6e2d3] mb-8">{title}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
                <div className="col-span-2">
                  <img src={final} alt={title} className="w-full rounded-xl border border-[#c4a277]/20 shadow-2xl" />
                </div>
                <div className="flex flex-col gap-8">
                  <div>
                    <h3 className="text-xs font-mono text-[#c4a277] uppercase tracking-widest mb-2">The Challenge</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">Client required a high-performance, scalable solution capable of handling global traffic spikes while maintaining a premium aesthetic.</p>
                  </div>
                  <div>
                    <h3 className="text-xs font-mono text-[#c4a277] uppercase tracking-widest mb-2">Tech Stack</h3>
                    <div className="flex flex-wrap gap-2">
                      {['Next.js', 'AWS', 'Tailwind', 'Framer Motion'].map(t => (
                        <span key={t} className="text-[10px] font-mono border border-[#c4a277]/30 px-2 py-1 rounded text-[#e6e2d3]">{t}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xs font-mono text-[#c4a277] uppercase tracking-widest mb-2">Metrics</h3>
                    <ul className="text-sm text-gray-400 space-y-2 font-mono">
                      <li><span className="text-[#c4a277]">Load Time:</span> 0.8s</li>
                      <li><span className="text-[#c4a277]">Lighthouse:</span> 100/100</li>
                      <li><span className="text-[#c4a277]">Conversion:</span> +40%</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
