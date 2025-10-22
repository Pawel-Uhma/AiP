"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 93;
const BATCH_SIZE = 15; // Load frames in batches

// Responsive scaling thresholds - easily adjustable
const SCALE_THRESHOLDS = {
  mobile: { maxWidth: 900, intensity: 0.1 }, // Mobile blend intensity
  tablet: { maxWidth: 1024, scale: 1.5 },    // Tablet scale
  desktop: { maxWidth: 1500, scale: 1.0 },   // Desktop scale
  wide: { maxWidth: 2000, scale: 0.8 },      // Wide desktop scale
  large: { maxWidth: Infinity, scale: 0.6 }  // Large screen scale
};

export function StorySection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<(HTMLImageElement | null)[]>(
    Array(TOTAL_FRAMES).fill(null)
  );
  const [isLoading, setIsLoading] = useState(true);
  const [showColorDivs, setShowColorDivs] = useState(false);
  const [squaresClickable, setSquaresClickable] = useState(false);
  const loadedFrames = useRef<Set<number>>(new Set());

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToLastFrame = () => {
    if (containerRef.current) {
      const container = containerRef.current;
      const containerHeight = container.offsetHeight;
      // Based on user feedback: scroll positions around 4268, 4022, 4035 show the last frame
      // Use a simpler calculation: container.offsetTop + (containerHeight * 0.67)
      const targetScroll = container.offsetTop + (containerHeight * 0.67);
      
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
      });
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
        
        // Calculate dimensions and apply responsive scaling
        const canvasWidth = containerWidth;
        const canvasHeight = containerHeight;
        const imgRatio = img.width / img.height;
        const canvasRatio = canvasWidth / canvasHeight;
        const vw = window.innerWidth;
        

        // Determine scaling strategy based on viewport width
        const isMobile = vw < SCALE_THRESHOLDS.mobile.maxWidth;
        
        let drawWidth: number;
        let drawHeight: number;
        let offsetX: number;
        let offsetY: number;

        if (isMobile) {
          // Mobile: blend between contain and cover
          const intensity = SCALE_THRESHOLDS.mobile.intensity;
          
          // Calculate contain dimensions
          let containWidth, containHeight, containOffsetX, containOffsetY;
          if (imgRatio > canvasRatio) {
            containWidth = canvasWidth;
            containHeight = canvasWidth / imgRatio;
            containOffsetX = 0;
            containOffsetY = (canvasHeight - containHeight) / 2;
          } else {
            containHeight = canvasHeight;
            containWidth = canvasHeight * imgRatio;
            containOffsetX = (canvasWidth - containWidth) / 2;
            containOffsetY = 0;
          }

          // Calculate cover dimensions
          let coverWidth, coverHeight, coverOffsetX, coverOffsetY;
          if (imgRatio > canvasRatio) {
            coverHeight = canvasHeight;
            coverWidth = canvasHeight * imgRatio;
            coverOffsetX = (canvasWidth - coverWidth) / 2;
            coverOffsetY = 0;
          } else {
            coverWidth = canvasWidth;
            coverHeight = canvasWidth / imgRatio;
            coverOffsetX = 0;
            coverOffsetY = (canvasHeight - coverHeight) / 2;
          }

          // Blend between contain and cover
          drawWidth = containWidth + (coverWidth - containWidth) * intensity;
          drawHeight = containHeight + (coverHeight - containHeight) * intensity;
          offsetX = containOffsetX + (coverOffsetX - containOffsetX) * intensity;
          offsetY = containOffsetY + (coverOffsetY - containOffsetY) * intensity;
        } else {
          // Desktop/tablet: contain with scaling
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

          // Apply responsive scaling
          let scale = 1;
          if (vw >= SCALE_THRESHOLDS.large.maxWidth) {
            scale = SCALE_THRESHOLDS.large.scale;
          } else if (vw >= SCALE_THRESHOLDS.wide.maxWidth) {
            scale = SCALE_THRESHOLDS.wide.scale;
          } else if (vw >= SCALE_THRESHOLDS.desktop.maxWidth) {
            scale = SCALE_THRESHOLDS.desktop.scale;
          } else {
            // Apply tablet scale for anything above mobile threshold (900px+)
            scale = SCALE_THRESHOLDS.tablet.scale;
          }

          const scaledWidth = drawWidth * scale;
          const scaledHeight = drawHeight * scale;
          offsetX += (drawWidth - scaledWidth) / 2;
          offsetY += (drawHeight - scaledHeight) / 2;
          drawWidth = scaledWidth;
          drawHeight = scaledHeight;
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

    // Add scroll listener to show/hide color divs based on scroll position
    const handleScroll = () => {
      if (containerRef.current) {
        const container = containerRef.current;
        const containerHeight = container.offsetHeight;
        const scrollY = window.scrollY;
        // Show divs when reaching the target position (where last frame shows)
        const targetPosition = container.offsetTop + (containerHeight * 0.67);
        
        const OFFSET = 2200;
        setShowColorDivs(scrollY >= targetPosition-OFFSET);
        // Make squares clickable only when reaching the actual target position
        setSquaresClickable(scrollY >= targetPosition-OFFSET);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
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

        {/* Wrapper (no transform scaling; rendering handles cover/crop on mobile) */}
        <div className="relative w-full h-full flex items-center justify-center origin-center">
          <canvas
            ref={canvasRef}
            className="w-[100%] h-[100%] md:translate-y-12 cursor-pointer"
            style={{ opacity: isLoading ? 0 : 1, transition: "opacity 0.3s" }}
            onClick={scrollToLastFrame}
          />

          {/* Clickable Squares - only visible at minimal scroll */}
          {showColorDivs && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
              <div className="relative w-full h-full max-w-4xl max-h-4xl">
                {/* Red Square - Top Left */}
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 0.2, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  whileHover={{ opacity: squaresClickable ? 0.4 : 0.2, scale: squaresClickable ? 1.05 : 1 }}
                  whileTap={{ scale: squaresClickable ? 0.95 : 1 }}
                  onClick={(e) => {
                    if (!squaresClickable) return;
                    e.preventDefault();
                    e.stopPropagation();
                    scrollToSection('red-section');
                  }}
                  className={`bg-red-500 absolute bottom-[50%] left-[50%] w-80 h-120  ${squaresClickable ? 'pointer-events-auto cursor-pointer' : 'pointer-events-none cursor-default'}`}
                />
                
                {/* Blue Square - Top Right */}
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 0.2, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  whileHover={{ opacity: squaresClickable ? 0.4 : 0.2, scale: squaresClickable ? 1.05 : 1 }}
                  whileTap={{ scale: squaresClickable ? 0.95 : 1 }}
                  onClick={(e) => {
                    if (!squaresClickable) return;
                    e.preventDefault();
                    e.stopPropagation();
                    scrollToSection('blue-section');
                  }}
                  className={`bg-blue-500 absolute top-[30%] left-[20%] w-70 h-100  ${squaresClickable ? 'pointer-events-auto cursor-pointer' : 'pointer-events-none cursor-default'}`}
                />
                
                {/* Green Square - Bottom Center */}
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 0.2, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                  whileHover={{ opacity: squaresClickable ? 0.4 : 0.2, scale: squaresClickable ? 1.05 : 1 }}
                  whileTap={{ scale: squaresClickable ? 0.95 : 1 }}
                  onClick={(e) => {
                    if (!squaresClickable) return;
                    e.preventDefault();
                    e.stopPropagation();
                    scrollToSection('green-section');
                  }}
                  className={`bg-green-500 absolute bottom-[36%] left-[50%] w-60 h-50  ${squaresClickable ? 'pointer-events-auto cursor-pointer' : 'pointer-events-none cursor-default'}`}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}