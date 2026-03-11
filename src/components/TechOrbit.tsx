import React, { useRef, Component, ErrorInfo, ReactNode } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, OrbitControls, Billboard, Html } from '@react-three/drei';
import * as THREE from 'three';

class ErrorBoundary extends Component<{children: ReactNode, fallback: ReactNode}, {hasError: boolean}> {
  constructor(props: {children: ReactNode, fallback: ReactNode}) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("TechOrbit Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

const TechItem = ({ text, radius, speed, offset, yPos }: { text: string, radius: number, speed: number, offset: number, yPos: number }) => {
  const ref = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime() * speed + offset;
      ref.current.position.x = Math.cos(t) * radius;
      ref.current.position.z = Math.sin(t) * radius;
      ref.current.rotation.y = -t + Math.PI / 2; // Always face outward or inward
    }
  });

  return (
    <group ref={ref} position={[0, yPos, 0]}>
      <Billboard>
        <Text
          fontSize={0.5}
          color="#c4a277"
          anchorX="center"
          anchorY="middle"
        >
          {text}
        </Text>
      </Billboard>
    </group>
  );
};

export default function TechOrbit() {
  const techs = [
    { text: 'React', radius: 3, speed: 0.5, yPos: 0 },
    { text: 'Next.js', radius: 4, speed: 0.4, yPos: 1 },
    { text: 'AWS', radius: 2.5, speed: 0.6, yPos: -1 },
    { text: 'Node.js', radius: 4.5, speed: 0.3, yPos: -0.5 },
    { text: 'Tailwind', radius: 3.5, speed: 0.45, yPos: 0.5 },
    { text: 'TypeScript', radius: 5, speed: 0.25, yPos: 0 },
    { text: 'Three.js', radius: 3.8, speed: 0.35, yPos: -1.2 },
  ];

  return (
    <div className="w-full h-[60vh] md:h-[80vh] relative bg-[#171614] rounded-2xl overflow-hidden border border-[#c4a277]/10 shadow-2xl cursor-move">
      <ErrorBoundary fallback={<div className="w-full h-full flex items-center justify-center text-[#c4a277] font-mono text-sm">3D Scene Failed to Load</div>}>
        <Canvas camera={{ position: [0, 2, 8], fov: 50 }}>
          <React.Suspense fallback={<Html center><div className="w-4 h-4 border-2 border-[#c4a277] border-t-transparent rounded-full animate-spin" /></Html>}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#c4a277" />
            
            {/* Core */}
            <mesh>
              <sphereGeometry args={[1, 32, 32]} />
              <meshStandardMaterial color="#1c1b19" emissive="#c4a277" emissiveIntensity={0.2} wireframe />
            </mesh>
            
            <Text
              position={[0, 0, 1.2]}
              fontSize={0.4}
              color="#e6e2d3"
            >
              AETHON CORE
            </Text>

            {techs.map((tech, i) => (
              <TechItem key={i} {...tech} offset={i * (Math.PI * 2) / techs.length} />
            ))}
            
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
          </React.Suspense>
        </Canvas>
      </ErrorBoundary>
      <div className="absolute top-4 left-4 bg-[#1c1b19]/80 backdrop-blur text-[#c4a277] text-[10px] font-mono px-2 py-1 rounded border border-[#c4a277]/30">
        INTERACTIVE: DRAG TO ROTATE
      </div>
    </div>
  );
}
