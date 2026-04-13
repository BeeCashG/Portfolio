"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

function ParallaxSection({
  children,
  offsetY = 100,
  className = "",
}: {
  children: React.ReactNode;
  offsetY?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [offsetY, -offsetY]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <motion.div ref={ref} style={{ y, opacity }} className={`w-full ${className}`}>
      {children}
    </motion.div>
  );
}

export default function Overlay() {
  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-10 font-sans">
      {/* Section 1: Intro */}
      <div className="absolute top-[10vh] left-0 w-full flex justify-center px-6">
        <ParallaxSection offsetY={-50}>
          <div className="text-center relative">
            {/* Subtle glow behind text */}
            <div className="absolute inset-x-0 -inset-y-12 bg-cyan-900/30 blur-[100px] rounded-full -z-10" />
            
            <motion.h1 
              initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
              animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-cyan-100 to-cyan-500 mb-6 drop-shadow-[0_0_20px_rgba(34,211,238,0.4)]"
            >
              Er. Bikash Gupta
            </motion.h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="flex flex-wrap items-center justify-center gap-3 md:gap-6 text-sm md:text-lg text-cyan-50 font-light tracking-widest uppercase"
            >
              <span>Digital Strategist</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
              <span>Professor</span>
              <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-500 shadow-[0_0_10px_rgba(217,70,239,0.8)]" />
              <span>Full-Stack Developer</span>
            </motion.div>
          </div>
        </ParallaxSection>
      </div>

      {/* Section 2: Summary */}
      <div className="absolute top-[150vh] left-0 w-full flex justify-center px-6 md:px-16 lg:px-32">
        <ParallaxSection offsetY={120}>
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8 items-start md:items-center relative">
            <div className="absolute -inset-20 bg-fuchsia-950/20 blur-[120px] rounded-[100px] -z-10" />
            <div className="w-full md:w-1/3">
              <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white leading-none">
                Professional<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-cyan-400 drop-shadow-[0_0_10px_rgba(217,70,239,0.3)]">Summary.</span>
              </h2>
            </div>
            <div className="w-full md:w-2/3 border-l border-cyan-500/30 pl-6 md:pl-10">
              <p className="text-xl md:text-2xl text-cyan-50/80 font-light leading-relaxed">
                Experienced <span className="text-cyan-300 font-bold drop-shadow-[0_0_8px_rgba(34,211,238,0.3)]">Digital Marketing Strategist</span> with a strong background in SEO, web development, and content strategy. Proven track record of driving organic traffic for businesses. In addition to marketing expertise, I serve as a <span className="text-fuchsia-300 font-bold drop-shadow-[0_0_8px_rgba(217,70,239,0.3)]">Part-time Professor</span>, fostering student success through practical learning.
              </p>
            </div>
          </div>
        </ParallaxSection>
      </div>

      {/* Section 3: Core Skills */}
      <div className="absolute top-[300vh] left-0 w-full flex justify-center px-6 md:px-16 lg:px-32">
        <ParallaxSection offsetY={80}>
          <div className="max-w-5xl mx-auto relative bg-gradient-to-b from-cyan-500/20 to-transparent p-[1px] rounded-[2rem]">
            <div className="bg-white/[0.01] border border-cyan-500/10 backdrop-blur-3xl p-8 md:p-14 rounded-[31px] shadow-[0_0_50px_rgba(34,211,238,0.05)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[100px] rounded-full" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-fuchsia-500/10 blur-[100px] rounded-full" />
              
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white mb-10 drop-shadow-[0_0_8px_rgba(34,211,238,0.3)]">
                Core Competencies
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10">
                <div>
                  <h3 className="text-fuchsia-400 drop-shadow-[0_0_5px_rgba(217,70,239,0.5)] uppercase tracking-widest text-xs font-bold mb-4">Digital Marketing</h3>
                  <ul className="space-y-2 text-cyan-50 font-light md:text-lg">
                    <li>SEO Optimization</li>
                    <li>Content Strategy</li>
                    <li>CRM Personalization</li>
                    <li>Marketing Automation</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.5)] uppercase tracking-widest text-xs font-bold mb-4">Web Development</h3>
                  <ul className="space-y-2 text-cyan-50 font-light md:text-lg">
                    <li>React.js / Next.js</li>
                    <li>PHP / Django</li>
                    <li>HTML5 / CSS3</li>
                    <li>Flutter / Python</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-fuchsia-400 drop-shadow-[0_0_5px_rgba(217,70,239,0.5)] uppercase tracking-widest text-xs font-bold mb-4">Design & Systems</h3>
                  <ul className="space-y-2 text-cyan-50 font-light md:text-lg">
                    <li>Linux Server Admin</li>
                    <li>UI/UX Strategy</li>
                    <li>Adobe Photoshop</li>
                    <li>Graphics Design</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </ParallaxSection>
      </div>
    </div>
  );
}
