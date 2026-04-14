"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const skillsSection = document.getElementById("skills");
      if (skillsSection) {
        // Trigger the navbar to drop down exactly when the Skills section hits the top 20% of the viewport boundary
        if (window.scrollY > skillsSection.offsetTop - window.innerHeight * 0.2) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Trigger immediately to check load position
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    if (targetId === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: isVisible ? 0 : -100, opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center bg-[#09090b]/50 backdrop-blur-2xl border-b border-cyan-500/10 shadow-[0_4px_30px_rgba(34,211,238,0.05)]"
    >
      <div className="flex items-center gap-3 cursor-pointer" onClick={(e) => handleScrollClick(e as any, "home")}>
        <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
        <span className="font-black text-white tracking-widest text-lg drop-shadow-[0_0_8px_rgba(34,211,238,0.5)] uppercase">
          Er. Bikash Gupta
        </span>
      </div>

      <ul className="hidden md:flex items-center gap-8">
        {[
          { id: "home", label: "home" },
          { id: "skills", label: "skills" },
          { id: "gallery", label: "gallery" },
          { id: "showcase", label: "showcase" },
          { id: "resume", label: "experience" },
          { id: "contact", label: "contact" }
        ].map((item) => (
          <li key={item.id}>
            <a 
              href={`#${item.id}`} 
              onClick={(e) => handleScrollClick(e, item.id)}
              className="text-cyan-50/70 hover:text-cyan-400 text-xs font-bold uppercase tracking-widest transition-colors drop-shadow-[0_0_5px_rgba(34,211,238,0)] hover:drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]"
            >
              {item.label}
            </a>
          </li>
        ))}
        <li>
          <a 
            href="/Bikash_Gupta_CV.pdf"
            download
            className="ml-4 px-4 py-2 border border-cyan-500/40 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(34,211,238,0.1)] hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]"
          >
            CV
          </a>
        </li>
      </ul>
      
      {/* Mobile Menu Placeholder / Contact Button */}
      <a 
        href="#contact"
        onClick={(e) => handleScrollClick(e, "contact")}
        className="md:hidden text-cyan-400 border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(34,211,238,0.1)]"
      >
        Connect
      </a>
    </motion.nav>
  );
}
