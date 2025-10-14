"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 93;

export function StorySection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);

  // Preload all frame images
  useEffect(() => {
    const frameImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `/videos/envelope/frame_${String(i).padStart(5, "0")}.png`;
      
      img.onload = () => {
        loadedCount++;
        if (loadedCount === TOTAL_FRAMES) {
          setImages(frameImages);
        }
      };
      
      frameImages.push(img);
    }
  }, []);

  // Setup canvas and ScrollTrigger
  useEffect(() => {
    if (images.length === 0 || !canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const container = containerRef.current;

    if (!context) return;

    // Set canvas size
    const scale = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * scale;
    canvas.height = window.innerHeight * scale;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    // Scale context to account for device pixel ratio
    context.scale(scale, scale);

    const frameObj = { frame: 0 };

    const render = () => {
      const frameIndex = Math.floor(frameObj.frame);
      const img = images[frameIndex];
      
      if (img && img.complete) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        // Calculate dimensions to maintain aspect ratio (contain)
        const canvasWidth = window.innerWidth;
        const canvasHeight = window.innerHeight;
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
      canvas.width = window.innerWidth * scale;
      canvas.height = window.innerHeight * scale;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.scale(scale, scale);
      render();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [images]);

  return (
    <section
      ref={containerRef}
      id="story"
      className="relative"
      style={{ height: "300vh", backgroundColor: "#33401c" }}
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
        />
      </div>
    </section>
  );
}