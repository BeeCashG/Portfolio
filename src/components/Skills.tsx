"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const skillPillars = [
  {
    category: "STRATEGY",
    headline: "Full-Cycle Digital Growth.",
    description: "Designing resilient high-conversion ecosystems through authoritative brand architecture and data-driven CRM automation.",
    skills: ["SEO Mastery", "Growth Analytics", "Brand Strategy", "Marketing Automation", "Digital Ecosystems"]
  },
  {
    category: "ENGINEER",
    headline: "Systematic Web Infrastructure.",
    description: "Building high-performance, full-stack applications with localized logic and fluid, pixel-perfect user interfaces.",
    skills: ["React / Next.js", "Python / Django", "PHP / Node.js", "Cloud Engineering", "Full-Stack Ops"]
  },
  {
    category: "ECOSYSTEM",
    headline: "Secure Technical Foundation.",
    description: "Securing and optimizing digital assets through deep system auditing and specialized server management.",
    skills: ["Linux Server", "Cyber Security", "Network Admin", "Graphic Design", "Technical Auditing"]
  }
];

const LiquidBlob = ({ color, index, scrollYProgress }: { color: string; index: number; scrollYProgress: any }) => {
  // Diverse movement patterns for each blob
  const x = useTransform(scrollYProgress, [0, 1], [
    (index % 2 === 0 ? -10 : 10) + "%", 
    (index % 2 === 0 ? 110 : -10) + "%"
  ]);
  const y = useTransform(scrollYProgress, [0, 1], [
    (index < 2 ? -10 : 110) + "%", 
    (index < 2 ? 110 : -10) + "%"
  ]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.5, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <motion.div
      style={{
        x,
        y,
        scale,
        rotate,
        backgroundColor: color,
        filter: "blur(80px)",
      }}
      className="absolute w-[40vw] h-[40vw] rounded-full opacity-[0.15] mix-blend-screen"
    />
  );
};

const SkillSection = ({ pillar, index, scrollYProgress }: { pillar: typeof skillPillars[0]; index: number; scrollYProgress: any }) => {
  const step = 1 / skillPillars.length;
  const start = index * step;
  const end = (index + 1) * step;

  const opacity = useTransform(scrollYProgress, [start, start + 0.1, end - 0.1, end], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [start, start + 0.1, end - 0.1, end], [50, 0, 0, -50]);

  return (
    <motion.div 
      style={{ opacity, y }}
      className="h-[80vh] flex flex-col items-center justify-center text-center px-6"
    >
      <span className="text-cyan-400 font-mono text-xs md:text-sm uppercase tracking-[0.6em] mb-6">
        {pillar.category}
      </span>
      <h3 className="text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white mb-8 leading-none">
        {pillar.headline}
      </h3>
      <p className="text-white/40 text-sm md:text-xl max-w-3xl leading-relaxed mb-12 font-medium">
        {pillar.description}
      </p>
      <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 max-w-4xl">
        {pillar.skills.map(s => (
          <span key={s} className="text-white/60 font-bold text-sm md:text-xl uppercase tracking-widest hover:text-cyan-400 transition-colors cursor-default">
            {s}
          </span>
        ))}
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

  const blobColors = ["#22d3ee", "#d946ef", "#6366f1", "#0891b2"];

  return (
    <section 
      ref={containerRef}
      id="skills" 
      className="relative bg-[#09090b] text-white overflow-visible border-t border-white/5"
    >
      {/* Liquid Canvas Layer */}
      <div className="sticky top-0 h-screen w-full overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 bg-[#09090b]" />
        {blobColors.map((color, i) => (
          <LiquidBlob 
            key={i} 
            color={color} 
            index={i} 
            scrollYProgress={scrollYProgress} 
          />
        ))}
        {/* Grain Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('/noise.png')] mix-blend-overlay" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 min-h-[400vh]">
        {/* Intro */}
        <div className="h-[50vh] flex flex-col items-center justify-end pb-24">
           <motion.h2 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             className="text-xs font-mono uppercase tracking-[1em] text-white/20 mb-4"
           >
             The Expertise
           </motion.h2>
           <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-white uppercase italic">
             Technical Arsenal.
           </h2>
        </div>

        {/* Dynamic Pillar Sections */}
        <div className="relative">
          {skillPillars.map((pillar, index) => (
            <SkillSection 
              key={pillar.category} 
              pillar={pillar} 
              index={index} 
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>

        {/* Outro */}
        <div className="h-[50vh] flex items-center justify-center">
            <p className="text-[10px] font-mono text-white/10 uppercase tracking-[1em]">Execution. Impact. Scale.</p>
        </div>
      </div>
    </section>
  );
}
