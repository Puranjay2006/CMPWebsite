import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface ThreeCanvasProps {
  mousePosition: { x: number; y: number };
}

const Starfield = ({ mousePosition }: ThreeCanvasProps) => {
  const ref = useRef<THREE.Points>(null!);
  const { innerWidth, innerHeight } = window;

  const { positions, colors } = useMemo(() => {
    const count = 4000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      // Positions
      positions[i * 3] = (Math.random() - 0.5) * 25;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 25;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 25;

      // Colors: Mix of Cyan (#22d3ee) and Violet (#8b5cf6)
      // Cyan RGB: 0.13, 0.83, 0.93
      // Violet RGB: 0.54, 0.36, 0.96
      const isCyan = Math.random() > 0.5;
      if (isCyan) {
          colors[i * 3] = 0.13;
          colors[i * 3 + 1] = 0.83;
          colors[i * 3 + 2] = 0.93;
      } else {
          colors[i * 3] = 0.54;
          colors[i * 3 + 1] = 0.36;
          colors[i * 3 + 2] = 0.96;
      }
    }
    return { positions, colors };
  }, []);

  useFrame((state, delta) => {
    if (!ref.current) return;
    
    // Subtle rotation
    ref.current.rotation.x -= delta / 50;
    ref.current.rotation.y -= delta / 60;
    
    // Mouse parallax effect - Smooth damping
    const targetX = (mousePosition.x / innerWidth - 0.5) * 1;
    const targetY = -(mousePosition.y / innerHeight - 0.5) * 1;

    // Apply soft parallax to camera for immersion
    state.camera.position.x += (targetX - state.camera.position.x) * 0.05;
    state.camera.position.y += (targetY - state.camera.position.y) * 0.05;
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <Points ref={ref} positions={positions} colors={colors} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        vertexColors
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

const ThreeCanvas: React.FC<ThreeCanvasProps> = ({ mousePosition }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none">
      {/* Added pointer-events-none so it doesn't block scroll interaction */}
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }} dpr={[1, 2]}>
        <Starfield mousePosition={mousePosition} />
      </Canvas>
    </div>
  );
};

export default ThreeCanvas;