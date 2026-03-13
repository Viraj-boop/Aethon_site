import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, TrendingUp, Smartphone, Search, X } from 'lucide-react';

export default function ProjectCard({ title, description, image, stats, caseStudy }: any) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-6 w-full mb-24 cursor-pointer group">
        <div className="relative w-full aspect-[4/3] md:aspect-[21/9] perspective-1000" onClick={() => setIsFlipped(!isFlipped)}>
          <motion.div
            className="w-full h-full relative preserve-3d"
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            {/* Front (Screenshot) */}
            <div className="absolute inset-0 w-full h-full backface-hidden rounded-xl overflow-hidden border border-[#c4a277]/20 shadow-2xl">
              <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 grayscale-[20%] sepia-[10%]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1c1b19]/90 via-[#1c1b19]/20 to-transparent" />
              
              {/* Overlay Elements */}
              <div className="absolute top-4 right-4 bg-[#1c1b19]/80 backdrop-blur text-[#c4a277] text-[10px] font-mono px-2 py-1 rounded border border-[#c4a277]/30">
                CLICK TO REVEAL IMPACT
              </div>
            </div>

            {/* Back (Business Impact Dashboard) */}
            <div className="absolute inset-0 w-full h-full backface-hidden rounded-xl border border-[#c4a277]/30 bg-[#1c1b19]/90 backdrop-blur-xl shadow-2xl flex flex-col p-6 md:p-12 rotate-y-180 overflow-y-auto md:overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#c4a277]/5 to-transparent pointer-events-none" />
              
              <div className="mb-6 md:mb-12 relative z-10">
                <h4 className="text-2xl md:text-4xl font-display text-[#e6e2d3] mb-2">Business Impact</h4>
                <p className="text-sm font-sans text-gray-400">Real results delivered for {title}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 h-full relative z-10">
                {/* Stat 1 */}
                <div className="bg-[#242320]/80 border border-[#c4a277]/20 rounded-xl p-6 flex flex-col justify-center relative overflow-hidden group/stat hover:border-[#c4a277]/50 transition-colors">
                  <div className="absolute -right-4 -top-4 w-24 h-24 bg-green-500/10 rounded-full blur-2xl" />
                  <TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-green-400 mb-4" />
                  <div className="text-3xl md:text-6xl font-display text-[#e6e2d3] mb-2">{stats.conversion}</div>
                  <div className="text-[10px] md:text-xs font-sans text-gray-400 uppercase tracking-widest">Conversion Rate Increase</div>
                </div>
                
                {/* Stat 2 */}
                <div className="bg-[#242320]/80 border border-[#c4a277]/20 rounded-xl p-6 flex flex-col justify-center relative overflow-hidden group/stat hover:border-[#c4a277]/50 transition-colors">
                  <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl" />
                  <Smartphone className="w-6 h-6 md:w-8 md:h-8 text-blue-400 mb-4" />
                  <div className="text-3xl md:text-6xl font-display text-[#e6e2d3] mb-2">{stats.lighthouse}</div>
                  <div className="text-[10px] md:text-xs font-sans text-gray-400 uppercase tracking-widest">Mobile Performance (Lighthouse)</div>
                </div>

                {/* Stat 3 */}
                <div className="bg-[#242320]/80 border border-[#c4a277]/20 rounded-xl p-6 flex flex-col justify-center relative overflow-hidden group/stat hover:border-[#c4a277]/50 transition-colors">
                  <div className="absolute -right-4 -top-4 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl" />
                  <Search className="w-6 h-6 md:w-8 md:h-8 text-purple-400 mb-4" />
                  <div className="text-3xl md:text-6xl font-display text-[#e6e2d3] mb-2">{stats.seo}</div>
                  <div className="text-[10px] md:text-xs font-sans text-gray-400 uppercase tracking-widest">SEO Visibility Growth</div>
                </div>
              </div>
              
              <div className="mt-6 md:mt-8 flex justify-center relative z-10">
                <span className="text-[10px] font-mono text-[#c4a277] uppercase tracking-widest bg-[#1c1b19] px-3 py-1 rounded-full border border-[#c4a277]/30">Click to flip back</span>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <h4 className="text-2xl md:text-4xl font-display text-[#e6e2d3] group-hover:text-[#c4a277] transition-colors">{title}</h4>
          <div className="flex flex-col items-end gap-2">
            <p className="text-sm font-mono text-[#c4a277] max-w-md text-right">{description}</p>
            {caseStudy && (
               <button 
                 onClick={(e) => { e.stopPropagation(); setShowModal(true); }}
                 className="text-[10px] font-sans uppercase tracking-widest text-[#e6e2d3] border-b border-[#e6e2d3]/30 pb-1 flex items-center gap-1 group-hover:text-[#c4a277] group-hover:border-[#c4a277]/50 transition-colors"
               >
                 View Case Study <ArrowUpRight className="w-3 h-3" />
               </button>
            )}
          </div>
        </div>
      </div>

      {/* Case Study Modal */}
      <AnimatePresence>
        {showModal && caseStudy && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setShowModal(false)}
               className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
               initial={{ opacity: 0, y: 50, scale: 0.95 }}
               animate={{ opacity: 1, y: 0, scale: 1 }}
               exit={{ opacity: 0, y: 50, scale: 0.95 }}
               transition={{ type: "spring", damping: 25, stiffness: 300 }}
               className="relative bg-[#1c1b19] border border-[#c4a277]/30 rounded-2xl p-8 md:p-12 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl z-10"
            >
              <button 
                onClick={() => setShowModal(false)}
                className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              
              <h3 className="text-[10px] md:text-xs font-sans text-[#c4a277] uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="w-8 h-[1px] bg-[#c4a277]" /> Case Study
              </h3>
              <h2 className="text-3xl md:text-5xl font-display font-bold uppercase tracking-tight text-white mb-12">
                {title}
              </h2>
              
              <div className="flex flex-col gap-10">
                <div className="border-l-2 border-red-500/50 pl-6">
                  <h4 className="text-sm font-sans text-red-400 uppercase tracking-widest mb-3">The Problem</h4>
                  <p className="text-gray-300 font-sans font-light leading-relaxed">{caseStudy.problem}</p>
                </div>
                
                <div className="border-l-2 border-blue-500/50 pl-6">
                  <h4 className="text-sm font-sans text-blue-400 uppercase tracking-widest mb-3">The Solution</h4>
                  <p className="text-gray-300 font-sans font-light leading-relaxed">{caseStudy.solution}</p>
                </div>
                
                <div className="border-l-2 border-green-500/50 pl-6">
                  <h4 className="text-sm font-sans text-green-400 uppercase tracking-widest mb-3">The Results</h4>
                  <p className="text-gray-300 font-sans font-light leading-relaxed">{caseStudy.results}</p>
                  
                  <div className="flex gap-6 mt-6 pt-6 border-t border-white/10">
                     <div className="flex flex-col">
                        <span className="text-sm font-mono text-[#c4a277]">{stats.conversion}</span>
                        <span className="text-[10px] font-sans text-gray-500 uppercase tracking-widest">Conversion</span>
                     </div>
                     <div className="flex flex-col">
                        <span className="text-sm font-mono text-[#c4a277]">{stats.lighthouse}</span>
                        <span className="text-[10px] font-sans text-gray-500 uppercase tracking-widest">Performance</span>
                     </div>
                  </div>
                </div>
              </div>
               
               <div className="mt-12 flex justify-center">
                  <button onClick={() => setShowModal(false)} className="bg-white text-bg px-8 py-3 rounded-full font-sans font-bold uppercase tracking-widest text-xs hover:bg-[#c4a277] transition-colors">
                     Close Case Study
                  </button>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
