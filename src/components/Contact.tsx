"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "",
          ...formData,
        }),
      });

      if (!res.ok) throw new Error("Failed to send");
      
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative z-20 w-full bg-[#09090b] text-white py-32 px-6 md:px-12 lg:px-24 selection:bg-cyan-500/30 overflow-hidden">
      {/* Decorative top border fade */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
      
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-fuchsia-500 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">
            Let&apos;s Connect
          </h2>
          <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-fuchsia-500/50 to-transparent mx-auto mb-6" />
          <p className="text-cyan-100/70 text-lg">Have a project in mind or want to explore an opportunity? Drop a message.</p>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, y: 50 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.8 }}
           className="bg-white/[0.01] border border-cyan-500/20 p-8 md:p-12 rounded-[32px] backdrop-blur-3xl shadow-[0_0_50px_rgba(34,211,238,0.1)] relative overflow-hidden group"
        >
          {/* Subtle glow effect inside form */}
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full -z-10 opacity-50 group-hover:opacity-100 transition duration-1000" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-fuchsia-500/10 blur-[120px] rounded-full -z-10 opacity-50 group-hover:opacity-100 transition duration-1000" />
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-3">
                <label htmlFor="name" className="text-xs font-bold text-cyan-500 uppercase tracking-widest pl-1">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-black/40 border border-cyan-500/20 rounded-2xl p-5 text-white placeholder-cyan-900 focus:outline-none focus:border-cyan-400 focus:bg-black/60 focus:shadow-[0_0_20px_rgba(34,211,238,0.15)] transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div className="flex flex-col gap-3">
                <label htmlFor="email" className="text-xs font-bold text-cyan-500 uppercase tracking-widest pl-1">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-black/40 border border-cyan-500/20 rounded-2xl p-5 text-white placeholder-cyan-900 focus:outline-none focus:border-cyan-400 focus:bg-black/60 focus:shadow-[0_0_20px_rgba(34,211,238,0.15)] transition-all"
                  placeholder="john@example.com"
                />
              </div>
            </div>
            
            <div className="flex flex-col gap-3">
              <label htmlFor="message" className="text-xs font-bold text-cyan-500 uppercase tracking-widest pl-1">Message</label>
              <textarea 
                id="message" 
                rows={5}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="bg-black/40 border border-cyan-500/20 rounded-2xl p-5 text-white placeholder-cyan-900 focus:outline-none focus:border-cyan-400 focus:bg-black/60 focus:shadow-[0_0_20px_rgba(34,211,238,0.15)] transition-all resize-y"
                placeholder="How can we collaborate?"
              />
            </div>

            <button 
              type="submit" 
              disabled={status === "loading"}
              className="mt-6 bg-gradient-to-r from-cyan-500 to-blue-600 border border-cyan-400/50 text-white font-extrabold tracking-widest uppercase text-sm py-5 rounded-2xl hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_30px_rgba(34,211,238,0.3)] hover:shadow-[0_0_50px_rgba(34,211,238,0.6)]"
            >
              {status === "loading" ? "Transmitting..." : "Initialize Contact"}
            </button>

            {status === "success" && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-green-400 drop-shadow-[0_0_10px_rgba(74,222,128,0.8)] text-center text-sm font-bold mt-4">
                Transmission successful! I will get back to you soon.
              </motion.p>
            )}
            {status === "error" && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 drop-shadow-[0_0_10px_rgba(248,113,113,0.8)] text-center text-sm font-bold mt-4">
                Transmission failed. Please check your connection.
              </motion.p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
}
