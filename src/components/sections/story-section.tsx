"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 93;
const BATCH_SIZE = 15; // Load frames in batches

export function StorySection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<(HTMLImageElement | null)[]>(
    Array(TOTAL_FRAMES).fill(null)
  );
  const [isLoading, setIsLoading] = useState(true);
  const loadedFrames = useRef<Set<number>>(new Set());

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Load a specific frame
  const loadFrame = (index: number) => {
    if (loadedFrames.current.has(index)) return Promise.resolve();

    return new Promise<void>((resolve) => {
      const img = new Image();
      img.src = `/videos/envelope/frame_${String(index + 1).padStart(5, "0")}.png`;
      
      img.onload = () => {
        setImages((prev) => {
          const newImages = [...prev];
          newImages[index] = img;
          return newImages;
        });
        loadedFrames.current.add(index);
        resolve();
      };

      img.onerror = () => {
        console.error(`Failed to load frame ${index}`);
        resolve();
      };
    });
  };

  // Progressive loading strategy
  useEffect(() => {
    const loadFrames = async () => {
      // Load first frame immediately for initial render
      await loadFrame(0);
      setIsLoading(false);

      // Load frames in batches
      const loadBatch = async (startIndex: number) => {
        const promises = [];
        for (let i = startIndex; i < Math.min(startIndex + BATCH_SIZE, TOTAL_FRAMES); i++) {
          promises.push(loadFrame(i));
        }
        await Promise.all(promises);
      };

      // Load remaining frames in background
      for (let i = 1; i < TOTAL_FRAMES; i += BATCH_SIZE) {
        await loadBatch(i);
      }
    };

    loadFrames();
  }, []);

  // Setup canvas and ScrollTrigger
  useEffect(() => {
    if (isLoading || !canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const container = containerRef.current;

    if (!context) return;

    // Set canvas size
    const scale = window.devicePixelRatio || 1;
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    canvas.width = containerWidth * scale;
    canvas.height = containerHeight * scale;
    canvas.style.width = `${containerWidth}px`;
    canvas.style.height = `${containerHeight}px`;

    // Scale context to account for device pixel ratio
    context.scale(scale, scale);

    const frameObj = { frame: 0 };

    const render = () => {
      const frameIndex = Math.floor(frameObj.frame);
      const img = images[frameIndex];
      
      if (img && img.complete) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        // Calculate dimensions to maintain aspect ratio (contain)
        const canvasWidth = containerWidth;
        const canvasHeight = containerHeight;
        const imgRatio = img.width / img.height;
        const canvasRatio = canvasWidth / canvasHeight;
        
        let drawWidth, drawHeight, offsetX, offsetY;
        
        if (imgRatio > canvasRatio) {
          drawWidth = canvasWidth;
          drawHeight = canvasWidth / imgRatio;
          offsetX = 0;
          offsetY = (canvasHeight - drawHeight) / 2;
        } else {
          drawHeight = canvasHeight;
          drawWidth = canvasHeight * imgRatio;
          offsetX = (canvasWidth - drawWidth) / 2;
          offsetY = 0;
        }
        
        context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      } else {
        // Load frame on demand if not loaded yet
        if (!loadedFrames.current.has(frameIndex)) {
          loadFrame(frameIndex);
        }
      }
    };

    // Create ScrollTrigger animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        onUpdate: render,
      },
    });

    tl.to(frameObj, {
      frame: TOTAL_FRAMES - 1,
      ease: "none",
      onUpdate: render,
    });

    // Initial render
    render();

    // Handle window resize
    const handleResize = () => {
      const scale = window.devicePixelRatio || 1;
      const newContainerWidth = container.clientWidth;
      const newContainerHeight = container.clientHeight;
      canvas.width = newContainerWidth * scale;
      canvas.height = newContainerHeight * scale;
      canvas.style.width = `${newContainerWidth}px`;
      canvas.style.height = `${newContainerHeight}px`;
      context.scale(scale, scale);
      render();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [images, isLoading]);

  return (
    <section
      ref={containerRef}
      id="story"
      className="relative"
      style={{ height: "300vh", backgroundColor: "#ffffff" }}
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center text-white">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
              <p>Loading...</p>
            </div>
          </div>
        )}
        <canvas
          ref={canvasRef}
          className="w-[80%] h-[80%] translate-y-12"
          style={{ opacity: isLoading ? 0 : 1, transition: "opacity 0.3s" }}
        />
        
        {/* Clickable Squares */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <div className="relative w-full h-full max-w-4xl max-h-4xl">
            {/* Red Square - Top Left */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.2, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              whileHover={{ opacity: 0.4, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                scrollToSection('red-section');
              }}
              className="absolute top-[23%] right-[22%] w-60 h-80  rounded-lg pointer-events-auto cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 z-30"
            />
            
            {/* Blue Square - Top Right */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.2, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              whileHover={{ opacity: 0.4, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                scrollToSection('blue-section');
              }}
              className="absolute top-[30%] left-[20%] w-70 h-100  rounded-lg pointer-events-auto cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 z-30"
            />
            
            {/* Green Square - Bottom Center */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.2, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              whileHover={{ opacity: 0.4, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                scrollToSection('green-section');
              }}
              className="absolute bottom-[36%] left-[50%] transform  w-55 h-50  rounded-lg pointer-events-auto cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 z-30"
            />
          </div>
        </div>
      </div>
    </section>
  );
}