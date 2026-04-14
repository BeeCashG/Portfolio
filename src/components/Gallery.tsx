"use client";

import { motion, useAnimation, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useState, useRef, useEffect, useMemo } from "react";

interface GalleryProps {
  images?: string[];
}

interface GalleryCardProps {
  image: string;
  index: number;
  x: any;
  totalImages: number;
  cardWidth: number;
  onClick: () => void;
}

const GalleryCard = ({ image, index, x, totalImages, cardWidth, onClick }: GalleryCardProps) => {
  const initialOffset = index * cardWidth;
  const cardOuterWidth = cardWidth;
  const cardInnerWidth = cardWidth - 24; 
  
  // Base transform logic: Viewport tracking
  const centerOfCard = useTransform(x, (latest: number) => latest + initialOffset + (cardInnerWidth / 2));
  const centerOfScreen = typeof window !== 'undefined' ? window.innerWidth / 2 : 500;
  
  // 1. Kinetic Spring Physics for ultra-smoothness
  const springConfig = { stiffness: 100, damping: 30, mass: 1 };

  const scale = useSpring(useTransform(centerOfCard, (val) => {
    const distance = Math.abs(val - centerOfScreen);
    return Math.max(0.85, 1.15 - (distance / 800));
  }), springConfig);

  const opacity = useSpring(useTransform(centerOfCard, (val) => {
    const distance = Math.abs(val - centerOfScreen);
    return Math.max(0.2, 1 - (distance / 600));
  }), springConfig);

  // 2. 3D Cylindrical Rotation (Perspective depth)
  const rotateY = useSpring(useTransform(centerOfCard, (val) => {
    const distance = val - centerOfScreen;
    return Math.max(-25, Math.min(25, (distance / 400) * 45));
  }), springConfig);

  const z = useSpring(useTransform(centerOfCard, (val) => {
    const distance = Math.abs(val - centerOfScreen);
    return Math.max(-100, 100 - (distance / 4));
  }), springConfig);

  // 3. Dynamic Neon Glow (Cyan/Fuchsia)
  const glowOpacity = useTransform(centerOfCard, (val) => {
    const distance = Math.abs(val - centerOfScreen);
    return Math.max(0, 0.6 - (distance / 400));
  });

  const grayscale = useTransform(centerOfCard, (val) => {
    const distance = Math.abs(val - centerOfScreen);
    const amount = Math.min(100, (distance / 300) * 100);
    return `grayscale(${amount}%)`;
  });

  const brightness = useTransform(centerOfCard, (val) => {
    const distance = Math.abs(val - centerOfScreen);
    const amount = Math.max(0.6, 1.3 - (distance / 400));
    return `brightness(${amount})`;
  });

  return (
    <motion.div
      layoutId={`card-gallery-${index}`}
      onClick={onClick}
      style={{ 
        scale, 
        opacity, 
        rotateY,
        z,
        filter: `${grayscale} ${brightness}`,
        perspective: "1000px",
        transformStyle: "preserve-3d",
        width: cardInnerWidth,
        height: cardInnerWidth
      }}
      className="relative rounded-[2rem] overflow-hidden border border-white/5 bg-zinc-900/40 group backdrop-blur-xl shrink-0 cursor-pointer"
    >
      {/* Dynamic Neon Border Glow */}
      <motion.div 
        style={{ opacity: glowOpacity }}
        className="absolute inset-0 border-[2px] border-cyan-500/40 shadow-[0_0_30px_rgba(6,182,212,0.3)] z-10 pointer-events-none rounded-[2rem]"
      />
      
      <motion.div className="w-full h-full overflow-hidden relative">
        <motion.img 
          layoutId={`img-gallery-${index}`}
          src={image} 
          alt={`Er. Bikash Gupta Creative Project - Design Showcase #${(index % totalImages) + 1}`}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
      </motion.div>

      {/* Asset Info Overlay */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-8 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
          <span className="text-cyan-400 font-mono text-[9px] uppercase font-bold tracking-[0.3em] drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">
            Active Asset
          </span>
        </div>
        <p className="text-white font-black text-xl italic tracking-tighter">PROJECT_{index + 1}</p>
      </div>

      {/* High-fidelity glass reflection */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 border border-white/10 rounded-[2rem] pointer-events-none group-hover:border-cyan-500/30 transition-colors" />
    </motion.div>
  );
};

export default function Gallery({ images = [] }: GalleryProps) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [cardWidth, setCardWidth] = useState(344); // Default: 320 + 24 (gap-6)
  const carousel = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const x = useMotionValue(0);

  // Dynamic width tracking for responsive accuracy
  useEffect(() => {
    const updateWidth = () => {
      const isMobile = window.innerWidth < 768;
      setCardWidth(isMobile ? 260 + 24 : 320 + 24);
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Handle case where no images are provided
  const displayImages = useMemo(() => {
    if (images.length === 0) return [];
    // Triple it for infinite scroll
    return [...images, ...images, ...images];
  }, [images]);

  const baseWidth = useMemo(() => {
    return cardWidth * (images.length || 0);
  }, [images.length, cardWidth]);

  useEffect(() => {
    if (images.length > 0) {
      const initialPos = -baseWidth;
      x.set(initialPos);
      controls.set({ x: initialPos });
    }
  }, [baseWidth, images.length, controls, x]);

  const handleArrowClick = (direction: 'left' | 'right') => {
    if (images.length === 0) return;
    const currentX = x.get();
    let newPos = currentX + (direction === 'left' ? cardWidth : -cardWidth);

    // Silent reset logic for infinite feel
    if (newPos > -baseWidth / 2) {
      newPos -= baseWidth;
      x.set(newPos);
      controls.set({ x: newPos });
    } else if (newPos < -(baseWidth * 2)) {
      newPos += baseWidth;
      x.set(newPos);
      controls.set({ x: newPos });
    }

    controls.start({ x: newPos, transition: { type: "spring", stiffness: 300, damping: 35 } });
  };

  // Continuous Animation Logic
  useEffect(() => {
    if (isPaused || selectedId !== null || images.length === 0) {
      controls.stop();
      return;
    }

    const speed = 40; // Pixels per second

    const animateLoop = async () => {
      const currentX = x.get();
      const targetX = -(baseWidth * 2);
      const remainingDistance = Math.abs(currentX - targetX);
      const duration = remainingDistance / speed;

      await controls.start({
        x: targetX,
        transition: {
          duration,
          ease: "linear"
        }
      });

      // Seamlessly reset and continue
      const resetPos = -baseWidth;
      x.set(resetPos);
      controls.set({ x: resetPos });
      
      // Trigger next cycle
      animateLoop();
    };

    animateLoop();

    return () => controls.stop();
  }, [isPaused, selectedId, baseWidth, images.length, controls, x]);

  const displayDesign = selectedId !== null ? displayImages[selectedId] : null;

  useEffect(() => {
    if (selectedId !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      setIsZoomed(false);
    }
  }, [selectedId]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedId(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  if (images.length === 0) return null;

  return (
    <section id="gallery" className="relative w-full bg-[#09090b] text-white py-20 px-6 md:px-12 lg:px-24 overflow-hidden border-t border-cyan-900/40">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-fuchsia-500/30 to-transparent" />
      
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div className="max-w-xl">
            <div className="flex items-center gap-4 mb-3">
              <div className="h-[1.5px] w-10 bg-fuchsia-500 shadow-[0_0_8px_rgba(217,70,239,0.8)]" />
              <span className="text-fuchsia-400 font-mono tracking-[0.2em] text-[10px] font-bold uppercase drop-shadow-[0_0_5px_rgba(217,70,239,0.5)]">
                Visual Laboratory
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4 leading-none text-white">
              Design <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-cyan-400 drop-shadow-[0_0_15px_rgba(217,70,239,0.3)]">Gallery.</span>
            </h2>
            <p className="text-zinc-500 text-sm md:text-base font-light leading-relaxed">
              Intersection of aesthetics and strategy. Content automatically synchronized from workspace.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex gap-2">
              <button 
                onClick={() => handleArrowClick('left')}
                className="w-10 h-10 rounded-full border border-fuchsia-500/30 bg-fuchsia-500/5 flex items-center justify-center text-fuchsia-400 hover:bg-fuchsia-500/20 shadow-[0_0_15px_rgba(217,70,239,0.1)]"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"></path></svg>
              </button>
              <button 
                onClick={() => handleArrowClick('right')}
                className="w-10 h-10 rounded-full border border-fuchsia-500/30 bg-fuchsia-500/5 flex items-center justify-center text-fuchsia-400 hover:bg-fuchsia-500/20 shadow-[0_0_15px_rgba(217,70,239,0.1)]"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"></path></svg>
              </button>
            </div>
          </div>
        </motion.div>

        <motion.div 
          ref={carousel} 
          className="cursor-grab active:cursor-grabbing overflow-visible"
          style={{ perspective: "2000px" }}
          whileTap={{ cursor: "grabbing" }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <motion.div 
            drag="x" 
            dragConstraints={{ right: 0, left: -(baseWidth * 2) }}
            animate={controls}
            style={{ x }}
            onDragEnd={(e, info) => {
              let newPos = x.get() + info.offset.x;
              if (newPos > -baseWidth / 2) {
                newPos -= baseWidth;
                x.set(newPos);
                controls.set({ x: newPos });
              } else if (newPos < -(baseWidth * 1.5)) {
                newPos += baseWidth;
                x.set(newPos);
                controls.set({ x: newPos });
              }
              controls.start({ x: newPos, transition: { type: "spring", stiffness: 300, damping: 35 } });
            }}
            className="flex gap-6 py-10"
          >
            {displayImages.map((image, i) => (
              <GalleryCard 
                key={`gallery-${i}`}
                image={image}
                index={i}
                x={x}
                totalImages={images.length}
                cardWidth={cardWidth}
                onClick={() => setSelectedId(i)}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedId !== null && displayDesign && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] flex items-center justify-center p-4 md:p-12 bg-[#030014]/90 backdrop-blur-2xl overflow-hidden"
          >
            <button 
              onClick={() => setSelectedId(null)}
              className="absolute top-8 right-8 z-[110] w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-fuchsia-500/20 hover:border-fuchsia-500 transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[110] flex gap-4 items-center px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-[10px] font-bold uppercase tracking-[0.2em] text-fuchsia-400">
              <span>{isZoomed ? "Drag to Pan" : "Click to Zoom"}</span>
              <div className="w-[1px] h-4 bg-white/10" />
              <span className="text-white/60">Press Esc to Close</span>
            </div>

            <motion.div 
              layoutId={`card-gallery-${selectedId}`}
              className="relative w-full h-full max-w-6xl max-h-[85vh] rounded-[2rem] overflow-hidden flex items-center justify-center bg-black/40"
              style={{ cursor: isZoomed ? 'grabbing' : 'zoom-in' }}
              onClick={() => setIsZoomed(!isZoomed)}
            >
              <motion.img 
                layoutId={`img-gallery-${selectedId}`}
                src={displayDesign}
                alt={`Large view`}
                drag={isZoomed}
                dragConstraints={isZoomed ? { left: -500, right: 500, top: -500, bottom: 500 } : { left: 0, right: 0, top: 0, bottom: 0 }}
                animate={{ scale: isZoomed ? 2.5 : 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="max-w-full max-h-full object-contain pointer-events-none md:pointer-events-auto"
                style={{ cursor: isZoomed ? 'grabbing' : 'zoom-in' }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
