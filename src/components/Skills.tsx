"use client";

import { motion } from "framer-motion";
import SkillSphere from "./SkillSphere";

const categories = [
  {
    title: "Development Suite",
    skills: ["React / Next.js", "Django / Python", "PHP / WordPress", "Flutter (Mobile)"],
    color: "from-cyan-400 to-cyan-600"
  },
  {
    title: "Strategic Impact",
    skills: ["SEO Optimization", "Digital Strategy", "Brand Marketing", "CRM Personalization"],
    color: "from-fuchsia-400 to-fuchsia-600"
  },
  {
    title: "System Admin",
    skills: ["Linux Server Management", "Security Auditing", "Graphics Design", "Network Systems"],
    color: "from-indigo-400 to-indigo-600"
  }
];

export default function Skills() {
  return (
    <section id="skills" className="relative w-full bg-[#09090b] text-white py-24 px-6 md:px-12 lg:px-16 border-t border-cyan-900/40 overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-cyan-500/10 blur-[150px] rounded-full -z-10" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-fuchsia-500/10 blur-[150px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center md:text-left"
        >
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-fuchsia-500 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">
            Technical Arsenal.
          </h2>
          <p className="text-cyan-50/60 font-mono text-sm tracking-[0.2em] uppercase">Interactive 3D Skill Infrastructure</p>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left: 3D Holographic Sphere */}
          <div className="w-full lg:w-3/5 order-2 lg:order-1 relative cursor-magnetic">
             {/* Glow behind the sphere */}
            <div className="absolute inset-0 bg-cyan-500/5 blur-[100px] rounded-full scale-75 animate-pulse" />
            <SkillSphere />
          </div>

          {/* Right: Structured Proficiencies */}
          <div className="w-full lg:w-2/5 order-1 lg:order-2 space-y-6">
            {categories.map((cat, idx) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.2 }}
                className="group p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 transition-all duration-500 hover:shadow-[0_0_50px_rgba(34,211,238,0.05)] cursor-magnetic"
              >
                <h3 className={`text-transparent bg-clip-text bg-gradient-to-r ${cat.color} text-xs font-black uppercase tracking-[0.3em] mb-4`}>
                  {cat.title}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {cat.skills.map((s) => (
                    <div key={s} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                      <span className="text-white/80 text-sm font-medium tracking-tight">{s}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1 }}
              className="p-6 rounded-[2rem] border border-dashed border-cyan-500/20 text-center"
            >
              <p className="text-[10px] text-cyan-400/60 uppercase tracking-widest font-mono">
                Spin the holographic core to explore full stack.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
