/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState, useEffect, useRef, ReactNode, useCallback } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from 'motion/react';
import { ArrowRight, ArrowDown, Sparkles } from 'lucide-react';
import SmoothScroll from './components/SmoothScroll';
import PageTransition from './components/PageTransition';
import CustomCursor from './components/CustomCursor';
import Globe from './components/Globe';
import Dashboard from './components/Dashboard';
import BlueprintSlider from './components/BlueprintSlider';
import ProjectCard from './components/ProjectCard';
import Terminal from './components/Terminal';
import Magnetic from './components/Magnetic';
import HUD from './components/HUD';
import TechOrbit from './components/TechOrbit';
import VoiceNav from './components/VoiceNav';
import HackerMode from './components/HackerMode';
import { useCursorStore } from './store';

// --- Utility Components ---

const FadeIn = ({ children, delay = 0, className = "" }: { children: ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-10%" }}
    transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

const StaggerContainer = ({ children, className = "" }: { children: ReactNode, className?: string }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-10%" }}
    variants={{
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 }
      }
    }}
    className={className}
  >
    {children}
  </motion.div>
);

const StaggerItem = ({ children, className = "" }: { children: ReactNode, className?: string }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
    }}
    className={className}
  >
    {children}
  </motion.div>
);

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 400);
          return 100;
        }
        return p + 2;
      });
    }, 30);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[100] bg-bg flex flex-col items-center justify-center"
    >
      <div className="overflow-hidden mb-8">
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-6xl font-display font-bold uppercase tracking-widest text-text"
        >
          Aethon
        </motion.div>
      </div>
      <div className="w-48 md:w-64 h-[2px] bg-white/10 relative overflow-hidden rounded-full">
        <motion.div
          className="absolute top-0 left-0 h-full bg-white"
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>
      <div className="mt-4 text-xs font-sans font-mono text-gray-500 uppercase tracking-widest">
        {progress}%
      </div>
    </motion.div>
  );
};

// Removed CustomCursor and MagneticButton from here as they are now in separate files

const TextReveal = ({ text }: { text: string }) => {
  const words = text.split(" ");
  return (
    <span className="flex flex-wrap gap-x-2 md:gap-x-3 gap-y-1 md:gap-y-2">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, delay: i * 0.02, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
};

// --- Page Sections ---

const Hero = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const [businessName, setBusinessName] = useState("");
  const [theme, setTheme] = useState({
    bg: "bg-bg",
    text: "text-gray-300",
    accent: "bg-white",
    headline: "Elevating digital experiences through precision engineering and refined design.",
    subheadline: "OPERATING GLOBALLY",
    image: ""
  });

  useEffect(() => {
    const name = businessName.toLowerCase();
    if (name.includes("cake") || name.includes("bakery") || name.includes("sweet")) {
      setTheme({
        bg: "bg-[#2a1a21]",
        text: "text-pink-200",
        accent: "bg-pink-400",
        headline: `Crafting sweet digital experiences for ${businessName || 'your bakery'}.`,
        subheadline: "ARTISANAL BAKING",
        image: "https://images.unsplash.com/photo-1557925923-33b251dc32d6?q=80&w=1000&auto=format&fit=crop"
      });
    } else if (name.includes("tech") || name.includes("software") || name.includes("app")) {
      setTheme({
        bg: "bg-[#0a1128]",
        text: "text-blue-200",
        accent: "bg-blue-400",
        headline: `Building scalable software solutions for ${businessName || 'your tech company'}.`,
        subheadline: "INNOVATION DRIVEN",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop"
      });
    } else if (name.includes("real estate") || name.includes("property")) {
      setTheme({
        bg: "bg-[#1a2f23]",
        text: "text-green-200",
        accent: "bg-green-400",
        headline: `Showcasing premium properties for ${businessName || 'your real estate firm'}.`,
        subheadline: "LUXURY LIVING",
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1000&auto=format&fit=crop"
      });
    } else if (businessName.length > 0) {
      setTheme({
        bg: "bg-[#1c1b19]",
        text: "text-[#c4a277]",
        accent: "bg-[#c4a277]",
        headline: `A bespoke digital presence for ${businessName}.`,
        subheadline: "PREMIUM BRANDING",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop"
      });
    } else {
      setTheme({
        bg: "bg-bg",
        text: "text-gray-300",
        accent: "bg-white",
        headline: "Elevating digital experiences through precision engineering and refined design.",
        subheadline: "OPERATING GLOBALLY",
        image: ""
      });
    }
  }, [businessName]);

  return (
    <section ref={targetRef} className={`relative h-[150vh] transition-colors duration-1000 ${theme.bg}`}>
      <motion.div
        style={{ scale, opacity, y }}
        className="sticky top-0 h-screen flex flex-col justify-center items-center text-center px-4 md:px-6 overflow-hidden"
      >
        {/* Background Image Overlay */}
        <AnimatePresence>
          {theme.image && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.15 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 z-0"
            >
              <img src={theme.image} alt="Theme Background" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Background Globe */}
        <div className={`absolute inset-0 transition-opacity duration-1000 ${theme.image ? 'opacity-30' : 'opacity-100'}`}>
          <Globe />
        </div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          className="mt-6 md:mt-10 flex flex-col items-center gap-8 z-10 relative w-full max-w-2xl"
        >
          <p className={`text-lg md:text-3xl font-display font-normal ${theme.text} max-w-2xl px-4 leading-relaxed transition-colors duration-1000 drop-shadow-2xl`} style={{ textShadow: '0 4px 30px rgba(0,0,0,0.8)' }}>
            {theme.headline}
          </p>
          <div className="flex items-center gap-3 text-[10px] md:text-xs font-sans font-bold uppercase tracking-widest mt-2 bg-black/50 backdrop-blur-md px-6 py-3 rounded-full border border-white/10">
            <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-1000 ${theme.accent}`} />
            <span className="transition-colors duration-1000 text-white/80">{theme.subheadline}</span>
          </div>
        </motion.div>

        {/* Minimalistic Personalization Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-8 right-8 md:bottom-12 md:right-12 z-20"
        >
          <div className="relative group flex items-center gap-3 bg-black/20 backdrop-blur-md border border-white/10 rounded-full pl-4 pr-2 py-2 hover:bg-black/40 hover:border-white/30 transition-all focus-within:bg-black/60 focus-within:border-white/50 focus-within:shadow-[0_0_30px_rgba(255,255,255,0.1)]">
            <Sparkles className={`w-4 h-4 transition-colors duration-1000 ${theme.text}`} />
            <input 
              type="text" 
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="Personalize demo..." 
              className="bg-transparent text-white placeholder:text-white/40 text-xs font-mono focus:outline-none w-32 focus:w-48 transition-all"
            />
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6 z-10 pb-[30px] ml-[11px] -mb-[8px]"
        >
          <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-gray-500">SCROLL TO EXPLORE</span>
          <motion.div
            className="w-7 h-11 border border-white/20 rounded-full flex justify-center pb-[12px] pt-[4px] pl-[8px] pr-[6px] -mb-[6px] mt-[1px]"
          >
            <motion.div 
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className={`w-1 h-1.5 rounded-full transition-colors duration-1000 ${theme.accent}`} 
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

const About = () => {
  const team = [
    { name: "Viraj", role: "Founder & Creative Director", img: "src/assets/images/founder.jpeg" },
  ];

  const values = [
    { title: "Radical Clarity", desc: "We strip away the superfluous to reveal the essential core of every brand." },
    { title: "Precision Engineering", desc: "Performance is a design feature. We build robust, scalable architectures." },
    { title: "Relentless Innovation", desc: "Pushing the boundaries of what's possible on the modern web." }
  ];

  return (
    <section id="about" className="relative z-10 bg-white text-bg py-24 md:py-48 px-4 md:px-12 rounded-t-[2rem] md:rounded-t-[4rem] -mt-12 shadow-2xl">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-5xl lg:text-6xl font-display leading-[1.3] tracking-tight max-w-6xl">
          <TextReveal text="We are a digital agency focused on creating bespoke, high-performance web experiences. We strip away the unnecessary to deliver clarity, impact, and measurable results." />
        </h2>
        
        {/* History & Story */}
        <div className="mt-24 md:mt-40 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
          <div>
            <h3 className="text-xs md:text-sm font-sans text-gray-500 uppercase tracking-widest mb-6 flex items-center gap-2">
              <span className="w-8 h-[1px] bg-gray-500" /> Our Story
            </h3>
            <h4 className="text-3xl md:text-5xl font-display font-bold uppercase tracking-tight mb-8">
              Forged in<br/>Excellence
            </h4>
          </div>
          <div className="flex flex-col gap-6 text-base md:text-lg font-sans font-light text-gray-600 leading-relaxed">
            <FadeIn delay={0.1}>
              <p>
                Founded in 2020, Aethon Agency emerged from a shared frustration with the bloated, template-driven state of the web. We believed that digital experiences should be as meticulously crafted as high-end architecture.
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p>
                What started as a small collective of creative developers has grown into a global studio. We partner with forward-thinking brands to build digital products that don't just look beautiful, but perform flawlessly under pressure.
              </p>
            </FadeIn>
          </div>
        </div>

        {/* Values */}
        <div className="mt-24 md:mt-40">
          <h3 className="text-xs md:text-sm font-sans text-gray-500 uppercase tracking-widest mb-12 flex items-center gap-2">
            <span className="w-8 h-[1px] bg-gray-500" /> Core Values
          </h3>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 border-t border-black/10 pt-12">
            {values.map((v, i) => (
              <StaggerItem key={i} className="flex flex-col gap-4">
                <span className="text-sm font-mono text-gray-400">0{i + 1}</span>
                <h4 className="text-xl md:text-2xl font-display font-bold uppercase tracking-tight">{v.title}</h4>
                <p className="text-sm md:text-base font-sans font-light text-gray-600">{v.desc}</p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* Team */}
        <div className="mt-24 md:mt-40">
          <h3 className="text-xs md:text-sm font-sans text-gray-500 uppercase tracking-widest mb-12 flex items-center gap-2">
            <span className="w-8 h-[1px] bg-gray-500" /> Leadership
          </h3>
          <StaggerContainer className="flex justify-center">
            {team.map((member, i) => (
              <StaggerItem key={i} className="group cursor-pointer w-full max-w-sm">
                <div className="overflow-hidden rounded-2xl aspect-[3/4] mb-6 bg-gray-100 relative">
                  <img 
                    src={member.img} 
                    alt={member.name} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  />
                </div>
                <h4 className="text-xl md:text-2xl font-display font-bold uppercase tracking-tight text-center">{member.name}</h4>
                <p className="text-xs md:text-sm font-sans text-gray-500 uppercase tracking-widest mt-2 text-center">{member.role}</p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
};

const Work = () => {
  const projects = [
    { 
      title: "Fortune Star Bakery", 
      description: "E-commerce platform with 40% increase in online orders. Built with Next.js and Shopify.",
      image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1600&auto=format&fit=crop",
      stats: {
        conversion: "+42%",
        lighthouse: "98/100",
        seo: "+150%"
      }
    },
    { 
      title: "Tatwa Interiors", 
      description: "Immersive portfolio site featuring 3D material boards and high-res galleries.",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1600&auto=format&fit=crop",
      stats: {
        conversion: "+28%",
        lighthouse: "95/100",
        seo: "+85%"
      }
    },
    { 
      title: "South & Spices Dubai", 
      description: "Global restaurant chain landing page with localized menus and reservations.",
      image: "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?q=80&w=1600&auto=format&fit=crop",
      stats: {
        conversion: "+65%",
        lighthouse: "100/100",
        seo: "+210%"
      }
    },
  ];

  return (
    <section id="work" className="relative bg-bg text-text z-10 py-24 md:py-48 px-4 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 md:mb-32 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <h2 className="text-xs md:text-sm font-sans text-[#c4a277] uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-8 h-[1px] bg-[#c4a277]" /> Business Impact
            </h2>
            <h3 className="text-4xl md:text-7xl font-display font-bold uppercase tracking-tight">Featured Projects</h3>
          </div>
        </div>
        <div className="flex flex-col gap-12 md:gap-24">
          {projects.map((p, i) => (
            <ProjectCard key={i} {...p} />
          ))}
        </div>
      </div>
    </section>
  );
};

const Marquee = () => (
  <div className="relative flex overflow-x-hidden border-b border-black/10 bg-white text-bg py-6 md:py-10">
    <motion.div
      className="flex whitespace-nowrap"
      animate={{ x: ["0%", "-50%"] }}
      transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
    >
      {[...Array(4)].map((_, i) => (
        <span key={i} className="text-5xl md:text-8xl font-display font-bold uppercase tracking-tight px-8 flex items-center gap-8">
          DIGITAL EXCELLENCE <span className="w-4 h-4 md:w-8 md:h-8 bg-black rounded-full inline-block" /> CREATIVE ENGINEERING <span className="w-4 h-4 md:w-8 md:h-8 bg-black rounded-full inline-block" />
        </span>
      ))}
    </motion.div>
  </div>
);

const Services = () => {
  const services = [
    "Digital Strategy",
    "Web Development",
    "UI/UX Design",
    "Creative Coding",
    "Brand Identity"
  ];

  return (
    <section id="services" className="bg-white text-bg relative z-10 rounded-t-[2rem] md:rounded-t-[4rem] -mt-12 shadow-[0_-20px_50px_rgba(0,0,0,0.3)] overflow-hidden">
      <Marquee />
      <div className="py-24 md:py-40 px-4 md:px-12 max-w-7xl mx-auto flex flex-col md:flex-row gap-12 md:gap-24">
        <div className="md:w-1/3">
          <h2 className="text-xs md:text-sm font-sans text-gray-500 uppercase tracking-widest md:sticky md:top-40 flex items-center gap-2">
            <span className="w-8 h-[1px] bg-gray-500" /> Our Expertise
          </h2>
        </div>
        <div className="md:w-2/3 flex flex-col">
          {services.map((s, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group py-8 md:py-12 border-b border-black/10 hover:border-black transition-colors duration-500 flex justify-between items-center cursor-pointer"
            >
              <h3 className="text-3xl md:text-6xl font-display font-bold uppercase tracking-tight group-hover:translate-x-6 transition-transform duration-500">{s}</h3>
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-full border border-black/20 flex items-center justify-center opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 group-hover:bg-bg group-hover:text-white">
                <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="px-4 md:px-12 pb-24 md:pb-40 max-w-7xl mx-auto">
        <h3 className="text-xs md:text-sm font-sans text-gray-500 uppercase tracking-widest mb-12 flex items-center gap-2">
          <span className="w-8 h-[1px] bg-gray-500" /> Technology Stack
        </h3>
        <TechOrbit />
      </div>
    </section>
  );
};

const Footer = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"]
  });
  
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.5, 1]);

  return (
    <footer ref={ref} className="relative bg-bg text-text pt-24 pb-32 md:pt-40 md:pb-48 px-4 md:px-12 overflow-hidden z-20 rounded-t-[2rem] md:rounded-t-[4rem] -mt-12 shadow-[0_-20px_50px_rgba(0,0,0,0.3)]">
      <div className="max-w-4xl mx-auto mb-32 md:mb-48">
        <div className="mb-16 md:mb-24">
          <h2 className="text-xs md:text-sm font-sans text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
            <span className="w-8 h-[1px] bg-gray-400" /> Get in touch
          </h2>
          <h3 className="text-4xl md:text-7xl font-display font-bold uppercase tracking-tight">Let's build<br/>something great.</h3>
        </div>
        
        <form className="flex flex-col gap-8 md:gap-12 text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-sans text-gray-500 uppercase tracking-widest">01. What's your name?</label>
              <input type="text" placeholder="John Doe *" className="w-full bg-transparent border-b border-white/20 py-2 text-base md:text-lg font-sans text-white placeholder:text-gray-700 focus:outline-none focus:border-white transition-colors rounded-none" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-sans text-gray-500 uppercase tracking-widest">02. What's your email?</label>
              <input type="email" placeholder="john@example.com *" className="w-full bg-transparent border-b border-white/20 py-2 text-base md:text-lg font-sans text-white placeholder:text-gray-700 focus:outline-none focus:border-white transition-colors rounded-none" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-sans text-gray-500 uppercase tracking-widest">03. Tell us about your project</label>
            <textarea placeholder="Hello Aethon, I would like to..." rows={3} className="w-full bg-transparent border-b border-white/20 py-2 text-base md:text-lg font-sans text-white placeholder:text-gray-700 focus:outline-none focus:border-white transition-colors resize-none rounded-none"></textarea>
          </div>
          <div className="flex justify-start mt-4">
            <button type="button" className="group flex items-center gap-4 text-xs md:text-sm font-sans font-bold uppercase tracking-widest text-white hover:text-gray-300 transition-colors">
              Send Inquiry 
              <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-bg transition-all duration-500">
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>
          </div>
        </form>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        <h2 className="text-lg md:text-2xl font-sans font-light mb-8 md:mb-12 text-gray-400">Or email us directly</h2>
        
        <Magnetic>
          <motion.a 
            href="mailto:aethon.co@gmail.com" 
            className="relative group inline-block"
            style={{ scale, opacity }}
          >
            <span className="text-4xl md:text-6xl lg:text-7xl font-display font-bold uppercase tracking-tighter text-stroke-white group-hover:text-white group-hover:text-stroke-transparent transition-all duration-500">
              aethon.co@gmail.com
            </span>
          </motion.a>
        </Magnetic>

        <div className="w-full mt-24 md:mt-40 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] md:text-sm font-sans text-gray-500 uppercase tracking-widest">
          <p>© {new Date().getFullYear()} Aethon Agency</p>
          <div className="flex gap-6">
            <a href="https://www.instagram.com/aethon.wd?utm_source=qr&igsh=NnA3Y2R6c3hjYnVh" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
            <a href="https://twitter.com/aethon_wd" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Twitter</a>
            <a href="https://www.linkedin.com/company/aethon" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [hackerMode, setHackerMode] = useState(false);
  const theme = useCursorStore(state => state.theme);

useEffect(() => {
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  const handleScroll = () => {
    setScrolled(window.scrollY > 50);
  };
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
useEffect(() => {
  if (loading) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
    window.scrollTo(0, 0);
  }

  return () => {
    document.body.style.overflow = "auto";
  };
}, [loading]);
useEffect(() => {
  if (!loading) {
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 50);

    return () => clearTimeout(timer);
  }
}, [loading]);

  useEffect(() => {
    let keyBuffer: string[] = [];
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in an input or textarea
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      
      keyBuffer.push(e.key.toLowerCase());
      if (keyBuffer.length > 3) {
        keyBuffer.shift();
      }
      
      if (keyBuffer.join('') === 'dev') {
        setHackerMode(true);
        keyBuffer = [];
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handlePreloaderComplete = useCallback(() => {
    setLoading(false);
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={theme === 'matrix' ? 'theme-matrix' : theme === 'blueprint' ? 'theme-blueprint' : ''}>
      {hackerMode && <HackerMode onClose={() => setHackerMode(false)} />}
      <SmoothScroll>
        <div className="bg-noise" />
        <CustomCursor />
        <HUD />
        <VoiceNav />
        
        <AnimatePresence mode="wait">
          {loading && <Preloader onComplete={handlePreloaderComplete} />}
        </AnimatePresence>

        {!loading && (
          <PageTransition>
            <motion.main
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.1 }}
              className="relative w-full bg-bg"
            >
              {/* Navbar */}
              <nav className={`fixed top-0 left-0 w-full p-6 md:p-8 flex justify-between items-center z-50 transition-all duration-500 ${scrolled ? 'bg-bg/80 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent'}`}>
                <div className="text-sm md:text-base font-sans font-bold uppercase tracking-widest text-white cursor-pointer">AETHON</div>
              </nav>

              <Hero />
              <Dashboard />
              <About />
              <Work />
              <Services />
              <Terminal />
              <Footer />
            </motion.main>
          </PageTransition>
        )}
      </SmoothScroll>
    </div>
  );
}
