"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const skillGroups = [
  {
    category: "MARKETING & STRATEGY",
    skills: [
      { name: "SEO & Organic Growth", level: 98, code: "SEO-ORG" },
      { name: "Digital Strategy", level: 95, code: "STR-MKT" },
      { name: "Content & MarTech", level: 92, code: "MAR-TCH" },
      { name: "CRM Personalization", level: 94, code: "CRM-PSN" }
    ]
  },
  {
    category: "PROGRAMMING & DEV",
    skills: [
      { name: "WordPress & CMS", level: 80, code: "CMS-WP" },
      { name: "HTML", level: 100, code: "HTM-L5" },
      { name: "CSS", level: 90, code: "CSS-33" },
      { name: "C / C++", level: 80, code: "CPP-LD" },
      { name: "PHP", level: 70, code: "PHP-SRV" },
      { name: "JavaScript", level: 60, code: "JSC-ECMA" },
      { name: "React.js", level: 55, code: "RCT-UX" },
      { name: "Flutter", level: 60, code: "FLT-MOB" },
      { name: "Java", level: 55, code: "JAV-KRN" },
      { name: "Python", level: 45, code: "PYT-ML" },
      { name: "Django", level: 25, code: "DJN-ADM" }
    ]
  },
  {
    category: "DESIGN & SYSTEMS",
    skills: [
      { name: "Linux", level: 80, code: "LNX-SYS" },
      { name: "Photoshop & Design", level: 55, code: "PSD-VIS" },
      { name: "MS Office", level: 85, code: "MSO-ADM" }
    ]
  }
];

const DataCell = ({ skill }: { skill: any }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.3, once: false });
  const [activated, setActivated] = useState(false);
  
  useEffect(() => {
    if (isInView) setActivated(true);
  }, [isInView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0.1, y: 10 }}
      animate={activated ? { opacity: 1, y: 0 } : { opacity: 0.1, y: 10 }}
      transition={{ duration: 0.5 }}
      className={`relative p-5 border ${activated ? "border-cyan-500/40 bg-cyan-500/[0.02]" : "border-white/5 bg-transparent"} transition-all duration-300 group overflow-hidden`}
    >
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none group-hover:opacity-10 transition-opacity" 
           style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "15px 15px" }} />
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-3">
          <span className={`text-[8px] font-mono ${activated ? "text-cyan-400" : "text-white/10"}`}>
            [{skill.code}]
          </span>
          <span className={`text-[8px] font-mono ${activated ? "text-cyan-400" : "text-white/10"}`}>
            {activated ? "ACTIVE" : "STANDBY"}
          </span>
        </div>

        <h4 className={`text-sm md:text-base font-black tracking-tight mb-4 ${activated ? "text-white" : "text-white/20"} transition-colors uppercase italic truncate`}>
          {skill.name}
        </h4>

        <div className="space-y-1.5">
            <div className="flex justify-between text-[9px] font-mono">
                <span className={activated ? "text-cyan-500" : "text-white/10"}>LVL</span>
                <span className={activated ? "text-white" : "text-white/10"}>{skill.level}%</span>
            </div>
            <div className="h-[1.5px] w-full bg-white/5 relative overflow-hidden">
                <motion.div 
                   initial={{ width: 0 }}
                   animate={activated ? { width: `${skill.level}%` } : { width: 0 }}
                   transition={{ duration: 1.2, delay: 0.1, ease: "easeOut" }}
                   className="absolute top-0 left-0 h-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.4)]"
                />
            </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section 
      ref={containerRef}
      id="skills" 
      className="relative bg-[#09090b] text-white py-24 px-6 md:px-12 lg:px-24 overflow-hidden border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 mb-3"
          >
            <div className="w-8 h-[1px] bg-cyan-500" />
            <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-cyan-500">Expertise Readout</span>
          </motion.div>
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-white uppercase italic leading-none">
            Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-white/20">Arsenal.</span>
          </h2>
        </div>

        <div className="space-y-20">
          {skillGroups.map((group) => (
            <div key={group.category} className="space-y-6">
              <div className="flex items-baseline gap-4">
                <h3 className="text-sm md:text-base font-bold tracking-[0.3em] text-white/40 uppercase italic whitespace-nowrap">
                  {group.category}
                </h3>
                <div className="flex-1 h-[1px] bg-white/5" />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {group.skills.map((skill) => (
                  <DataCell 
                    key={skill.name} 
                    skill={skill} 
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative Atmosphere */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-cyan-500/[0.01] to-transparent pointer-events-none" />
      <div className="mt-24 pt-10 border-t border-dashed border-white/5 text-center opacity-20">
          <p className="text-[9px] font-mono uppercase tracking-[0.8em]">End of Capability Readout</p>
      </div>
    </section>
  );
}
