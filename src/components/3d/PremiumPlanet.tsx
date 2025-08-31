'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Float, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';

interface PremiumPlanetProps {
  position: [number, number, number];
  onClick: () => void;
  size?: 'small' | 'medium' | 'large';
}

export default function PremiumPlanet({ position, onClick, size = 'medium' }: PremiumPlanetProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const rimLightRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const hovered = useRef(false);
  
  // Size configuration
  const sizeConfig = {
    small: { scale: 0.8, label: 'Under 100', color: '#10b981' },
    medium: { scale: 1.2, label: '100-500', color: '#3b82f6' },
    large: { scale: 1.6, label: '500+', color: '#8b5cf6' },
  };
  
  const config = sizeConfig[size];
  
  // Custom shader for rim lighting
  const rimLightMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        color: { value: new THREE.Color(config.color) },
        rimPower: { value: 2.0 },
        intensity: { value: 0.6 },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        uniform float rimPower;
        uniform float intensity;
        varying vec3 vNormal;
        varying vec3 vPosition;
        
        void main() {
          vec3 viewDir = normalize(-vPosition);
          float rim = 1.0 - max(0.0, dot(viewDir, vNormal));
          rim = pow(rim, rimPower) * intensity;
          gl_FragColor = vec4(color * rim, rim);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
    });
  }, [config.color]);
  
  // Animation frame
  useFrame((state, delta) => {
    if (meshRef.current) {
      // Gentle rotation
      meshRef.current.rotation.y += delta * 0.1;
      
      // Hover scale with micro-bounce
      const targetScale = hovered.current ? config.scale * 1.1 : config.scale;
      meshRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.1
      );
    }
    
    // Animate rim light intensity
    if (rimLightRef.current && rimLightMaterial.uniforms) {
      const targetIntensity = hovered.current ? 1.2 : 0.6;
      rimLightMaterial.uniforms.intensity.value = THREE.MathUtils.lerp(
        rimLightMaterial.uniforms.intensity.value,
        targetIntensity,
        0.1
      );
    }
    
    // Glow pulse
    if (glowRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.1 + 1;
      glowRef.current.scale.setScalar(config.scale * 1.3 * pulse);
    }
  });
  
  const handlePointerOver = () => {
    hovered.current = true;
    document.body.style.cursor = 'pointer';
    
    // Micro-bounce animation
    if (meshRef.current) {
      gsap.to(meshRef.current.scale, {
        x: config.scale * 1.15,
        y: config.scale * 1.15,
        z: config.scale * 1.15,
        duration: 0.2,
        ease: 'back.out(4)',
        yoyo: true,
        repeat: 1,
      });
    }
  };
  
  const handlePointerOut = () => {
    hovered.current = false;
    document.body.style.cursor = 'auto';
  };
  
  return (
    <Float
      speed={1.5}
      rotationIntensity={0.3}
      floatIntensity={0.5}
      floatingRange={[-0.1, 0.1]}
    >
      <group position={position}>
        {/* Glow effect */}
        <mesh ref={glowRef} scale={config.scale * 1.3}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial
            color={config.color}
            transparent
            opacity={0.05}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
        
        {/* Main planet */}
        <mesh
          ref={meshRef}
          onClick={onClick}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
          scale={config.scale}
        >
          <sphereGeometry args={[1, 64, 64]} />
          <meshPhysicalMaterial
            color={config.color}
            roughness={0.2}
            metalness={0.8}
            clearcoat={1}
            clearcoatRoughness={0.1}
            reflectivity={1}
            envMapIntensity={1}
            emissive={config.color}
            emissiveIntensity={hovered.current ? 0.3 : 0.1}
          />
        </mesh>
        
        {/* Rim light */}
        <mesh ref={rimLightRef} scale={config.scale * 1.05}>
          <sphereGeometry args={[1, 64, 64]} />
          <primitive object={rimLightMaterial} />
        </mesh>
        
        {/* Label on hover */}
        {hovered.current && (
          <group position={[0, -config.scale - 0.5, 0]}>
            <mesh>
              <planeGeometry args={[2, 0.5]} />
              <meshBasicMaterial color="black" opacity={0.8} transparent />
            </mesh>
          </group>
        )}
      </group>
    </Float>
  );
}