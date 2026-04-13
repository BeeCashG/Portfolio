"use client";

import { useRef, useEffect, useState } from "react";
import { useScroll, useTransform } from "framer-motion";
import Overlay from "./Overlay";

const FRAME_COUNT = 192; // Total number of sequence frames

export default function ScrollyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];

    for (let i = 0; i < FRAME_COUNT; i++) {
        const img = new Image();
        // Format to 3 digits frame_000 to frame_191
        const frameNum = i.toString().padStart(3, "0");
        img.src = `/sequence/frame_${frameNum}_delay-0.041s.webp`;
        
        img.onload = () => {
          loadedCount++;
          if (loadedCount === FRAME_COUNT) {
            setImages(loadedImages);
            setImagesLoaded(true);
          }
        };
        img.onerror = () => {
          loadedCount++;
          if (loadedCount === FRAME_COUNT) {
            setImages(loadedImages);
            setImagesLoaded(true);
          }
        };
        
        loadedImages.push(img);
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  useEffect(() => {
    if (!imagesLoaded || !canvasRef.current || images.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
      renderFrame(frameIndex.get());
    };

    window.addEventListener("resize", updateCanvasSize);
    updateCanvasSize();

    function renderFrame(index: number) {
      const img = images[Math.floor(index)];
      if (!img || !canvas || !ctx) return;

      const scale = Math.max(window.innerWidth / img.naturalWidth, window.innerHeight / img.naturalHeight);
      const w = img.naturalWidth * scale;
      const h = img.naturalHeight * scale;
      const x = (window.innerWidth - w) / 2;
      const y = (window.innerHeight - h) / 2;

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.drawImage(img, x, y, w, h);
    }

    const unsubscribe = frameIndex.on("change", (latestVal) => {
      renderFrame(latestVal);
    });

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
      unsubscribe();
    };
  }, [imagesLoaded, images, frameIndex]);

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: "500vh" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#121212]">
        {!imagesLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-50">
            <div className="w-8 h-8 border-4 border-zinc-600 border-t-white rounded-full animate-spin mb-4" />
            <span className="text-white/50 text-sm tracking-widest font-mono">LOADING EXPERIENCE...</span>
          </div>
        )}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      </div>
      <Overlay />
    </div>
  );
}
