import React, { useRef, Component, ErrorInfo, ReactNode } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Html, useTexture, OrbitControls } from '@react-three/drei';
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
    console.error("Globe Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

function Earth() {
  const group = useRef<THREE.Group>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (group.current) group.current.rotation.y += 0.001;
    if (cloudsRef.current) cloudsRef.current.rotation.y += 0.0012;
  });

  const [colorMap, normalMap, specularMap, cloudsMap] = useTexture([
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg',
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg',
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg',
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png'
  ]);

  const getPos = (lat: number, lon: number, radius: number) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const z = (radius * Math.sin(phi) * Math.sin(theta));
    const y = (radius * Math.cos(phi));
    return new THREE.Vector3(x, y, z);
  };

  const markers = [
    { name: 'USA', pos: getPos(37.0902, -95.7129, 2.05) },
    { name: 'Dubai', pos: getPos(25.2048, 55.2708, 2.05) },
    { name: 'India', pos: getPos(20.5937, 78.9629, 2.05) },
  ];

  return (
    <group ref={group} rotation={[0.2, 0, 0]}>
      <Sphere args={[2, 64, 64]}>
        <meshPhongMaterial 
          map={colorMap}
          normalMap={normalMap}
          specularMap={specularMap}
          shininess={15}
        />
      </Sphere>
      <Sphere ref={cloudsRef} args={[2.02, 64, 64]}>
        <meshPhongMaterial 
          map={cloudsMap}
          transparent={true}
          opacity={0.4}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </Sphere>
      {markers.map((m, i) => (
        <mesh key={i} position={m.pos}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshBasicMaterial color="#c4a277" />
          <Html distanceFactor={15}>
            <div className="text-[#c4a277] text-xs font-mono bg-[#1c1b19]/80 px-2 py-1 rounded whitespace-nowrap border border-[#c4a277]/30 backdrop-blur-sm cursor-pointer hover:bg-[#c4a277] hover:text-[#1c1b19] transition-colors">
              <div className="w-2 h-2 bg-current rounded-full inline-block mr-2 animate-pulse" />
              {m.name}
            </div>
          </Html>
        </mesh>
      ))}
    </group>
  );
}

export default function Globe() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-auto cursor-move">
      <ErrorBoundary fallback={<div className="w-full h-full flex items-center justify-center text-[#c4a277] font-mono text-sm">3D Scene Failed to Load</div>}>
        <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
          <ambientLight intensity={0.2} color="#ffffff" />
          <directionalLight position={[5, 3, 5]} intensity={1.5} color="#ffffff" />
          <React.Suspense fallback={null}>
            <Earth />
          </React.Suspense>
          <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.5} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </ErrorBoundary>
      <div className="absolute inset-0 bg-gradient-to-b from-[#1c1b19]/40 via-transparent to-[#1c1b19] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-[#1c1b19] via-[#1c1b19]/80 to-transparent pointer-events-none" />
    </div>
  );
}
