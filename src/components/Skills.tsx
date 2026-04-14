"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

const slides = [
  {
    id: "01",
    title: "STRATEGY.",
    subtitle: "Digital Growth Infrastructure",
    description: "Designing high-conversion digital ecosystems through data-driven SEO, brand engineering, and strategic content flows.",
    skills: ["SEO Mastery", "Brand Strategy", "Growth Analytics", "Automation"],
    accent: "text-cyan-400",
    bgClass: "bg-cyan-500/5"
  },
  {
    id: "02",
    title: "ENGINEER.",
    subtitle: "System Logic & Web Scaling",
    description: "Building resilient, full-stack applications with localized performance and pixel-perfect technical fluidity.",
    skills: ["Next.js / React", "Django / Python", "PHP / WordPress", "Node.js"],
    accent: "text-fuchsia-400",
    bgClass: "bg-fuchsia-500/5"
  },
  {
    id: "03",
    title: "ECOSYSTEM.",
    subtitle: "Enterprise Technical Security",
    description: "Securing and optimizing digital foundations through specialized server management and technical auditing.",
    skills: ["Linux Server", "Cyber Security", "Network Admin", "Graphic Design"],
    accent: "text-amber-400",
    bgClass: "bg-amber-500/5"
  }
];

const BackgroundAsset = ({ id, progress }: { id: string; progress: any }) => {
  const opacity = useTransform(progress, [0, 0.4, 0.6, 1], [0, 1, 1, 0]);
  const scale = useTransform(progress, [0, 0.5, 1], [0.8, 1, 1.2]);
  const rotate = useTransform(progress, [0, 1], [0, 20]);

  return (
    <motion.div 
      style={{ opacity, scale, rotate }}
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
    >
      {id === "01" && (
        <div className="w-[60vh] h-[60vh] rounded-full border border-cyan-500/20 relative group">
           <div className="absolute inset-0 rounded-full border border-dashed border-cyan-400/40 animate-[spin_60s_linear_infinite]" />
           <div className="absolute inset-10 rounded-full border border-cyan-400/10 animate-[spin_40s_linear_infinite_reverse]" />
           <div className="absolute inset-0 bg-cyan-500/5 blur-[100px] rounded-full" />
        </div>
      )}
      {id === "02" && (
        <div className="w-full h-full flex flex-wrap gap-4 opacity-10 py-24 px-12">
           {Array.from({ length: 40 }).map((_, i) => (
             <div key={i} className="w-[1px] h-full bg-gradient-to-b from-transparent via-fuchsia-500 to-transparent" />
           ))}
        </div>
      )}
      {id === "03" && (
        <div className="w-[80vw] h-[80vh] border border-amber-500/20 relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-[2px] bg-amber-400/40 animate-[scan_4s_ease-in-out_infinite]" />
           <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle, rgba(251,191,36,0.05) 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
        </div>
      )}
    </motion.div>
  );
};

const Slide = ({ slide, index, scrollYProgress }: { slide: typeof slides[0]; index: number; scrollYProgress: any }) => {
  const step = 1 / slides.length;
  const start = index * step;
  const end = (index + 1) * step;

  const y = useTransform(scrollYProgress, [start, start + 0.1, end - 0.1, end], [100, 0, 0, -100]);
  const opacity = useTransform(scrollYProgress, [start, start + 0.05, end - 0.05, end], [0, 1, 1, 0]);

  return (
    <div className="h-[100dvh] w-full flex items-center justify-center relative py-12">
      <motion.div style={{ y, opacity }} className="max-w-6xl w-full px-6 flex flex-col md:flex-row items-center gap-8 md:gap-24">
        <div className="flex-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-4 mb-4 md:mb-6">
            <span className={`text-[10px] md:text-sm font-mono tracking-[0.5em] ${slide.accent}`}>SECTION_{slide.id}</span>
            <div className="h-[1px] w-8 md:w-12 bg-white/20" />
          </div>
          <h3 className="text-4xl md:text-6xl lg:text-9xl font-black tracking-tighter text-white mb-4 md:mb-6 leading-none italic uppercase">
            {slide.title}
          </h3>
          <p className="text-lg md:text-2xl font-bold text-white/80 mb-4 md:mb-6 tracking-tight">
            {slide.subtitle}
          </p>
          <p className="text-white/40 text-xs md:text-lg leading-relaxed max-w-xl mb-8 md:mb-12 font-medium">
            {slide.description}
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-2 md:gap-3">
             {slide.skills.map(s => (
               <span key={s} className="px-3 md:px-5 py-1.5 md:py-2 rounded-full border border-white/10 bg-white/5 text-[8px] md:text-xs font-black uppercase tracking-widest text-white/60 hover:text-white transition-colors cursor-default">
                 {s}
               </span>
             ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section 
      ref={containerRef}
      id="skills" 
      className="relative bg-[#09090b] text-white overflow-visible border-t border-white/5"
    >
      {/* Introduction Heading */}
      <div className="h-[30vh] flex flex-col items-center justify-end pb-12">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="text-xs font-mono uppercase tracking-[1em] text-white/30 mb-4"
          >
            Technical Capability
          </motion.h2>
          <h2 className="text-4xl md:text-7xl font-black tracking-tighter text-white uppercase italic text-center">
            THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/20">ARSENAL.</span>
          </h2>
      </div>

      <div className="relative min-h-[300vh]">
        {/* Sticky Background Asset Engine */}
        <div className="sticky top-0 h-screen w-full overflow-hidden z-0">
          {slides.map((slide, index) => (
            <BackgroundAsset 
              key={slide.id} 
              id={slide.id} 
              progress={scrollYProgress}
            />
          ))}
          {/* Subtle Grain Overlay */}
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('/noise.png')] mix-blend-overlay" />
        </div>

        {/* Cinematic Slides Layer */}
        <div className="relative z-10">
          {slides.map((slide, index) => (
            <Slide 
              key={slide.id} 
              slide={slide} 
              index={index} 
              scrollYProgress={scrollYProgress} 
            />
          ))}
        </div>
      </div>

      {/* Outro */}
      <div className="h-[30vh] flex items-center justify-center">
          <p className="text-[10px] font-mono text-white/10 uppercase tracking-[1em]">END OF SYSTEM READOUT</p>
      </div>

      <style jsx global>{`
        @keyframes scan {
          0% { top: 0; opacity: 0; }
          50% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </section>
  );
}
