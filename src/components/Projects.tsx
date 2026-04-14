"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const projects = [
  {
    id: 1,
    title: "Lonely Nepal Travels",
    category: "Websites",
    description: "A high-performance SEO-optimized travel portal engineered with Next.js and integrated with automated booking flows.",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1000&auto=format&fit=crop",
    link: "https://www.lonelynepaltravels.com",
    details: "As CDO, led the full transformation of the legacy site into a high-converting digital asset with top-tier SEO rankings."
  },
  {
    id: 2,
    title: "Vedalaya Group",
    category: "Digital Strategy",
    description: "Full-scale digital branding and strategy implementation, focusing on conversion-centric UX and multi-channel marketing automation.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
    link: "https://vedalayagroup.com",
    details: "Architected the digital roadmap involving CRM integration, branding systems, and growth-focused web development."
  },
  {
    id: 3,
    title: "Dynamic Tech Solution",
    category: "Leadership",
    description: "Managed the end-to-end product lifecycle for various tech solutions, scaling a high-performance cross-functional team.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1000&auto=format&fit=crop",
    link: "#",
    details: "Strategic leadership involving resource planning, tech stack selection, and delivery management for diverse client needs."
  },
  {
    id: 4,
    title: "Arjun KC Photography",
    category: "Websites",
    description: "A high-end visual storytelling platform featuring immersive galleries and bespoke portfolio management for professional photography.",
    image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?q=80&w=1000&auto=format&fit=crop",
    link: "https://arjunkcphotography.com",
    details: "Built a conversion-centric photography portfolio with advanced lazy-loading and color-accurate asset delivery."
  },
  {
    id: 5,
    title: "Truth or Dare (ToD)",
    category: "Entertainment",
    description: "An interactive and engaging social gaming platform designed to elevate group interactions through dynamic Truth or Dare challenges.",
    image: "/gallery/frame_003_delay-0.041s.webp",
    link: "https://tod.bikashgupta.com",
    details: "Developed a rapid-interaction web application focusing on real-time social engagement and intuitive mobile-first UX."
  },
  {
    id: 6,
    title: "Sanjay Roka",
    category: "Websites",
    description: "A sophisticated professional portal engineered to showcase strategic leadership and high-impact technical expertise.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop",
    link: "https://sanjayroka.com",
    details: "Developed a premium personal brand identity and digital presence focused on professional networking and lead generation."
  }
];

const categories = ["All", "Websites", "Digital Strategy", "UI/UX Design", "Leadership", "Entertainment"];

export default function Projects() {
  const [filter, setFilter] = useState("All");

  const filteredProjects = filter === "All" 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <section id="showcase" className="relative w-full bg-[#09090b] text-white py-32 px-6 md:px-12 lg:px-24 border-t border-cyan-900/40 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-fuchsia-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center md:text-left"
        >
          <div className="flex items-center gap-4 mb-4 justify-center md:justify-start">
            <div className="h-[2px] w-12 bg-cyan-500 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
            <span className="text-cyan-400 font-mono tracking-[0.2em] text-xs font-bold uppercase drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">
              Digital Artifacts
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-100 to-cyan-500 drop-shadow-[0_0_20px_rgba(34,211,238,0.3)]">
            Project Showcase.
          </h2>
          <p className="text-zinc-400 text-lg md:text-xl font-light max-w-2xl leading-relaxed mx-auto md:mx-0">
            A curated selection of technical solutions, strategic implementations, and digital architectures engineered for high-performance results.
          </p>
        </motion.div>

        {/* Filter Controls */}
        <div className="flex flex-wrap gap-4 mb-16 justify-center md:justify-start">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 border ${
                filter === cat 
                  ? "bg-cyan-500/20 border-cyan-400 text-cyan-100 shadow-[0_0_20px_rgba(34,211,238,0.2)]" 
                  : "bg-white/[0.02] border-white/10 text-zinc-500 hover:border-cyan-500/30 hover:text-cyan-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid Layout */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative h-[450px] rounded-[32px] overflow-hidden bg-white/[0.01] border border-cyan-500/20 hover:border-cyan-400/50 hover:shadow-[0_0_50px_rgba(34,211,238,0.15)] transition-all duration-500 cursor-magnetic"
              >
                {/* Project Image Wrapper */}
                <div className="absolute inset-0 z-0">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover opacity-30 grayscale group-hover:opacity-50 group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-[#09090b]/20 via-[#09090b]/60 to-[#09090b] z-10" />
                </div>

                {/* Content Overlay */}
                <div className="relative z-20 h-full p-8 flex flex-col justify-end">
                  <span className="text-cyan-500 font-mono text-[10px] uppercase font-bold tracking-[0.2em] mb-4">
                    {project.category}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-black text-white mb-4 group-hover:text-cyan-100 transition-colors drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">
                    {project.title}
                  </h3>
                  <p className="text-zinc-400 text-sm md:text-base font-light mb-8 leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all duration-500">
                    {project.description}
                  </p>
                  
                  <div className="flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noreferrer"
                      className="text-cyan-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:text-cyan-200"
                    >
                      Explore Project <span className="text-lg">↗</span>
                    </a>
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute -inset-20 bg-cyan-500/10 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
