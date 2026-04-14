"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

const pillars = [
  {
    title: "STRATEGY",
    subtitle: "Digital Ecosystems",
    description: "Designing high-performance growth models, CRM-driven automation, and authoritative brand architectures.",
    skills: ["SEO Mastery", "Growth Analytics", "Brand Strategy", "CRM Automation"],
    accent: "from-cyan-400 to-blue-600",
    glow: "rgba(34, 211, 238, 0.3)"
  },
  {
    title: "ENGINEER",
    subtitle: "System Logic",
    description: "Engineering resilient, full-stack web applications with localized performance and pixel-perfect fluidity.",
    skills: ["React / Next.js", "Python / Django", "PHP / Node.js", "Cloud Systems"],
    accent: "from-fuchsia-400 to-purple-600",
    glow: "rgba(217, 70, 239, 0.3)"
  },
  {
    title: "SYSTEMS",
    subtitle: "Architecture",
    description: "Securing the digital foundation through specialized server management and deep technical auditing.",
    skills: ["Linux Server", "Cyber Security", "Network Admin", "Graphic Design"],
    accent: "from-amber-400 to-orange-500",
    glow: "rgba(251, 191, 36, 0.3)"
  }
];

const ParallaxCard = ({ pillar, index }: { pillar: typeof pillars[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Multilayer Parallax Offsets
  const yBg = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const yText = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const yPills = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [5, 0, -5]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.div 
      ref={ref}
      style={{ opacity, perspective: 1000 }}
      className="h-[80vh] flex items-center justify-center p-6 md:p-12 relative overflow-hidden mb-12"
    >
      <motion.div 
        style={{ rotateX }}
        className="w-full max-w-6xl h-full relative flex flex-col justify-center rounded-[3rem] bg-white/[0.02] border border-white/5 overflow-hidden group p-10 md:p-20 shadow-2xl"
      >
        {/* Background Parallax Layer (Glow/Gradient) */}
        <motion.div 
          style={{ y: yBg }}
          className={`absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-to-br ${pillar.accent} opacity-[0.03] blur-[120px] pointer-events-none z-0`}
        />

        {/* Midground Layer (Pills & Decals) */}
        <motion.div 
          style={{ y: yPills }}
          className="absolute top-1/2 left-0 w-full flex flex-wrap justify-center gap-4 px-12 z-0 opacity-20 pointer-events-none"
        >
          {pillar.skills.map(s => (
            <span key={s} className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white/10">{s}</span>
          ))}
        </motion.div>

        {/* Foreground Content Layer */}
        <motion.div style={{ y: yText }} className="relative z-10 flex flex-col items-center text-center">
          <div className={`mb-6 px-4 py-1 rounded-full bg-gradient-to-r ${pillar.accent} opacity-20`} />
          <span className="text-cyan-400 font-mono text-[10px] md:text-xs uppercase tracking-[0.5em] mb-4">{pillar.subtitle}</span>
          <h3 className={`text-6xl md:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br ${pillar.accent} mb-8 uppercase italic leading-none`}>
            {pillar.title}.
          </h3>
          <p className="text-white/40 text-sm md:text-lg leading-relaxed max-w-2xl mb-12">
            {pillar.description}
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            {pillar.skills.map((s) => (
              <div key={s} className="group/pill relative px-6 py-2 rounded-full border border-white/10 bg-white/[0.02] hover:border-cyan-500/50 transition-all duration-300 overflow-hidden cursor-magnetic">
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover/pill:opacity-100 transition-opacity" />
                <span className="relative z-10 text-xs md:text-sm font-bold uppercase tracking-widest text-white/60 group-hover/pill:text-white transition-colors">{s}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Interactive Border Tracer (Side Decal) */}
        <div className="absolute left-10 top-1/4 bottom-1/4 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent" />
        <div className="absolute right-10 top-1/4 bottom-1/4 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent" />
      </motion.div>
    </motion.div>
  );
};

export default function Skills() {
  return (
    <section id="skills" className="relative w-full bg-[#09090b] text-white py-32 overflow-hidden border-t border-white/5">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-fuchsia-500/5 blur-[150px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-32 text-center"
        >
          <div className="overflow-hidden mb-4">
            <motion.h2 
              initial={{ y: 100 }}
              whileInView={{ y: 0 }}
              className="text-5xl md:text-8xl font-black tracking-tighter"
            >
              TECHNICAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-white/40 italic">ARSENAL.</span>
            </motion.h2>
          </div>
          <div className="h-[2px] w-24 bg-cyan-500 mx-auto opacity-50 shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
        </motion.div>

        <div className="space-y-24">
          {pillars.map((pillar, idx) => (
            <ParallaxCard 
              key={pillar.title} 
              pillar={pillar} 
              index={idx} 
            />
          ))}
        </div>
      </div>

      {/* Aesthetic Section Closer */}
      <div className="max-w-7xl mx-auto text-center py-24 border-t border-dashed border-white/5">
        <p className="text-[10px] font-mono text-white/10 uppercase tracking-[1em]">SYSTEM READOUT COMPLETE</p>
      </div>
    </section>
  );
}
