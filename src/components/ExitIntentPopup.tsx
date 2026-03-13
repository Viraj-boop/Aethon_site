import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight } from 'lucide-react';

export default function ExitIntentPopup() {
  const [showPopup, setShowPopup] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        setShowPopup(true);
        setHasShown(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hasShown]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = encodeURIComponent(`Wait! I don't want to leave without my Free Performance Audit. My email is: ${email}`);
    window.open(`https://wa.me/919730575099?text=${message}`, '_blank');
    setShowPopup(false);
  };

  return (
    <AnimatePresence>
      {showPopup && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowPopup(false)}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative bg-[#1c1b19] border border-[#c4a277]/30 rounded-2xl p-8 md:p-12 max-w-lg w-full shadow-[0_0_50px_rgba(196,162,119,0.15)] overflow-hidden z-10"
          >
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#c4a277]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            
            <button 
              onClick={() => setShowPopup(false)}
              className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors z-20"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="relative z-10 text-center flex flex-col items-center">
              <h3 className="text-[10px] md:text-xs font-sans text-[#c4a277] uppercase tracking-widest mb-4 flex items-center gap-2 justify-center">
                <span className="w-8 h-[1px] bg-[#c4a277]" /> Before you go <span className="w-8 h-[1px] bg-[#c4a277]" />
              </h3>
              
              <h2 className="text-3xl md:text-5xl font-display font-bold uppercase tracking-tight text-white mb-4">
                Wait! Don't leave empty-handed.
              </h2>
              
              <p className="text-sm font-sans font-light text-gray-400 mb-8 leading-relaxed">
                Get a completely free, no-obligation Performance & UX Audit of your current website. We'll show you exactly where you're losing revenue.
              </p>

              <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
                <input 
                  type="email" 
                  placeholder="Enter your email address..." 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#242320] border border-white/10 py-4 px-6 rounded-xl text-base font-sans text-white placeholder:text-gray-600 focus:outline-none focus:border-[#c4a277] transition-colors" 
                />
                <button type="submit" className="w-full group flex items-center justify-center gap-4 bg-[#c4a277] text-[#1c1b19] py-4 px-6 rounded-xl font-sans font-bold uppercase tracking-widest text-sm hover:bg-white transition-colors shadow-[0_0_30px_rgba(196,162,119,0.2)]">
                  Claim Free Audit
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
              
              <button 
                onClick={() => setShowPopup(false)}
                className="mt-6 text-[10px] font-sans text-gray-500 uppercase tracking-widest hover:text-gray-300 transition-colors border-b border-transparent hover:border-gray-500 pb-1"
              >
                No thanks, I don't want more clients
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
