'use client';

import { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { TIMELINE_ITEMS, TimelineItem } from '@/components/sections/StoryTimeline';

function Node({ index, item, offsetY }: { index: number; item: TimelineItem; offsetY: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const dotRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.15;
    }
    if (dotRef.current) {
      const s = 1 + Math.sin(t * 2 + index) * 0.05;
      dotRef.current.scale.setScalar(s);
    }
  });

  return (
    <group ref={groupRef} position={[0, offsetY, 0]}>
      {/* Spine connector */}
      <mesh position={[0, -2, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 4, 16]} />
        <meshBasicMaterial color={new THREE.Color('#0ea5e9')} transparent opacity={0.3} />
      </mesh>
      {/* Ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.6, 0.02, 16, 64]} />
        <meshStandardMaterial color={'#14b8a6'} metalness={0.6} roughness={0.2} />
      </mesh>
      {/* Dot */}
      <mesh ref={dotRef} position={[0, 0, 0.02]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshBasicMaterial color={'#06b6d4'} />
      </mesh>
      {/* Year text as simple sprite */}
      <sprite position={[0, 0, 0.04]}>
        <spriteMaterial color={'#ffffff'} />
      </sprite>
    </group>
  );
}

function TimelineScene() {
  const nodes = useMemo(() => TIMELINE_ITEMS.map((item, i) => ({ item, y: -i * 4 })), []);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    // Map scrollY to group position for vertical progression
    const scrollY = window.scrollY || 0;
    const targetY = (scrollY / window.innerHeight) * 4; // adjust speed
    if (groupRef.current) {
      groupRef.current.position.y = targetY;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Spine */}
      <mesh position={[0, -nodes.length * 2, 0]}>
        <cylinderGeometry args={[0.01, 0.01, nodes.length * 4 + 10, 12]} />
        <meshBasicMaterial color={'#475569'} transparent opacity={0.3} />
      </mesh>
      {nodes.map((n, i) => (
        <Node key={n.item.year} index={i} item={n.item} offsetY={n.y} />
      ))}
    </group>
  );
}

export default function Timeline3D() {
  return (
    <div className="relative w-full h-[120vh]">
      <Canvas dpr={[1, 2]} gl={{ antialias: true }}>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={45} />
          <ambientLight intensity={0.4} />
          <directionalLight position={[3, 5, 2]} intensity={0.6} />
          <TimelineScene />
          <EffectComposer>
            <Bloom intensity={0.4} luminanceThreshold={0.2} luminanceSmoothing={0.8} />
            <Vignette eskil={false} offset={0.2} darkness={0.7} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}



