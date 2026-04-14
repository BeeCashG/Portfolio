"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

interface SkillPillarProps {
  title: string;
  subtitle: string;
  subskills: string[];
  index: number;
}

const SkillPillar = ({ title, subtitle, subskills, index }: SkillPillarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  // Kinetic Transformations
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 1, 0.2]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1.1, 0.85]);
  const blur = useTransform(scrollYProgress, [0, 0.5, 1], ["blur(10px)", "blur(0px)", "blur(10px)"]);
  const xStream = useTransform(scrollYProgress, [0, 1], [0, -500]);
  
  // Smooth spring for the central glow
  const glowOpacity = useSpring(useTransform(scrollYProgress, [0.4, 0.5, 0.6], [0, 1, 0]), {
    stiffness: 50,
    damping: 20
  });

  return (
    <div ref={ref} className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden cursor-magnetic">
      {/* Background Data Stream (Moving horizontally behind title) */}
      <motion.div 
        style={{ x: xStream }}
        className="absolute top-1/2 -translate-y-1/2 left-0 whitespace-nowrap pointer-events-none opacity-[0.03] select-none z-0"
      >
        <span className="text-[25vh] font-black uppercase tracking-tighter">
          {subskills.join(" • ")} • {subskills.join(" • ")}
        </span>
      </motion.div>

      {/* Central Content */}
      <motion.div 
        style={{ opacity, scale, filter: blur }}
        className="relative z-10 flex flex-col items-center text-center px-6"
      >
        <div className="flex flex-col items-center gap-4 mb-8">
           <motion.div 
             style={{ opacity: glowOpacity }}
             className="absolute -inset-x-20 -inset-y-12 bg-cyan-500/10 blur-[100px] rounded-full -z-10"
           />
           <span className="text-cyan-400 font-mono text-xs md:text-sm uppercase tracking-[0.6em] mb-4">
             {subtitle}
           </span>
           <h3 className="text-7xl md:text-9xl lg:text-[12rem] font-black tracking-tighter text-white leading-none italic uppercase">
             {title}.
           </h3>
        </div>

        {/* Detailed Skills List (appears when active) */}
        <motion.div 
          className="flex flex-wrap justify-center gap-x-6 md:gap-x-12 gap-y-4 max-w-4xl"
          style={{
            opacity: useTransform(scrollYProgress, [0.4, 0.5, 0.6], [0, 1, 0]),
            y: useTransform(scrollYProgress, [0.4, 0.5, 0.6], [20, 0, 20])
          }}
        >
          {subskills.map((s, i) => (
            <div key={s} className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
              <span className="text-white font-bold text-lg md:text-2xl tracking-tighter uppercase">{s}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Aesthetic Border Trace (Side lines) */}
      <div className="absolute left-10 md:left-24 top-1/4 bottom-1/4 w-[1px] bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent" />
      <div className="absolute right-10 md:right-24 top-1/4 bottom-1/4 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent" />
    </div>
  );
};

export default function Skills() {
  const pillars = [
    {
      title: "Strategy",
      subtitle: "Digital Growth & Impact",
      subskills: ["SEO Optimization", "Digital Strategy", "Brand Marketing", "CRM Personalization", "Growth Hacking", "Automation"]
    },
    {
      title: "Engineer",
      subtitle: "Full-Stack Web Systems",
      subskills: ["Next.js", "React", "Python", "Django", "PHP", "WordPress", "Node.js", "PostgreSQL", "Flutter"]
    },
    {
      title: "Systems",
      subtitle: "Enterprise Infrastructure",
      subskills: ["Linux Management", "Security Auditing", "Graphics Design", "Network Architecture", "Cloud Hosting"]
    }
  ];

  return (
    <section id="skills" className="relative w-full bg-[#09090b] text-white py-24 border-t border-white/5 font-sans overflow-hidden">
      {/* Intro Heading */}
      <div className="max-w-7xl mx-auto px-6 mb-24">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center md:items-start"
        >
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-white/40 mb-2">
            TECHNICAL ARSENAL.
          </h2>
          <div className="h-[2px] w-24 bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
        </motion.div>
      </div>

      {/* Main Kinetic Content */}
      <div className="relative">
        {pillars.map((pillar, idx) => (
          <SkillPillar 
            key={pillar.title} 
            {...pillar} 
            index={idx}
          />
        ))}
      </div>

      {/* Dynamic Background Noise/Texture */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('/noise.png')] mix-blend-overlay" />
    </section>
  );
}
