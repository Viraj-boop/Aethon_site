import { Canvas } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, Float } from '@react-three/drei';

function AbstractShape() {
  return (
    <Float speed={2} rotationIntensity={2} floatIntensity={2}>
      <Sphere args={[1, 64, 64]} scale={1.5}>
        <MeshDistortMaterial 
          color="#333333" 
          attach="material" 
          distort={0.6} 
          speed={2} 
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
}

export default function Scene() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-80">
      <Canvas camera={{ position: [0, 0, 3] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={2} />
        <directionalLight position={[-10, -10, -5]} intensity={1} color="#ffffff" />
        <AbstractShape />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-bg/40 via-transparent to-bg" />
      <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-bg via-bg/80 to-transparent" />
    </div>
  );
}
