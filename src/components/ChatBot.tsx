"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Knowledge Base for "Demo Mode" Simulation
 * Maps common keywords to professional responses based on Bikash's CV.
 */
const RESPONSES: Record<string, string> = {
  "default": "SYSTEM READY. I am Bikash-Bot, a digital twin of Er. Bikash Gupta. I can assist with queries regarding his projects, technical expertise, or strategic approach. How can I facilitate your inquiry?",
  "react": "Bikash specializes in high-end React.js and Next.js development, focusing on performance, SEO, and cinematic UI/UX like this portfolio.",
  "experience": "He is a seasoned Digital Marketing Strategist and Full-Stack Developer with deep roots in SEO, CRM automation, and high-performance web architecture.",
  "professor": "Beyond engineering, Bikash is a Part-time Professor, bridging the gap between academic theory and high-level industry practice for his students.",
  "seo": "Bikash engineers digital assets with an 'SEO-First' mindset, ensuring that every line of code translates into organic growth and search dominance.",
  "contact": "You can transmit a message directly via the 'Connect' section at the bottom of this page, or download his CV from the navigation bar.",
  "projects": "His showcase includes high-impact travel portals like Lonely Nepal Travels, leadership roles at Vedalaya Group, and various full-stack entertainment apps.",
};

const SUGGESTIONS = ["Technical Stack", "SEO Strategy", "Teaching Career", "Contact Details"];

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "bot" | "user"; text: string }[]>([
    { role: "bot", text: RESPONSES.default },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const newMessages = [...messages, { role: "user" as const, text }];
    setMessages(newMessages);
    setInput("");
    setIsTyping(true);

    // Simulate AI Processing
    setTimeout(() => {
      const lowerText = text.toLowerCase();
      let responseText = RESPONSES.default;

      if (lowerText.includes("react") || lowerText.includes("tech") || lowerText.includes("stack")) responseText = RESPONSES.react;
      else if (lowerText.includes("seo") || lowerText.includes("marketing")) responseText = RESPONSES.seo;
      else if (lowerText.includes("professor") || lowerText.includes("teaching")) responseText = RESPONSES.professor;
      else if (lowerText.includes("experience") || lowerText.includes("who")) responseText = RESPONSES.experience;
      else if (lowerText.includes("project") || lowerText.includes("work")) responseText = RESPONSES.projects;
      else if (lowerText.includes("contact") || lowerText.includes("hire") || lowerText.includes("email")) responseText = RESPONSES.contact;

      setMessages((prev) => [...prev, { role: "bot", text: responseText }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[10000] font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute bottom-20 right-0 w-[350px] md:w-[400px] h-[500px] bg-[#09090b]/95 backdrop-blur-3xl border border-cyan-500/30 rounded-3xl shadow-[0_0_50px_rgba(34,211,238,0.1)] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-5 border-b border-cyan-500/10 flex justify-between items-center bg-cyan-500/5">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                <span className="text-xs font-black tracking-[0.3em] uppercase text-cyan-100">Bikash-Bot v1.0</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-zinc-500 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Messages Area */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide"
            >
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: msg.role === 'user' ? 10 : -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-cyan-500/20 border border-cyan-400/30 text-cyan-50 rounded-tr-none' 
                      : 'bg-zinc-900/50 border border-white/5 text-zinc-300 rounded-tl-none font-light italic'
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-zinc-900/50 p-4 rounded-2xl rounded-tl-none border border-white/5 flex gap-1">
                    <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 rounded-full bg-cyan-400/50" />
                    <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-cyan-400/50" />
                    <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-cyan-400/50" />
                  </div>
                </div>
              )}
            </div>

            {/* Suggestions & Input */}
            <div className="p-5 border-t border-cyan-500/10 space-y-4">
              <div className="flex flex-wrap gap-2">
                {SUGGESTIONS.map(s => (
                  <button
                    key={s}
                    onClick={() => handleSend(s)}
                    className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/10 transition-all"
                  >
                    {s}
                  </button>
                ))}
              </div>
              <div className="relative">
                <input 
                  type="text"
                  placeholder="Inquire system..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
                  className="w-full bg-zinc-900/80 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-500/50 text-white placeholder:text-zinc-600 font-mono tracking-wider"
                />
                <button 
                  onClick={() => handleSend(input)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-cyan-400 font-bold"
                >
                  ↵
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full bg-[#09090b] border-2 border-cyan-500 shadow-[0_0_30px_rgba(34,211,238,0.3)] flex items-center justify-center group overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-fuchsia-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="relative">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="#22d3ee"/>
            <path d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z" fill="#e879f9" className="animate-pulse" />
          </svg>
        </div>
      </motion.button>
    </div>
  );
}
