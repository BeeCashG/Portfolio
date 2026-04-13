"use client";

import { motion } from "framer-motion";

const leftSkills = [
  { name: "HTML", level: 100 },
  { name: "CSS", level: 90 },
  { name: "JavaScript", level: 60 },
  { name: "React.js", level: 55 },
  { name: "Flutter", level: 60 },
  { name: "Linux", level: 80 },
  { name: "Ms Office", level: 85 },
];

const rightSkills = [
  { name: "C/C++", level: 80 },
  { name: "PHP", level: 70 },
  { name: "WordPress/CMS", level: 80 },
  { name: "Python", level: 45 },
  { name: "Photoshop", level: 55 },
  { name: "Django", level: 25 },
  { name: "Java", level: 55 },
];

const SkillBar = ({ name, level, delay }: { name: string; level: number; delay: number }) => (
  <div className="mb-8">
    <div className="flex justify-between items-end mb-2">
      <span className="font-semibold text-cyan-100 text-sm tracking-wide uppercase">{name}</span>
      <span className="text-xs font-black text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]">{level}%</span>
    </div>
    <div className="h-2 w-full bg-black/50 border border-cyan-500/10 rounded-full overflow-hidden relative shadow-inner">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${level}%` }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 left-0 h-full bg-gradient-to-r from-fuchsia-600 via-indigo-500 to-cyan-400 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.8)]"
      >
        <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-4 h-4 bg-cyan-200 blur-[6px] rounded-full" />
      </motion.div>
    </div>
  </div>
);

export default function Skills() {
  return (
    <section id="skills" className="relative w-full bg-[#09090b] text-white py-24 px-6 md:px-12 lg:px-24 border-t border-cyan-900/40 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-fuchsia-500 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">
            Technical Arsenal
          </h2>
          <div className="h-[1px] w-24 bg-gradient-to-r from-cyan-500/80 to-transparent mb-6" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col bg-white/[0.01] border border-cyan-500/10 p-8 shadow-[0_0_40px_rgba(34,211,238,0.03)] rounded-3xl backdrop-blur-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-64 h-64 bg-cyan-500/10 blur-[120px] rounded-full -z-10" />
            {leftSkills.map((skill, index) => (
              <SkillBar key={skill.name} name={skill.name} level={skill.level} delay={index * 0.1} />
            ))}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col bg-white/[0.01] border border-fuchsia-500/10 p-8 shadow-[0_0_40px_rgba(217,70,239,0.03)] rounded-3xl backdrop-blur-2xl relative overflow-hidden"
          >
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-fuchsia-500/10 blur-[120px] rounded-full -z-10" />
            {rightSkills.map((skill, index) => (
              <SkillBar key={skill.name} name={skill.name} level={skill.level} delay={index * 0.1} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
