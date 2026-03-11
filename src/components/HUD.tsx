import React, { useState, useEffect } from 'react';

export default function HUD() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date().toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour12: true,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      setTime(now);
    };

    updateTime();

    const interval = setInterval(updateTime, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="fixed top-4 right-4 md:top-8 md:right-8 z-[100] pointer-events-none flex flex-col items-end gap-2">
      
      {/* Status */}
      <div className="bg-[#1c1b19]/80 backdrop-blur-md border border-[#c4a277]/30 px-3 py-1.5 rounded-full flex items-center gap-3 shadow-lg">
        <div className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </div>
        <span className="text-[9px] md:text-[10px] font-mono text-[#e6e2d3] uppercase tracking-widest">
          Accepting New Projects
        </span>
      </div>

      {/* Time */}
      <div className="bg-[#1c1b19]/80 backdrop-blur-md border border-[#c4a277]/30 px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg">
        <span className="text-[9px] md:text-[10px] font-mono text-[#c4a277] uppercase tracking-widest">
          PUNE: {time}
        </span>
      </div>

    </div>
  );
}