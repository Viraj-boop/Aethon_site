import React, { useState, useRef, useEffect } from 'react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export default function BeforeAfterSlider({ 
  beforeImage, 
  afterImage, 
  beforeLabel = "Before Aethon", 
  afterLabel = "After Aethon" 
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('mouseup', () => setIsDragging(false));
      window.addEventListener('touchend', () => setIsDragging(false));
    }
    return () => {
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseup', () => setIsDragging(false));
      window.removeEventListener('touchend', () => setIsDragging(false));
    };
  }, [isDragging]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-video rounded-xl overflow-hidden cursor-ew-resize select-none border border-white/10"
      onMouseMove={handleMouseMove}
      onMouseDown={(e) => {
        setIsDragging(true);
        handleMove(e.clientX);
      }}
      onTouchStart={(e) => {
        setIsDragging(true);
        handleMove(e.touches[0].clientX);
      }}
    >
      {/* Background/Before Image (Always full width) */}
      <img 
        src={beforeImage} 
        alt="Before" 
        className="absolute inset-0 w-full h-full object-cover grayscale opacity-50 contrast-125 pointer-events-none" 
      />
      
      <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm text-white/50 text-[10px] font-mono px-2 py-1 rounded border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity hidden md:block">
        {beforeLabel}
      </div>

      {/* Foreground/After Image (Clipped by slider position) */}
      <div 
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
      >
        <img 
          src={afterImage} 
          alt="After" 
          className="absolute inset-0 w-full h-full object-cover" 
        />
        <div className="absolute top-4 left-4 bg-[#c4a277]/90 text-bg text-[10px] font-mono px-2 py-1 rounded shadow-lg hidden md:block">
          {afterLabel}
        </div>
      </div>

      {/* Slider Handle */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-[#c4a277] cursor-ew-resize shadow-[0_0_15px_rgba(196,162,119,0.5)] z-10 hidden md:block"
        style={{ left: `calc(${sliderPosition}% - 2px)` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-bg border-2 border-[#c4a277] rounded-full flex items-center justify-center shadow-xl">
          <div className="flex gap-1">
            <div className="w-0 h-0 border-y-[4px] border-y-transparent border-r-[6px] border-r-[#c4a277]"></div>
            <div className="w-0 h-0 border-y-[4px] border-y-transparent border-l-[6px] border-l-[#c4a277]"></div>
          </div>
        </div>
      </div>
      
      {/* Mobile Interaction Hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-sm text-[#c4a277] text-[10px] font-mono px-4 py-2 rounded-full border border-[#c4a277]/30 shadow-2xl md:hidden flex items-center gap-2 pointer-events-none">
         <span>{'<'}</span> SLIDE TO COMPARE <span>{'>'}</span>
      </div>
    </div>
  );
}
