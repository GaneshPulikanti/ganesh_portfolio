"use client";

import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { SculpturalCore } from "./SculpturalCore";
import { ParticleField } from "./ParticleField";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export const BackgroundCanvas: React.FC = () => {
  const scrollProgress = useScrollProgress();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (!mounted) return null;

  return (
    <div className="canvas-container">
      <Canvas
        camera={{ position: [0, 0, 5], fov: isMobile ? 65 : 50 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, isMobile ? 1.5 : 2]}
      >
        {/* Ambient & Directional Lighting System */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} color="#F5EBE6" />
        <directionalLight position={[-5, -5, -2]} intensity={1.2} color="#C43859" />
        <spotLight position={[0, 8, 4]} intensity={2} angle={0.6} penumbra={1} color="#8B1E3F" />

        {/* 3D Sculptural Core */}
        <SculpturalCore scrollProgress={scrollProgress} mousePos={mousePos} />

        {/* Floating Ambient Particles */}
        <ParticleField />
      </Canvas>
    </div>
  );
};
