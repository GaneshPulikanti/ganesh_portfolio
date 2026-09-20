"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface SculpturalCoreProps {
  scrollProgress: number;
  mousePos: { x: number; y: number };
}

export const SculpturalCore: React.FC<SculpturalCoreProps> = ({
  scrollProgress,
  mousePos,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const sphereRef = useRef<THREE.Mesh>(null);
  const gridWireRef = useRef<THREE.Mesh>(null);
  const innerCoreRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Generate 500 orbital ring dust particles
  const particlesGeometry = useMemo(() => {
    const count = 500;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const color1 = new THREE.Color("#C43859");
    const color2 = new THREE.Color("#F5EBE6");
    const color3 = new THREE.Color("#D4AF37");

    for (let i = 0; i < count; i++) {
      // Disk-like distribution for Saturn ring dust
      const angle = Math.random() * Math.PI * 2;
      const radius = 1.6 + Math.random() * 1.4; // between 1.6 and 3.0
      const spreadY = (Math.random() - 0.5) * 0.15;

      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = spreadY;
      positions[i * 3 + 2] = Math.sin(angle) * radius;

      const randColor = Math.random();
      const mixedColor = randColor < 0.5 ? color1 : randColor < 0.85 ? color2 : color3;
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return geo;
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Smooth Mouse Reactivity (Lerp)
    const targetMouseX = (mousePos.x - 0.5) * 0.5;
    const targetMouseY = (mousePos.y - 0.5) * 0.5;

    // Continuous slow rotation & tilt
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetMouseY + 0.4 + scrollProgress * Math.PI * 0.6,
      delta * 2.0
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetMouseX + state.clock.elapsedTime * 0.12 + scrollProgress * Math.PI * 1.0,
      delta * 2.0
    );

    // Position choreography: Keep model stable & constant in background
    let targetX = 0.7;
    let targetY = 0;
    let targetZ = -0.3;
    let targetScale = 1.35;

    if (scrollProgress < 0.3) {
      targetX = THREE.MathUtils.lerp(0.7, 0.9, scrollProgress / 0.3);
      targetY = THREE.MathUtils.lerp(0, -0.2, scrollProgress / 0.3);
      targetScale = THREE.MathUtils.lerp(1.35, 1.2, scrollProgress / 0.3);
    } else if (scrollProgress < 0.6) {
      const p = (scrollProgress - 0.3) / 0.3;
      targetX = THREE.MathUtils.lerp(0.9, -1.2, p);
      targetY = THREE.MathUtils.lerp(-0.2, 0.3, p);
      targetScale = THREE.MathUtils.lerp(1.2, 0.9, p);
    } else {
      const p = (scrollProgress - 0.6) / 0.4;
      targetX = THREE.MathUtils.lerp(-1.2, 0.4, p);
      targetY = THREE.MathUtils.lerp(0.3, -0.1, p);
      targetScale = THREE.MathUtils.lerp(0.9, 1.3, p);
    }

    groupRef.current.position.x = THREE.MathUtils.lerp(
      groupRef.current.position.x,
      targetX,
      delta * 2.5
    );
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      targetY,
      delta * 2.5
    );
    groupRef.current.position.z = THREE.MathUtils.lerp(
      groupRef.current.position.z,
      targetZ,
      delta * 2.5
    );

    const currentScale = groupRef.current.scale.x;
    const newScale = THREE.MathUtils.lerp(currentScale, targetScale, delta * 2.5);
    groupRef.current.scale.set(newScale, newScale, newScale);

    // Continuous Sub-Rotations
    if (sphereRef.current) {
      sphereRef.current.rotation.y += delta * 0.1;
    }
    if (gridWireRef.current) {
      gridWireRef.current.rotation.y += delta * 0.2;
      gridWireRef.current.rotation.z += delta * 0.05;
    }
    if (innerCoreRef.current) {
      innerCoreRef.current.rotation.y -= delta * 0.4;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.18;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= delta * 0.12;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.z += delta * 0.22;
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={[0.7, 0, -0.3]}>
      {/* Central Dark Obsidian Saturn Body */}
      <mesh ref={sphereRef}>
        <sphereGeometry args={[1.0, 64, 64]} />
        <meshStandardMaterial
          color="#0F080C"
          roughness={0.25}
          metalness={0.9}
        />
      </mesh>

      {/* Surface Glowing Tech Wireframe Lattice */}
      <mesh ref={gridWireRef}>
        <icosahedronGeometry args={[1.04, 3]} />
        <meshPhysicalMaterial
          color="#C43859"
          emissive="#8B1E3F"
          emissiveIntensity={0.5}
          roughness={0.2}
          metalness={0.8}
          wireframe={true}
          transparent={true}
          opacity={0.35}
        />
      </mesh>

      {/* Glowing Energy Core Center */}
      <mesh ref={innerCoreRef}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          color="#F5EBE6"
          emissive="#C43859"
          emissiveIntensity={1.5}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Saturn Orbital Plasma Ring 1 (Main Rose Gold Ring) */}
      <group rotation={[Math.PI / 3.4, Math.PI / 8, 0]}>
        <mesh ref={ring1Ref}>
          <torusGeometry args={[2.1, 0.035, 32, 120]} />
          <meshStandardMaterial
            color="#F5EBE6"
            emissive="#C43859"
            emissiveIntensity={1.2}
            roughness={0.15}
            metalness={0.85}
          />
        </mesh>

        {/* Saturn Orbital Ring 2 (Outer Deep Crimson Ring) */}
        <mesh ref={ring2Ref}>
          <torusGeometry args={[2.5, 0.02, 32, 120]} />
          <meshStandardMaterial
            color="#C43859"
            emissive="#8B1E3F"
            emissiveIntensity={0.8}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>

        {/* Saturn Orbital Ring 3 (Inner Gold Accent Ring) */}
        <mesh ref={ring3Ref}>
          <torusGeometry args={[1.65, 0.025, 32, 120]} />
          <meshStandardMaterial
            color="#D4AF37"
            emissive="#C43859"
            emissiveIntensity={0.9}
            roughness={0.2}
            metalness={0.9}
          />
        </mesh>

        {/* Ring Dust Particle Cloud */}
        <points ref={particlesRef} geometry={particlesGeometry}>
          <pointsMaterial
            size={0.035}
            vertexColors={true}
            transparent={true}
            opacity={0.85}
            blending={THREE.AdditiveBlending}
          />
        </points>
      </group>

      {/* Intense Glowing Core Lights */}
      <pointLight color="#C43859" intensity={6} distance={8} decay={2} />
      <pointLight color="#F5EBE6" intensity={3} distance={5} decay={2} />
    </group>
  );
};

