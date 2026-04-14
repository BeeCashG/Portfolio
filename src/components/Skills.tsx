"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const skillCategories = [
  {
    title: "STRATEGIC INFRASTRUCTURE",
    id: "SI-01",
    description: "Multi-channel digital ecosystem design. Focused on brand architecture, growth modeling, and CRM automation.",
    skills: ["SEO Mastery", "Growth Hacking", "Market Analytics", "Personalization Engine"],
    stats: ["99.8% ACCURACY", "STRATEGIC ADAPTATION", "EXEC-LEVEL REPORTING"]
  },
  {
    title: "FULL-STACK ENGINEERING",
    id: "FE-02",
    description: "Designing resilient, high-performance web systems with clean, scalable technical logic.",
    skills: ["Next.js / React", "Django / Python", "PHP / WordPress", "Node.js Architecture"],
    stats: ["LOW-LATENCY LOGIC", "RESILIENT SCALING", "PIXEL-PERFECT UX"]
  },
  {
    title: "SYSTEM ARCHITECTURE",
    id: "SA-03",
    description: "Robust enterprise foundations, security auditing, and server-side deployment strategies.",
    skills: ["Linux Management", "Security Auditing", "Graphics Design", "Network Security"],
    stats: ["ZERO-DOWNTIME CONFIG", "ISO-COMPLIANCE", "SYSTEM OPTIMIZATION"]
  }
];

const BlueprintRow = ({ cat, scrollYProgress, index }: { cat: typeof skillCategories[0]; scrollYProgress: any; index: number }) => {
  // Calculate relative activation based on scroll
  const step = 1 / skillCategories.length;
  const start = index * step;
  const end = (index + 1) * step;
  
  const opacity = useTransform(scrollYProgress, [start, start + 0.1, end - 0.1, end], [0.1, 1, 1, 0.1]);
  const scale = useTransform(scrollYProgress, [start, start + 0.1, end - 0.1, end], [0.95, 1, 1, 0.95]);

  return (
    <motion.div 
      style={{ opacity, scale }}
      className="h-[80vh] flex flex-col justify-center relative z-10"
    >
      <div className="flex items-start gap-8">
        <div className="hidden md:flex flex-col items-end pt-2">
            <span className="text-cyan-500 font-mono text-xs font-bold leading-none mb-1">{cat.id}</span>
            <div className="h-px w-8 bg-cyan-500/30" />
        </div>

        <div className="flex-1">
          <div className="mb-6">
            <h3 className="text-5xl md:text-8xl font-black tracking-tighter text-white mb-2 leading-none uppercase italic">
              {cat.title}
            </h3>
            <p className="text-white/40 font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] mb-4">
              [ {cat.description} ]
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {cat.skills.map((skill) => (
              <div key={skill} className="group relative px-6 py-4 border border-white/5 bg-white/[0.01] hover:bg-cyan-500/5 hover:border-cyan-500/30 transition-all duration-300">
                  <div className="absolute top-0 left-0 w-1 h-1 bg-cyan-500/40" />
                  <span className="text-white/60 group-hover:text-cyan-400 font-bold text-sm tracking-tight transition-colors">{skill}</span>
                  <div className="mt-2 h-[1px] w-0 group-hover:w-full bg-cyan-500/50 transition-all duration-500" />
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap gap-8 opacity-30 group-hover:opacity-100 transition-opacity">
             {cat.stats.map(s => (
               <div key={s} className="flex flex-col">
                  <span className="text-[9px] font-mono text-cyan-500 mb-1">{">>>"} PROCESSING</span>
                  <span className="text-[10px] font-mono text-white tracking-widest uppercase">{s}</span>
               </div>
             ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth Laser Animation
  const laserY = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "100%"]), {
    stiffness: 100,
    damping: 30
  });

  return (
    <section 
      ref={containerRef}
      id="skills" 
      className="relative bg-[#09090b] text-white overflow-visible px-6 md:px-12 lg:px-24 border-t border-white/5"
    >
      {/* Blueprint Grid Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]">
          <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
          <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "200px 200px", border: "1px solid rgba(255,255,255,0.1)" }} />
      </div>

      {/* Aesthetic Technical Markers */}
      <div className="absolute top-12 left-12 font-mono text-[9px] text-white/20 select-none uppercase z-0 tracking-[0.5em]">
          Technical Arsenal // ID_7734_BGU
      </div>
      <div className="absolute bottom-12 right-12 font-mono text-[9px] text-white/20 select-none uppercase z-0 tracking-[0.5em] text-right">
          Grid: 40x40 // Reference: Bikash Gupta
      </div>

      <div className="max-w-7xl mx-auto relative min-h-[300vh]">
        {/* Sticky Laser Engine */}
        <div className="sticky top-0 h-screen w-full flex items-center pointer-events-none z-50">
           <motion.div 
             style={{ top: laserY }}
             className="absolute left-[-100px] right-[-100px] h-[2px] bg-cyan-400 shadow-[0_0_25px_rgba(34,211,238,0.8),0_0_10px_rgba(34,211,238,0.5)] flex items-center justify-between px-24 mix-blend-screen"
           >
              <div className="absolute top-1/2 left-0 -translate-y-1/2 flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-cyan-400 blur-[4px] animate-pulse" />
                <span className="font-mono text-[8px] text-cyan-400 tracking-tighter uppercase">Scanning...</span>
              </div>
              
              <div className="absolute top-1/2 right-0 -translate-y-1/2 flex items-center gap-2">
                <span className="font-mono text-[8px] text-cyan-400 tracking-tighter uppercase whitespace-nowrap">Depth: {Math.round(Math.random() * 100)}m.sec</span>
                <div className="w-4 h-4 rounded-full bg-cyan-400 blur-[4px] animate-pulse" />
              </div>
           </motion.div>
        </div>

        {/* Content Layers */}
        <div className="relative pt-[20vh]">
          {skillCategories.map((cat, index) => (
            <BlueprintRow 
              key={cat.id} 
              cat={cat} 
              scrollYProgress={scrollYProgress} 
              index={index} 
            />
          ))}
        </div>
      </div>

      {/* Decorative End Piece */}
      <div className="max-w-7xl mx-auto py-24 border-t border-dashed border-white/10 text-center">
          <p className="text-[10px] font-mono text-white/20 uppercase tracking-[1em]">END OF SYSTEM READOUT</p>
      </div>
    </section>
  );
}
