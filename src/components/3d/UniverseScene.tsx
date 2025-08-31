'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars, OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';
import PremiumPlanet from './PremiumPlanet';
import { CompanySize } from '@/data/tilbudData';

interface UniverseSceneProps {
  onPlanetClick: (size: CompanySize) => void;
}

export default function UniverseScene({ onPlanetClick }: UniverseSceneProps) {
  return (
    <div className="w-full h-full">
      <Canvas
        dpr={[1, 2]}
        gl={{ 
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1,
        }}
      >
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
          <OrbitControls 
            enablePan={false} 
            enableZoom={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
            autoRotate
            autoRotateSpeed={0.5}
          />
          
          {/* Lighting setup */}
          <ambientLight intensity={0.1} />
          <directionalLight
            position={[5, 5, 5]}
            intensity={0.5}
            castShadow
            shadow-mapSize={[2048, 2048]}
          />
          <pointLight position={[-5, -5, -5]} intensity={0.3} color="#8b5cf6" />
          <pointLight position={[5, -5, 5]} intensity={0.3} color="#3b82f6" />
          
          {/* Environment for reflections */}
          <Environment preset="city" />
          
          {/* Stars background */}
          <Stars 
            radius={50} 
            depth={50} 
            count={3000} 
            factor={4} 
            saturation={0} 
            fade 
            speed={0.5} 
          />
          
          {/* Planets */}
          <PremiumPlanet
            position={[-4, 0, 0]}
            size="small"
            onClick={() => onPlanetClick('small')}
          />
          
          <PremiumPlanet
            position={[0, 0, 0]}
            size="medium"
            onClick={() => onPlanetClick('medium')}
          />
          
          <PremiumPlanet
            position={[4, 0, 0]}
            size="large"
            onClick={() => onPlanetClick('large')}
          />
          
          {/* Post-processing effects */}
          <EffectComposer>
            <Bloom 
              intensity={1.5}
              luminanceThreshold={0.2}
              luminanceSmoothing={0.9}
              mipmapBlur
            />
            <ChromaticAberration
              blendFunction={BlendFunction.NORMAL}
              offset={[0.0005, 0.0005]}
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}