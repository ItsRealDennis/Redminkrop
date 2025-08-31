'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Float } from '@react-three/drei';
import * as THREE from 'three';

interface PlanetProps {
  position: [number, number, number];
  size: number;
  color: string;
  emissive?: string;
  onClick: () => void;
}

export default function Planet({ position, size, color, emissive, onClick }: PlanetProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const hovered = useRef(false);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
      
      // Scale on hover
      const targetScale = hovered.current ? 1.2 : 1;
      meshRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.1
      );
    }
  });

  return (
    <Float
      speed={2}
      rotationIntensity={0.5}
      floatIntensity={0.5}
    >
      <mesh
        ref={meshRef}
        position={position}
        onClick={onClick}
        onPointerOver={() => {
          hovered.current = true;
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          hovered.current = false;
          document.body.style.cursor = 'auto';
        }}
      >
        <Sphere args={[size, 32, 32]}>
          <meshStandardMaterial
            color={color}
            emissive={emissive || color}
            emissiveIntensity={0.5}
            roughness={0.3}
            metalness={0.8}
          />
        </Sphere>
      </mesh>
    </Float>
  );
}