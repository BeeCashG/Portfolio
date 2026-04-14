"use client";

import { motion } from "framer-motion";

const categories = [
  {
    id: "strategy",
    title: "Digital Strategy & Growth",
    subtitle: "Marketing Infrastructure",
    description: "Expertise in driving organic traffic and brand visibility through data-driven SEO and cross-channel strategy.",
    skills: ["SEO Optimization", "Content Strategy", "Brand Architecture", "CRM Personalization", "Marketing Automation"],
    accent: "from-cyan-500 to-blue-500",
    className: "lg:col-span-8 md:col-span-6"
  },
  {
    id: "dev",
    title: "Full-Stack Engineering",
    subtitle: "Modern Web Apps",
    description: "Building resilient, high-performance applications with the latest front-end and back-end ecosystems.",
    skills: ["Next.js / React", "TypeScript", "Python / Django", "PHP / WordPress", "Flutter"],
    accent: "from-fuchsia-500 to-purple-600",
    className: "lg:col-span-4 md:col-span-3"
  },
  {
    id: "systems",
    title: "Cloud & Systems",
    subtitle: "Architecture",
    description: "Deployment, security, and enterprise infrastructure management.",
    skills: ["Linux Admin", "PostgreSQL", "Cloud Hosting", "System Security"],
    accent: "from-amber-400 to-orange-500",
    className: "lg:col-span-4 md:col-span-3"
  },
  {
    id: "design",
    title: "Human-Centric Design",
    subtitle: "Visual Identity",
    description: "Creating stunning visual languages that convert and resonate.",
    skills: ["UI/UX Strategy", "Adobe Suite", "Graphic Design", "Motion Graphics"],
    accent: "from-indigo-500 to-cyan-400",
    className: "lg:col-span-8 md:col-span-6"
  }
];

export default function Skills() {
  return (
    <section id="skills" className="relative w-full bg-[#09090b] text-white py-24 px-6 md:px-12 lg:px-16 border-t border-white/5 overflow-hidden">
      {/* Background Atmosphere */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-fuchsia-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-[1px] w-12 bg-cyan-500/50" />
            <span className="text-cyan-400 font-mono text-[10px] uppercase tracking-[0.4em]">Expertise Spectrum</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-tight">
            Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-fuchsia-500">Arsenal.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6 p-1">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`${cat.className} group relative rounded-[3rem] bg-white/[0.02] border border-white/5 p-8 md:p-10 lg:p-12 overflow-hidden transition-all duration-700 hover:border-white/20 hover:bg-white/[0.04] cursor-magnetic`}
            >
              {/* Animated Accent Glow on Hover */}
              <div className={`absolute -inset-20 bg-gradient-to-br ${cat.accent} opacity-0 group-hover:opacity-5 blur-[100px] transition-opacity duration-700 pointer-events-none`} />
              
              <div className="relative z-10 h-full flex flex-col">
                <div className="mb-8">
                   <div className={`inline-block px-3 py-1 rounded-full bg-gradient-to-r ${cat.accent} opacity-20 mb-6`} />
                   <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-cyan-400 mb-2">{cat.subtitle}</h3>
                   <h4 className="text-2xl md:text-3xl font-black tracking-tight text-white mb-4 italic italic-bold leading-none">{cat.title}</h4>
                   <p className="text-white/40 text-sm md:text-base leading-relaxed max-w-lg">{cat.description}</p>
                </div>

                <div className="mt-auto flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <span 
                      key={skill} 
                      className="px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/5 text-[11px] md:text-xs font-medium text-white/70 hover:text-cyan-400 hover:border-cyan-500/30 transition-all duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Decorative Corner Element */}
              <div className="absolute top-8 right-8 w-4 h-4 border-t-2 border-r-2 border-white/10 group-hover:border-cyan-500/40 transition-colors duration-500" />
              <div className="absolute bottom-8 left-8 w-4 h-4 border-b-2 border-l-2 border-white/10 group-hover:border-fuchsia-500/40 transition-colors duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
