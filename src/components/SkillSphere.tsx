"use client";

import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, TrackballControls, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

const skills = [
  "HTML5", "CSS3", "JavaScript", "React.js", "Next.js", "Flutter", "Linux",
  "Ms Office", "C/C++", "PHP", "WordPress", "Python", "Photoshop",
  "Django", "Java", "SEO", "Strategy", "UI/UX", "Middlesex", "Digital Marketing",
  "Tailwind", "Framer Motion", "Three.js", "PostgreSQL", "Node.js"
];

function Word({ children, ...props }: any) {
  const color = new THREE.Color();
  const fontProps = { 
    fontSize: 2.5, 
    letterSpacing: -0.05, 
    lineHeight: 1, 
    'material-toneMapped': false 
  };
  const ref = useRef<any>(null);
  const [hovered, setHovered] = useState(false);
  const over = (e: any) => (e.stopPropagation(), setHovered(true));
  const out = () => setHovered(false);
  
  useFrame(({ camera }) => {
    if (!ref.current) return;
    // Make text face the camera (Billboarding)
    ref.current.quaternion.copy(camera.quaternion);
    // Animate color and scale on hover
    const targetColor = hovered ? '#f0abfc' : '#22d3ee'; // Fuchsia vs Cyan
    ref.current.material.color.lerp(color.set(targetColor), 0.1);
    
    const targetScale = hovered ? 1.4 : 1;
    ref.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
  });

  return (
    <Text 
      ref={ref} 
      onPointerOver={over} 
      onPointerOut={out} 
      {...props} 
      {...fontProps}
    >
      {children}
    </Text>
  );
}

function Cloud({ radius = 20 }) {
  // Create a sphere of words
  const words = useMemo(() => {
    const temp = [];
    const spherical = new THREE.Spherical();
    
    for (let i = 0; i < skills.length; i++) {
        // Distribute words across the sphere using Fibonacci mapping for even spacing
        const phi = Math.acos(-1 + (2 * i) / skills.length);
        const theta = Math.sqrt(skills.length * Math.PI) * phi;
        const pos = new THREE.Vector3().setFromSphericalCoords(radius, phi, theta);
        temp.push([pos, skills[i]]);
    }
    return temp;
  }, [radius]);

  const groupRef = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
      groupRef.current.rotation.x += delta * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      {words.map(([pos, word], index) => (
        <Word key={index} position={pos}>
          {word as string}
        </Word>
      ))}
    </group>
  );
}

export default function SkillSphere() {
  return (
    <div className="w-full h-[500px] md:h-[700px] relative overflow-hidden">
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 45], fov: 65 }}>
        <PerspectiveCamera makeDefault position={[0, 0, 45]} fov={65} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#22d3ee" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#f0abfc" />
        
        <Cloud radius={22} />
        
        <TrackballControls 
          noPan 
          noZoom 
          rotateSpeed={4} 
          staticMoving={false}
          dynamicDampingFactor={0.1}
        />
        
        {/* Subtle background fog to blend with the obsidian background */}
        <fog attach="fog" args={['#09090b', 20, 90]} />
      </Canvas>
      
      {/* Interaction Hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none">
        <span className="text-cyan-500/40 font-mono text-[9px] uppercase tracking-[0.3em]">
          Drag to Rotate • Click to Focus
        </span>
      </div>
    </div>
  );
}
