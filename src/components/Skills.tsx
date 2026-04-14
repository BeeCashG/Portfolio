"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const skillGroups = [
  {
    title: "DIGITAL STRATEGY",
    type: "IMPACT ARCHITECTURE",
    description: "Orchestrating high-conversion digital ecosystems through data-driven SEO, brand engineering, and strategic content flow.",
    skills: ["SEO Mastery", "Brand Strategy", "Content Engineering", "CRM Personalization", "Growth Hacking"],
    accent: "from-cyan-400 to-blue-600",
    glow: "rgba(34, 211, 238, 0.4)",
    pattern: "radial-gradient(circle at 10% 20%, rgba(34, 211, 238, 0.05) 0%, transparent 50%)"
  },
  {
    title: "FULL-STACK DEV",
    type: "SYSTEM ENGINEERING",
    description: "Building resilient, high-performance web architecture from the hardware level to the fluid UI transitions.",
    skills: ["Next.js / React", "Python / Django", "PHP / WordPress", "TypeScript Engine", "Cloud Deployment"],
    accent: "from-fuchsia-400 to-purple-600",
    glow: "rgba(217, 70, 239, 0.4)",
    pattern: "repeating-linear-gradient(45deg, rgba(217, 70, 239, 0.02) 0px, transparent 1px, transparent 15px)"
  },
  {
    title: "INFRASTRUCTURE",
    type: "ECOSYSTEM SECURITY",
    description: "Securing the foundation of digital assets through robust server management and technical auditing.",
    skills: ["Linux Management", "Security Auditing", "Graphics Design", "Network Architecture", "System Analytics"],
    accent: "from-amber-400 to-orange-500",
    glow: "rgba(251, 191, 36, 0.4)",
    pattern: "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h20L0 20z' fill='%23fbbf24' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E\")"
  }
];

const SkillCard = ({ group, index, total }: { group: typeof skillGroups[0]; index: number; total: number }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Unique stacking behavior
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -50 * (total - index)]);
  const opacity = useTransform(scrollYProgress, [0.8, 1], [1, 0.6]);

  return (
    <div ref={containerRef} className="h-screen flex items-start pt-24 md:pt-32 sticky top-0">
      <motion.div 
        style={{ scale, opacity, y }}
        className="w-full relative rounded-[3rem] p-8 md:p-16 lg:p-20 overflow-hidden bg-[#0a0a0c] border border-white/5 shadow-[0_40px_100px_rgba(0,0,0,0.5)] cursor-magnetic group"
      >
        {/* Holographic Background Pattern */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40" style={{ backgroundImage: group.pattern }} />
        
        {/* Glow Aura */}
        <div 
          className="absolute -top-24 -right-24 w-96 h-96 blur-[150px] transition-all duration-700 opacity-20 group-hover:opacity-40"
          style={{ background: group.glow }}
        />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 h-full items-center">
          <div className="flex flex-col">
            <div className="flex items-center gap-4 mb-8">
              <div className={`h-px w-12 bg-gradient-to-r ${group.accent}`} />
              <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.5em] text-white/40">
                {group.type}
              </span>
            </div>
            
            <h3 className={`text-4xl md:text-7xl font-black italic tracking-tighter mb-8 text-transparent bg-clip-text bg-gradient-to-br ${group.accent} leading-none`}>
              {group.title}.
            </h3>
            
            <p className="text-white/40 text-sm md:text-lg leading-relaxed max-w-xl mb-12">
              {group.description}
            </p>

            <div className="flex flex-wrap gap-3">
               {group.skills.map((s) => (
                 <div key={s} className="px-4 py-2 rounded-full bg-white/[0.03] border border-white/5 text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/50 hover:text-white transition-colors">
                    {s}
                 </div>
               ))}
            </div>
          </div>

          <div className="hidden lg:flex justify-center relative">
            {/* Visual Representation of Mastery (Abstract Circle) */}
            <div className="w-[300px] h-[300px] rounded-full border border-white/5 flex items-center justify-center p-8 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent blur-2xl rounded-full" />
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-4 border border-dashed border-white/10 rounded-full" 
                />
                <div className={`text-6xl font-black italic text-transparent bg-clip-text bg-gradient-to-br ${group.accent}`}>
                  #{index + 1}
                </div>
            </div>
          </div>
        </div>

        {/* Decorative corner element */}
        <div className="absolute bottom-8 right-8 flex flex-col items-end opacity-20">
            <span className="text-[8px] font-mono uppercase tracking-[0.6em] mb-2">Technical Authority</span>
            <div className={`h-8 w-px bg-gradient-to-t ${group.accent}`} />
        </div>
      </motion.div>
    </div>
  );
};

export default function Skills() {
  return (
    <section id="skills" className="relative bg-[#09090b] text-white overflow-visible px-6 md:px-12 lg:px-24">
      {/* Introduction */}
      <div className="max-w-7xl mx-auto pt-32 mb-12">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="relative inline-block"
        >
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-white mb-4">
            ARSENAL<span className="text-cyan-500">.</span>
          </h2>
          <div className="h-[2px] w-full bg-gradient-to-r from-cyan-500/50 via-white to-transparent" />
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto relative pb-32">
        {skillGroups.map((group, index) => (
          <SkillCard 
            key={group.title} 
            group={group} 
            index={index} 
            total={skillGroups.length}
          />
        ))}
      </div>

      {/* Aesthetic Section End Transition */}
      <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
}
