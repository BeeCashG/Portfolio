"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const skillGroups = [
  {
    category: "STRATEGIC SYSTEMS",
    skills: [
      { name: "SEO Mastery", level: 98, code: "OPT-Z1" },
      { name: "Brand Architecture", level: 95, code: "ARC-X2" },
      { name: "Growth Modeling", level: 92, code: "GRW-Y3" },
      { name: "CRM Automation", level: 89, code: "AUT-M4" }
    ]
  },
  {
    category: "ENGINEERING CORE",
    skills: [
      { name: "Full-Stack Dev", level: 96, code: "FSK-88" },
      { name: "Cloud Architecture", level: 91, code: "CLD-09" },
      { name: "System Optimization", level: 94, code: "OPT-MIN" },
      { name: "Interface Logic", level: 97, code: "UIX-FLX" }
    ]
  },
  {
    category: "TECHNICAL OPS",
    skills: [
      { name: "Cyber Security", level: 88, code: "SEC-PRT" },
      { name: "Server Linux", level: 93, code: "LNX-KRN" },
      { name: "Network Logic", level: 85, code: "NET-PRO" },
      { name: "Visual Identity", level: 90, code: "VIS-GEN" }
    ]
  }
];

const DataCell = ({ skill, sweepProgress }: { skill: any; sweepProgress: any }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.5, once: false });
  
  // Localized reveal logic based on scroll
  const [activated, setActivated] = useState(false);
  
  useEffect(() => {
    if (isInView) setActivated(true);
  }, [isInView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0.1, y: 20 }}
      animate={activated ? { opacity: 1, y: 0 } : { opacity: 0.1, y: 20 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`relative p-6 border ${activated ? "border-cyan-500/40 bg-cyan-500/[0.02]" : "border-white/5 bg-transparent"} transition-all duration-500 group overflow-hidden`}
    >
      {/* Hex Grid Background Decal */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none group-hover:opacity-10 transition-opacity" 
           style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "15px 15px" }} />
      
      {/* Activation Glow */}
      {activated && (
        <motion.div 
          initial={{ x: "-100%" }}
          animate={{ x: "200%" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute top-0 left-0 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
        />
      )}

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <span className={`text-[8px] font-mono ${activated ? "text-cyan-400" : "text-white/20"}`}>
            [{skill.code}]
          </span>
          <span className={`text-[8px] font-mono ${activated ? "text-cyan-400" : "text-white/20"}`}>
            {activated ? "STATUS: ACTIVE" : "STATUS: STANDBY"}
          </span>
        </div>

        <h4 className={`text-xl font-black tracking-tight mb-6 ${activated ? "text-white" : "text-white/20"} transition-colors uppercase italic`}>
          {skill.name}
        </h4>

        {/* Progress Bar UI */}
        <div className="space-y-2">
            <div className="flex justify-between text-[10px] font-mono">
                <span className={activated ? "text-cyan-500" : "text-white/10"}>CAPACITY</span>
                <span className={activated ? "text-white" : "text-white/10"}>{skill.level}%</span>
            </div>
            <div className="h-[2px] w-full bg-white/5 relative overflow-hidden">
                <motion.div 
                   initial={{ width: 0 }}
                   animate={activated ? { width: `${skill.level}%` } : { width: 0 }}
                   transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
                   className="absolute top-0 left-0 h-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                />
            </div>
        </div>
      </div>

      {/* Detail corner */}
      <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-white/10" />
    </motion.div>
  );
};

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <section 
      ref={containerRef}
      id="skills" 
      className="relative bg-[#09090b] text-white py-32 px-6 md:px-12 lg:px-24 overflow-hidden border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 mb-4"
          >
            <div className="w-12 h-[1px] bg-cyan-500" />
            <span className="text-xs font-mono uppercase tracking-[0.5em] text-cyan-500">System Capability</span>
          </motion.div>
          <h2 className="text-6xl md:text-9xl font-black tracking-tighter text-white uppercase italic leading-none truncate">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-white/20">Matrix.</span>
          </h2>
        </div>

        <div className="space-y-24">
          {skillGroups.map((group, gIdx) => (
            <div key={group.category} className="space-y-8">
              <div className="flex items-baseline gap-4">
                <h3 className="text-lg md:text-xl font-bold tracking-[0.3em] text-white/40 uppercase italic">
                  {group.category}
                </h3>
                <div className="flex-1 h-[1px] bg-white/5" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {group.skills.map((skill, sIdx) => (
                  <DataCell 
                    key={skill.name} 
                    skill={skill} 
                    sweepProgress={scrollYProgress} 
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative Atmosphere */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-cyan-500/[0.02] to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-t from-black to-transparent z-20 pointer-events-none" />

      {/* Aesthetic Closer */}
      <div className="mt-32 pt-12 border-t border-dashed border-white/5 text-center opacity-30">
          <p className="text-[10px] font-mono uppercase tracking-[1em]">END OF CAPABILITY READOUT</p>
      </div>
    </section>
  );
}
