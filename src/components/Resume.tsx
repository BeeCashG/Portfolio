"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const experience = [
  {
    id: 1,
    title: "Co-founder & CEO",
    company: "Dynamic Tech Solution | New Baneshwor, KTM",
    date: "Mar 2024 - Sep 2024",
    description: "Led business strategy and growth initiatives. Managed daily operations, financial planning, and scaled a high-performing team.",
    type: "Leadership",
    details: [
      "Led business strategy and growth initiatives, driving overall company direction.",
      "Managed daily operations, ensuring efficiency across departments and projects.",
      "Oversaw financial planning, budgeting, and profitability to sustain company growth.",
      "Built and led a high-performing team, fostering innovation and collaboration.",
      "Established client relationships, delivering tailored solutions to ensure satisfaction and business growth."
    ]
  },
  {
    id: 2,
    title: "Chief Digital Officer (CDO)",
    company: "Lonely Nepal Travels | Vedalaya Group",
    date: "Mar 2022 - Present",
    description: "Lead digital strategy, integrating design, UX, and technology to drive brand growth and seamless customer experiences.",
    type: "Digital Strategy",
    details: [
      "Lead digital strategy, integrating design, UX, and technology to drive brand growth and seamless customer experiences.",
      "Oversee SEO, content, and martech to maximize organic reach, conversions, and CRM-powered personalization.",
      "Pioneer tech innovation (AI, automation, cloud infrastructure) to optimize performance and scalability.",
      "Build high-performing teams, setting KPIs to align digital initiatives with revenue and business goals."
    ]
  },
  {
    id: 3,
    title: "Part-Time Professor",
    company: "Multiple Colleges (KCC, BMC, KCCS)",
    date: "Aug 2023 - Present",
    description: "Taught advanced computing & architecture subjects to BE Computer, BCA, BIM & semester students.",
    type: "Academia",
    details: [
      "Taught Computer Graphics, Fundamentals of Computing Technology, Microprocessor, Computer Architecture and Design, Advanced Computer Architecture.",
      "Instructed BE Computer, BCA, BIM I, III, V & VIII-semester students across Kantipur City College, Bhaktapur Multiple Campus, and Kathmandu College of Central State.",
      "Created engaging learning experiences with multimedia and hands-on activities.",
      "Focused on practical skills and encouraged exploration of industry trends for student success.",
      "Fostered an environment that led to improved student comprehension and performance in Computer Graphics, contributing to a strong academic record."
    ]
  },
  {
    id: 4,
    title: "Contract IT Support Staff",
    company: "NMB Bank | New Baneshwor, KTM",
    date: "Sep 2023 - Oct 2023",
    description: "Assisted branch and head office staff with IT issues, engineered seamless information flow, and ensured uninterrupted operations.",
    type: "IT Support",
    details: [
      "Assisted NMB Bank's branch and head office staff with IT issues.",
      "Improved operational efficiency by resolving technical problems and optimizing IT resources.",
      "Facilitated seamless information flow and quick problem resolution through open communication channels.",
      "Demonstrated proficiency in swiftly identifying and resolving IT issues, ensuring uninterrupted banking operations and customer service excellence."
    ]
  },
];

const education = [
  {
    id: 1,
    degree: "M.E. Computer (Running)",
    institution: "Nepal College of IT, Pokhara University",
    date: "2081 BS - Present",
  },
  {
    id: 2,
    degree: "B.E. Computer (3.32 GPA)",
    institution: "Kantipur City College, Purvanchal University",
    date: "2074 BS - 2079 BS",
  },
  {
    id: 3,
    degree: "+2 Science (70.2%)",
    institution: "National School of Sciences, NSS(NIST)",
    date: "2073 BS - 2074 BS",
  },
  {
    id: 4,
    degree: "SLC (79.5%)",
    institution: "Shree Bal Jyoti E. S.S",
    date: "2071 BS",
  },
];

export default function Resume() {
  const [mounted, setMounted] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => setMounted(true), []);

  const selectedExp = experience.find(e => e.id === selectedId);

  // Prevent scroll when modal is open
  useEffect(() => {
    if (selectedId !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [selectedId]);

  return (
    <section id="experience" className="relative w-full bg-[#09090b] text-white py-32 px-6 md:px-12 lg:px-24 selection:bg-cyan-500/30 selection:text-white border-t border-cyan-900/40 overflow-hidden">
      {/* Decorative top border fade */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Contact Info Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="mb-32 flex flex-col xl:flex-row gap-16 items-start justify-between relative z-10"
        >
          <div className="max-w-2xl flex-1">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[2px] w-12 bg-cyan-500 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
              <span className="text-cyan-400 font-mono tracking-[0.2em] text-xs font-bold uppercase drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">
                Curriculum Vitae
              </span>
            </div>
            <h2 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
              Professional<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-500 to-fuchsia-500 drop-shadow-[0_0_20px_rgba(34,211,238,0.4)]">
                Journey.
              </span>
            </h2>
            <p className="text-zinc-400 text-lg md:text-xl font-light max-w-lg leading-relaxed">
              A chronological mapping of my technical operations, academic contributions, and digital strategy roles.
            </p>
          </div>
          
          <div className="relative group w-full xl:w-auto">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/30 to-fuchsia-500/20 rounded-3xl blur-xl opacity-40 group-hover:opacity-70 transition duration-1000" />
            <div className="relative bg-white/[0.01] border border-cyan-500/20 p-8 md:p-10 rounded-3xl backdrop-blur-3xl min-w-full xl:min-w-[380px] shadow-[0_0_40px_rgba(34,211,238,0.05)]">
              <h3 className="text-sm uppercase tracking-widest text-cyan-500 font-bold mb-8">Contact Directory</h3>
              <ul className="space-y-5 text-cyan-50 font-light text-sm md:text-base">
                <li className="flex justify-between border-b border-cyan-500/10 pb-3">
                  <span className="text-zinc-500">Phone</span> 
                  <span className="text-cyan-100 drop-shadow-[0_0_2px_rgba(34,211,238,0.8)]">+977-9868223352</span>
                </li>
                <li className="flex justify-between border-b border-cyan-500/10 pb-3">
                  <span className="text-zinc-500">Email</span> 
                  <span className="text-cyan-100 drop-shadow-[0_0_2px_rgba(34,211,238,0.8)]">gbikash34@gmail.com</span>
                </li>
                <li className="flex justify-between border-b border-cyan-500/10 pb-3">
                  <span className="text-zinc-500">Location</span> 
                  <span className="text-cyan-100 drop-shadow-[0_0_2px_rgba(34,211,238,0.8)]">Kathmandu, Nepal</span>
                </li>
                <li className="flex justify-between border-b border-cyan-500/10 pb-3">
                  <span className="text-zinc-500">Freelance</span> 
                  <span className="text-fuchsia-400 font-bold drop-shadow-[0_0_5px_rgba(217,70,239,0.8)]">Available</span>
                </li>
                <li className="flex justify-between border-b border-cyan-500/10 pb-4">
                  <span className="text-zinc-500">NEC Reg</span> 
                  <span className="text-cyan-100 drop-shadow-[0_0_2px_rgba(34,211,238,0.8)]">#81057</span>
                </li>
                <li className="pt-6 flex justify-end gap-6 items-center">
                  <a href="https://www.linkedin.com/in/bikashguptaz/" target="_blank" rel="noreferrer" className="text-cyan-500/70 hover:text-cyan-300 transition-all duration-300 transform hover:-translate-y-1">
                    <span className="sr-only">LinkedIn</span>
                    <svg className="w-6 h-6 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  </a>
                  <a href="https://twitter.com/BikashGupta78" target="_blank" rel="noreferrer" className="text-cyan-500/70 hover:text-cyan-300 transition-all duration-300 transform hover:-translate-y-1">
                    <span className="sr-only">Twitter</span>
                    <svg className="w-6 h-6 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" viewBox="0 0 24 24" fill="currentColor"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                  </a>
                  <a href="https://www.facebook.com/bikash.gupta78" target="_blank" rel="noreferrer" className="text-cyan-500/70 hover:text-cyan-300 transition-all duration-300 transform hover:-translate-y-1">
                    <span className="sr-only">Facebook</span>
                    <svg className="w-6 h-6 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" viewBox="0 0 24 24" fill="currentColor"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.312h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
                  </a>
                  <a href="https://www.instagram.com/the_bee_cashg/" target="_blank" rel="noreferrer" className="text-cyan-500/70 hover:text-cyan-300 transition-all duration-300 transform hover:-translate-y-1">
                    <span className="sr-only">Instagram</span>
                    <svg className="w-6 h-6 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Futuristic Timeline Layout */}
        <div className="relative mb-40 max-w-5xl mx-auto">
          {/* Central Glowing Spine Desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyan-500 via-fuchsia-500/50 to-transparent -translate-x-1/2 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.5)] z-0" />
          
          {/* Left Spine Mobile */}
          <div className="md:hidden absolute left-[15px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyan-500 via-fuchsia-500/50 to-transparent -translate-x-1/2 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.5)] z-0" />

          {/* Timeline Nodes */}
          <div className="flex flex-col gap-12 md:gap-24">
            {experience.map((item, i) => {
              const isRightSide = i % 2 === 0;

              return (
                <motion.div
                  layoutId={`wrapper-${item.id}`}
                  key={item.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className={`relative flex flex-col md:flex-row items-center justify-between w-full group ${!isRightSide ? "md:flex-row-reverse" : ""}`}
                >
                  <div className="hidden md:block w-[45%]" />

                  <div className="absolute left-[15px] md:left-1/2 w-4 h-4 rounded-full bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,1)] border-2 border-[#09090b] transform -translate-x-1/2 z-10 
                                  group-hover:bg-fuchsia-400 group-hover:shadow-[0_0_20px_rgba(217,70,239,1)] group-hover:scale-150 transition-all duration-500" />

                  <div className={`w-full md:w-[45%] pl-12 md:pl-0 ${!isRightSide ? "md:pr-14" : "md:pl-14"}`}>
                    <motion.div 
                      layoutId={`card-${item.id}`}
                      onClick={() => setSelectedId(item.id)}
                      className={`p-8 md:p-10 rounded-3xl bg-white/[0.01] border border-cyan-500/20 hover:border-cyan-400/50 hover:bg-cyan-900/10 hover:shadow-[0_0_50px_rgba(34,211,238,0.15)] backdrop-blur-3xl transition-all duration-500 flex flex-col relative overflow-hidden cursor-pointer ${!isRightSide ? "md:text-right" : "md:text-left"}`}
                    >
                      {mounted && (
                        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-[radial-gradient(ellipse_at_${!isRightSide ? 'right' : 'left'},_var(--tw-gradient-stops))] from-cyan-400/10 via-fuchsia-500/5 to-transparent z-0`} />
                      )}

                      <div className="relative z-10 w-full flex flex-col h-full pointer-events-none">
                        <motion.div layoutId={`card-header-${item.id}`} className={`flex flex-col-reverse gap-3 md:flex-row justify-between items-start ${!isRightSide ? 'md:items-end md:flex-row' : 'md:items-end md:flex-row-reverse'} mb-8 w-full`}>
                          <span className="text-cyan-500 font-mono text-sm tracking-wide shrink-0">
                            {item.date}
                          </span>
                          <span className="inline-block py-1.5 px-4 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-[10px] sm:text-xs font-bold tracking-widest uppercase text-cyan-200 shadow-[0_0_15px_rgba(34,211,238,0.2)] shrink-0">
                            {item.type}
                          </span>
                        </motion.div>
                        
                        <motion.h3 layoutId={`card-title-${item.id}`} className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 text-white drop-shadow-[0_0_8px_rgba(34,211,238,0.5)] tracking-tight leading-tight group-hover:text-cyan-100 transition-colors">
                          {item.title}
                        </motion.h3>
                        <motion.p layoutId={`card-company-${item.id}`} className="text-fuchsia-400 font-bold mb-6 uppercase tracking-widest text-xs drop-shadow-[0_0_5px_rgba(217,70,239,0.3)]">
                          {item.company}
                        </motion.p>
                        <motion.p layoutId={`card-desc-${item.id}`} className="text-zinc-300 font-light text-base md:text-lg leading-relaxed mix-blend-screen line-clamp-3">
                          {item.description}
                        </motion.p>
                        
                        <span className="mt-6 text-cyan-400/50 text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                          View Details ↗
                        </span>
                      </div>
                    </motion.div>
                  </div>

                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Education Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-12 mt-20"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-[2px] w-8 bg-fuchsia-500 shadow-[0_0_8px_rgba(217,70,239,0.8)]" />
            <span className="text-fuchsia-400 font-mono tracking-[0.2em] text-xs font-bold uppercase drop-shadow-[0_0_5px_rgba(217,70,239,0.5)]">
              Academia
            </span>
          </div>
          <h2 className="text-5xl font-black tracking-tight text-white mb-6 drop-shadow-[0_0_8px_rgba(34,211,238,0.3)]">Academic Background</h2>
          <div className="h-[1px] w-full max-w-md bg-gradient-to-r from-cyan-500/50 to-transparent" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {education.map((edu, i) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="p-10 rounded-[32px] bg-white/[0.01] border border-cyan-500/20 hover:border-fuchsia-500/40 hover:shadow-[0_0_40px_rgba(217,70,239,0.15)] hover:bg-fuchsia-950/10 backdrop-blur-3xl transition-all duration-500 relative overflow-hidden group"
            >
              <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-fuchsia-500/20 blur-[80px] rounded-full group-hover:bg-fuchsia-400/30 transition-all duration-700 z-0" />
              
              <div className="relative z-10">
                <h4 className="text-3xl font-black text-white drop-shadow-[0_0_5px_rgba(34,211,238,0.3)] mb-3">{edu.degree}</h4>
                <p className="text-cyan-100 text-xl font-light mb-8">{edu.institution}</p>
                <span className="inline-block text-fuchsia-300 font-mono font-bold text-sm py-2 px-4 bg-fuchsia-950/40 rounded-xl border border-fuchsia-500/30 shadow-[0_0_15px_rgba(217,70,239,0.15)]">{edu.date}</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Detail Modal Overlay */}
      <AnimatePresence>
        {selectedId !== null && selectedExp && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6 md:p-12 overflow-hidden">
            {/* Background Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-[#030014]/80 backdrop-blur-xl cursor-default"
            />
            
            {/* Modal Card */}
            <motion.div
              layoutId={`card-${selectedExp.id}`}
              className="relative z-10 w-full max-w-4xl max-h-[90vh] bg-[#09090b]/95 border border-cyan-500/40 rounded-[32px] p-8 md:p-14 shadow-[0_0_80px_rgba(34,211,238,0.2)] overflow-y-auto custom-scrollbar flex flex-col"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedId(null)}
                className="absolute top-6 right-6 md:top-8 md:right-8 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-cyan-500 hover:text-white hover:bg-cyan-500/20 hover:border-cyan-500/50 transition-all z-20"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>

              <motion.div layoutId={`card-header-${selectedExp.id}`} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 border-b border-white/10 pb-8 pr-12">
                 <span className="inline-block py-1.5 px-4 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-xs font-bold tracking-widest uppercase text-cyan-200">
                    {selectedExp.type}
                 </span>
                 <span className="text-cyan-500 font-mono text-sm tracking-wide">
                    {selectedExp.date}
                 </span>
              </motion.div>

              <motion.h3 layoutId={`card-title-${selectedExp.id}`} className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 text-white drop-shadow-[0_0_15px_rgba(34,211,238,0.5)] tracking-tight leading-tight">
                {selectedExp.title}
              </motion.h3>
              
              <motion.p layoutId={`card-company-${selectedExp.id}`} className="text-fuchsia-400 font-bold mb-8 uppercase tracking-widest text-sm drop-shadow-[0_0_8px_rgba(217,70,239,0.5)]">
                {selectedExp.company}
              </motion.p>
              
              <motion.p layoutId={`card-desc-${selectedExp.id}`} className="text-zinc-200 font-medium text-lg md:text-xl leading-relaxed mb-10">
                {selectedExp.description}
              </motion.p>
              
              <div className="mt-4">
                <h4 className="text-cyan-400 font-bold uppercase tracking-widest text-xs mb-6 flex items-center gap-4">
                  <span>Key Contributions</span>
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-cyan-500/50 to-transparent" />
                </h4>
                <ul className="space-y-4">
                  {selectedExp.details.map((detail, idx) => (
                    <motion.li 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + (idx * 0.1) }}
                      key={idx} 
                      className="flex items-start gap-4 text-zinc-300 font-light text-base md:text-lg leading-relaxed"
                    >
                      <div className="relative mt-2 w-2 h-2 shrink-0 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                      <span>{detail}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
