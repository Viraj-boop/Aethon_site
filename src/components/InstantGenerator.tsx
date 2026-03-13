import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Sparkles, Upload, Loader2, CheckCircle2 } from 'lucide-react';

export default function InstantGenerator() {
  const [step, setStep] = useState(1);
  const [businessName, setBusinessName] = useState('');
  const [industry, setIndustry] = useState('');
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  
  // Faux loading states
  const [loadingText, setLoadingText] = useState('Analyzing industry standards...');
  const loadingTexts = [
    'Analyzing industry standards...',
    'Generating optimal layout...',
    'Applying premium color palettes...',
    'Optimizing for conversion...',
    'Finalizing blueprint...'
  ];

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setLogoPreview(url);
    }
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName || !industry) return;
    setStep(2);
  };

  useEffect(() => {
    if (step === 2) {
      let currentIndex = 0;
      const interval = setInterval(() => {
        currentIndex++;
        if (currentIndex < loadingTexts.length) {
          setLoadingText(loadingTexts[currentIndex]);
        }
      }, 800);

      const timeout = setTimeout(() => {
        clearInterval(interval);
        setStep(3);
      }, 4000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [step]);

  const handleClaim = () => {
    const message = encodeURIComponent(`Hey Aethon! I used the Instant Generator.\n\nBusiness: ${businessName}\nIndustry: ${industry}\n\nI want to launch this live!`);
    window.open(`https://wa.me/919730575099?text=${message}`, '_blank');
  };

  return (
    <section className="bg-[#1c1b19] py-24 md:py-32 relative overflow-hidden border-t border-white/5">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#c4a277]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 md:px-12 relative z-10">
        <div className="text-center mb-16 relative">
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-32 h-32 bg-[#c4a277]/20 rounded-full blur-3xl pointer-events-none" />
          <h3 className="text-[10px] md:text-xs font-sans text-[#c4a277] uppercase tracking-widest mb-4 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4" /> Try It Now
          </h3>
          <h2 className="text-3xl md:text-6xl font-display font-bold uppercase tracking-tight text-white mb-6">
            Website in <span className="text-[#c4a277]">30 Seconds</span>
          </h2>
          <p className="text-sm md:text-base font-sans text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Enter your business details below and watch our AI-assisted engine generate a live, premium preview of your new digital storefront instantly.
          </p>
        </div>

        <div className="bg-[#242320]/80 backdrop-blur-xl border border-[#c4a277]/20 rounded-3xl p-6 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] min-h-[500px] flex items-center justify-center overflow-hidden relative">
          <AnimatePresence mode="wait">
            
            {/* STEP 1: INPUT */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-xl mx-auto"
              >
                <form onSubmit={handleGenerate} className="flex flex-col gap-6">
                  <div>
                    <label className="block text-xs font-sans text-gray-400 uppercase tracking-widest mb-2">Business Name</label>
                    <input 
                      type="text" 
                      required
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      placeholder="e.g. Acme Corporation" 
                      className="w-full bg-[#1c1b19] border border-white/10 py-4 px-6 rounded-xl text-white font-sans focus:outline-none focus:border-[#c4a277] transition-colors"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-sans text-gray-400 uppercase tracking-widest mb-2">Industry</label>
                    <select 
                      required
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                      className="w-full bg-[#1c1b19] border border-white/10 py-4 px-6 rounded-xl text-white font-sans focus:outline-none focus:border-[#c4a277] transition-colors appearance-none"
                    >
                      <option value="" disabled>Select your industry</option>
                      <option value="Technology">Technology & SaaS</option>
                      <option value="E-Commerce">E-Commerce & Retail</option>
                      <option value="Real Estate">Real Estate</option>
                      <option value="Healthcare">Healthcare & Wellness</option>
                      <option value="Consulting">Consulting & Agency</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-sans text-gray-400 uppercase tracking-widest mb-2">Upload Logo (Optional)</label>
                    <div className="relative group cursor-pointer">
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      />
                      <div className={`w-full border-2 border-dashed ${logoPreview ? 'border-[#c4a277]' : 'border-white/10 group-hover:border-[#c4a277]/50'} py-8 px-6 rounded-xl flex flex-col items-center justify-center gap-3 transition-colors bg-[#1c1b19]`}>
                        {logoPreview ? (
                          <>
                            <img src={logoPreview} alt="Logo Preview" className="h-12 object-contain" />
                            <span className="text-xs text-[#c4a277] font-mono">Logo Uploaded Successfully</span>
                          </>
                        ) : (
                          <>
                            <Upload className="w-6 h-6 text-gray-500 group-hover:text-[#c4a277] transition-colors" />
                            <span className="text-sm text-gray-400 font-sans">Drag & drop or click to browse</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full group flex items-center justify-center gap-3 bg-[#c4a277] text-[#1c1b19] py-4 px-6 rounded-xl font-sans font-bold uppercase tracking-widest text-sm hover:bg-white transition-all shadow-[0_0_30px_rgba(196,162,119,0.2)] mt-4"
                  >
                    Generate Preview <Sparkles className="w-4 h-4" />
                  </button>
                </form>
              </motion.div>
            )}

            {/* STEP 2: LOADING */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, y: -20 }}
                className="w-full flex flex-col items-center justify-center text-center space-y-8"
              >
                <div className="relative">
                  <div className="absolute inset-0 w-24 h-24 bg-[#c4a277]/20 rounded-full animate-ping blur-xl" />
                  <Loader2 className="w-16 h-16 text-[#c4a277] animate-spin relative z-10 mx-auto" />
                </div>
                <div>
                  <h3 className="text-2xl font-display text-white mb-2">Constructing Blueprint...</h3>
                  <p className="text-sm font-mono text-[#c4a277] animate-pulse">{loadingText}</p>
                </div>
                
                {/* Visual Progress Bar */}
                <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-[#c4a277]"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 3.8, ease: "linear" }}
                  />
                </div>
              </motion.div>
            )}

            {/* STEP 3: PREVIEW & OFFER */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
              >
                {/* Mock Browser Frame */}
                <div className="w-full bg-[#1c1b19] rounded-xl border border-white/10 overflow-hidden shadow-2xl relative">
                  {/* Browser Bar */}
                  <div className="h-8 bg-[#333] flex items-center px-4 gap-2 border-b border-white/5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                    <div className="ml-4 text-[10px] font-mono text-gray-500">{businessName.toLowerCase().replace(/\s+/g, '')}.com</div>
                  </div>
                  
                  {/* The Generated Site Preview */}
                  <div className="relative aspect-[4/3] w-full bg-gradient-to-br from-[#111] to-[#222] p-8 flex flex-col justify-between overflow-hidden">
                    {/* Generative Background pattern */}
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
                    
                    {/* Nav Mock */}
                    <div className="flex justify-between items-center relative z-10">
                      {logoPreview ? (
                        <img src={logoPreview} alt="Logo" className="h-6 object-contain" />
                      ) : (
                        <div className="text-sm font-display font-bold text-white uppercase tracking-widest">{businessName}</div>
                      )}
                      <div className="flex gap-4">
                        <div className="w-8 h-1 bg-white/20 rounded-full" />
                        <div className="w-8 h-1 bg-white/20 rounded-full" />
                      </div>
                    </div>
                    
                    {/* Hero Mock */}
                    <div className="relative z-10 mt-12 mb-auto">
                      <div className="inline-block text-[8px] font-mono text-[#c4a277] uppercase tracking-widest border border-[#c4a277]/30 px-2 py-1 rounded-full mb-4">
                        Premium {industry} Solution
                      </div>
                      <h1 className="text-2xl md:text-3xl font-display font-bold text-white mb-4 leading-tight capitalize">
                        Elevating <span className="text-[#c4a277]">{businessName}</span> to the next level.
                      </h1>
                      <div className="w-32 h-8 bg-white/10 rounded-full" />
                    </div>
                    
                    {/* Mock Image/Graphic element */}
                    <div className="absolute right-[-20%] bottom-[-10%] w-[60%] h-[70%] bg-gradient-to-tr from-[#c4a277]/20 to-transparent rounded-tl-[4rem] border-t border-l border-[#c4a277]/20 backdrop-blur-sm" />
                  </div>
                </div>

                {/* The Offer */}
                <div className="flex flex-col flex-1 pl-0 lg:pl-8 text-center lg:text-left">
                  <div className="inline-flex items-center justify-center lg:justify-start gap-2 text-green-400 text-xs font-mono uppercase tracking-widest mb-6">
                    <CheckCircle2 className="w-4 h-4" /> Generation Complete
                  </div>
                  
                  <h3 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
                    A premium blueprint <br className="hidden lg:block"/>built just for you.
                  </h3>
                  
                  <p className="text-gray-400 font-sans leading-relaxed mb-8">
                    Your custom layout for <strong>{businessName}</strong> is ready for development. This is just a glimpse of the high-performance digital presence we can build for you.
                  </p>
                  
                  <div className="bg-[#1c1b19] border border-[#c4a277]/20 rounded-xl p-6 mb-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#c4a277]/10 blur-2xl" />
                    <div className="text-sm text-gray-400 font-sans mb-1">Launch it live starting at</div>
                    <div className="text-3xl font-display font-bold text-[#e6e2d3] mb-4">₹29,999 <span className="text-sm font-sans font-normal text-gray-500 line-through ml-2">₹45,000</span></div>
                    <ul className="text-xs font-mono text-gray-400 space-y-2 text-left">
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#c4a277]" /> Full Design & Development</li>
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#c4a277]" /> Lightning Fast Performance</li>
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#c4a277]" /> Advanced SEO Optimization</li>
                    </ul>
                  </div>

                  <button 
                    onClick={handleClaim}
                    className="group flex justify-center items-center gap-3 bg-[#c4a277] text-[#1c1b19] py-4 px-8 rounded-xl font-sans font-bold uppercase tracking-widest text-sm hover:bg-white transition-all shadow-[0_0_30px_rgba(196,162,119,0.3)] w-full lg:w-auto"
                  >
                    Claim This Design & Start
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                  
                  <button onClick={() => setStep(1)} className="mt-6 text-xs text-gray-500 hover:text-white transition-colors underline underline-offset-4">
                    Or generate another preview
                  </button>
                </div>

              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
