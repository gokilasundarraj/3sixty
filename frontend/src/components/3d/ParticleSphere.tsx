import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function SphereParticles({ count = 1200 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseRef.current.targetX = (e.clientX / innerWidth - 0.5) * 2;
      mouseRef.current.targetY = -(e.clientY / innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    // Rose-copper palette
    const copperColors = [
      new THREE.Color('#ffc7a6'),
      new THREE.Color('#f0a07a'),
      new THREE.Color('#c8714d'),
      new THREE.Color('#e08a63'),
      new THREE.Color('#ffe2d1'),
    ];

    const radius = 2.4;

    for (let i = 0; i < count; i++) {
      // Golden spiral distribution on sphere
      const phi = Math.acos(1 - 2 * (i + 0.5) / count);
      const theta = Math.PI * (1 + 5 ** 0.5) * i;

      const r = radius + (Math.random() - 0.5) * 0.35;
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      const c = copperColors[Math.floor(Math.random() * copperColors.length)];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }

    return [pos, col];
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    // Smooth mouse lerp
    mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
    mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

    pointsRef.current.rotation.y += delta * 0.12 + mouseRef.current.x * 0.005;
    pointsRef.current.rotation.x = mouseRef.current.y * 0.25;
    pointsRef.current.rotation.z += delta * 0.04;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.038}
        vertexColors
        transparent
        opacity={0.88}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export const ParticleSphereBackground: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 4.6], fov: 60 }}
        gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.4} />
        <SphereParticles count={900} />
      </Canvas>
    </div>
  );
};
