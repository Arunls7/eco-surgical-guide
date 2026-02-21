import { Canvas } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import { Suspense, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface MaterialModelProps {
  category: "metals" | "polymers" | "ceramics";
  co2Level: "low" | "medium" | "high";
  strength: number;
}

const categoryColors: Record<string, string> = {
  metals: "#94a3b8",
  polymers: "#2563eb",
  ceramics: "#f5f0e8",
};

const co2Emissive: Record<string, string> = {
  low: "#22c55e",
  medium: "#eab308",
  high: "#ef4444",
};

function MetalShape({ color, emissive }: { color: string; emissive: string }) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((_, delta) => {
    ref.current.rotation.y += delta * 0.4;
    ref.current.rotation.x += delta * 0.15;
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial
        color={color}
        metalness={0.95}
        roughness={0.05}
        emissive={emissive}
        emissiveIntensity={0.15}
      />
    </mesh>
  );
}

function PolymerShape({ color, emissive }: { color: string; emissive: string }) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((_, delta) => {
    ref.current.rotation.y += delta * 0.5;
    ref.current.rotation.z += delta * 0.2;
  });
  return (
    <mesh ref={ref}>
      <torusKnotGeometry args={[0.6, 0.22, 100, 16]} />
      <meshStandardMaterial
        color={color}
        metalness={0.1}
        roughness={0.6}
        emissive={emissive}
        emissiveIntensity={0.2}
        transparent
        opacity={0.85}
      />
    </mesh>
  );
}

function CeramicShape({ color, emissive }: { color: string; emissive: string }) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((_, delta) => {
    ref.current.rotation.y += delta * 0.3;
    ref.current.rotation.x += delta * 0.1;
  });
  return (
    <mesh ref={ref}>
      <dodecahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color={color}
        metalness={0.3}
        roughness={0.2}
        emissive={emissive}
        emissiveIntensity={0.1}
      />
    </mesh>
  );
}

const MaterialModel = ({ category, co2Level }: MaterialModelProps) => {
  const color = categoryColors[category];
  const emissive = co2Emissive[co2Level];

  return (
    <div className="w-full h-28 rounded-xl overflow-hidden bg-muted/30">
      <Canvas camera={{ position: [0, 0, 3.2], fov: 40 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[3, 3, 5]} intensity={1} />
          <pointLight position={[-3, -2, 2]} intensity={0.4} color="#2563eb" />
          <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
            {category === "metals" && <MetalShape color={color} emissive={emissive} />}
            {category === "polymers" && <PolymerShape color={color} emissive={emissive} />}
            {category === "ceramics" && <CeramicShape color={color} emissive={emissive} />}
          </Float>
          <Environment preset="studio" />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default MaterialModel;
