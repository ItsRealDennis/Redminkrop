'use client';

import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ShaderMaterial, Vector2 } from 'three';
import * as THREE from 'three';
import { EffectComposer, Bloom, Vignette, Noise } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float time;
  uniform vec2 resolution;
  uniform vec2 mouse;
  varying vec2 vUv;
  
  // Noise function
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
  
  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }
  
  void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    st.y = 1.0 - st.y; // flip for canvas coords
    
    // Create flowing multi-scale noise
    float noise1 = snoise(st * 2.0 + time * 0.08);
    float noise2 = snoise(st * 4.5 - time * 0.06 + 100.0);
    float noise3 = snoise(st * 9.0 + time * 0.03 + 200.0);
    
    // Layer and normalize
    float n = noise1 * 0.6 + noise2 * 0.3 + noise3 * 0.2;
    n = smoothstep(-1.0, 1.0, n);
    
    // Mouse influence (converted to 0..1 in JS)
    vec2 mouseInfluence = (mouse - 0.5) * 0.25;
    float mouseField = snoise((st + mouseInfluence) * 2.0 + time * 0.05);
    
    // Radial gradient vignette toward upper third
    vec2 center = vec2(0.5, 0.35 + mouseInfluence.y * 0.2);
    float gradient = 1.0 - smoothstep(0.0, 1.2, length(st - center) * 1.8);
    
    // Combine fields
    float field = gradient * 0.55 + n * 0.45 + mouseField * 0.1;
    field = clamp(field, 0.0, 1.0);
    
    // Palette
    vec3 colorA = vec3(0.04, 0.05, 0.08);      // deep blue-gray
    vec3 colorB = vec3(0.12, 0.15, 0.22);      // ink
    vec3 colorC = vec3(0.85, 0.05, 0.35);      // brand-ish magenta
    
    // Base gradient blend
    vec3 base = mix(colorA, colorB, gradient);
    // Emissive accents from field toward brand hue
    vec3 glow = mix(base, colorC, pow(field, 2.0) * 0.35);
    
    // Final color with subtle lift
    vec3 color = base * 0.8 + glow * 0.5 + vec3(field) * 0.05;
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

function ShaderPlane() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<ShaderMaterial>(null);
  const mappedMouse = new Vector2(0.5, 0.5);
  
  useFrame((state) => {
    if (!materialRef.current || !meshRef.current) return;
    // Map state.mouse (-1..1) to 0..1 for shader
    mappedMouse.set(state.mouse.x * 0.5 + 0.5, state.mouse.y * 0.5 + 0.5);
    materialRef.current.uniforms.time.value = state.clock.elapsedTime;
    materialRef.current.uniforms.mouse.value = mappedMouse;
    materialRef.current.uniforms.resolution.value.set(state.size.width, state.size.height);
    
    // Scale plane to viewport to fully cover screen
    const vw = state.viewport.width;
    const vh = state.viewport.height;
    meshRef.current.scale.set(vw, vh, 1);
  });
  
  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          time: { value: 0 },
          resolution: { value: new THREE.Vector2(1, 1) },
          mouse: { value: new THREE.Vector2(0.5, 0.5) }
        }}
      />
    </mesh>
  );
}

// Starfield removed (reverted)

export default function WebGLBackground() {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  if (isMobile) {
    // Simple gradient fallback for mobile
    return (
      <div 
        className="fixed inset-0 -z-10" 
        style={{ 
          zIndex: -1,
          background: 'linear-gradient(135deg, #0a0a0a 0%, #141414 50%, #0a0a0a 100%)'
        }}
      />
    );
  }
  
  return (
    <div className="fixed inset-0 -z-10" style={{ zIndex: -1 }}>
      <Canvas
        camera={{ position: [0, 0, 1], fov: 50 }}
        gl={{ 
          antialias: false, // Disable antialiasing on mobile
          powerPreference: 'low-power', // Use low power mode for mobile
          alpha: false,
          stencil: false,
          depth: false
        }}
        dpr={[1, 1.5]} // Lower DPR for mobile
      >
        <ShaderPlane />
        <EffectComposer>
          <Bloom intensity={0.3} luminanceThreshold={0.15} luminanceSmoothing={0.5} />
          <Noise premultiply blendFunction={BlendFunction.SCREEN} opacity={0.03} />
          <Vignette eskil={false} offset={0.3} darkness={0.6} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}