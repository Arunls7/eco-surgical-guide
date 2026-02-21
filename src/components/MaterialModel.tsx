import { Canvas } from "@react-three/fiber";
import { Float, Environment, MeshDistortMaterial, MeshWobbleMaterial } from "@react-three/drei";
import { Suspense, useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface MaterialModelProps {
  category: "metals" | "polymers" | "ceramics";
  co2Level: "low" | "medium" | "high";
  strength: number;
  name: string;
}

/* ── helpers ── */
function AutoRotate({ children, speed = 0.3 }: { children: React.ReactNode; speed?: number }) {
  const ref = useRef<THREE.Group>(null!);
  useFrame((_, dt) => {
    ref.current.rotation.y += dt * speed;
  });
  return <group ref={ref}>{children}</group>;
}

/* ── Metal: Surgical Screw ── */
function ScrewShape({ color, roughness = 0.08 }: { color: string; roughness?: number }) {
  const points = useMemo(() => {
    const pts: THREE.Vector2[] = [];
    const segments = 40;
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const r = 0.22 + Math.sin(t * Math.PI * 12) * 0.04 * (1 - t * 0.5);
      pts.push(new THREE.Vector2(r, t * 2.2 - 1.1));
    }
    // Tip
    pts.push(new THREE.Vector2(0.02, -1.15));
    // Head
    pts.unshift(new THREE.Vector2(0.35, 1.15));
    pts.unshift(new THREE.Vector2(0.35, 1.3));
    pts.unshift(new THREE.Vector2(0.0, 1.3));
    return pts;
  }, []);

  return (
    <mesh rotation={[0.3, 0, 0.2]}>
      <latheGeometry args={[points, 32]} />
      <meshStandardMaterial color={color} metalness={0.95} roughness={roughness} envMapIntensity={1.2} />
    </mesh>
  );
}

/* ── Metal: Bone Plate ── */
function BonePlate({ color }: { color: string }) {
  return (
    <group rotation={[0.4, 0.2, 0]}>
      {/* Main plate */}
      <mesh>
        <boxGeometry args={[0.5, 2, 0.12]} />
        <meshStandardMaterial color={color} metalness={0.92} roughness={0.1} />
      </mesh>
      {/* Screw holes */}
      {[-0.6, -0.2, 0.2, 0.6].map((y) => (
        <mesh key={y} position={[0, y, 0.07]}>
          <cylinderGeometry args={[0.08, 0.08, 0.05, 16]} />
          <meshStandardMaterial color="#1a1a2e" metalness={0.5} roughness={0.8} />
        </mesh>
      ))}
    </group>
  );
}

/* ── Metal: Wire/Stent ── */
function StentShape({ color }: { color: string }) {
  const curve = useMemo(() => {
    const points: THREE.Vector3[] = [];
    for (let i = 0; i <= 100; i++) {
      const t = (i / 100) * Math.PI * 4;
      points.push(new THREE.Vector3(Math.cos(t) * 0.5, (i / 100) * 2 - 1, Math.sin(t) * 0.5));
    }
    return new THREE.CatmullRomCurve3(points);
  }, []);

  return (
    <mesh rotation={[0.3, 0, 0]}>
      <tubeGeometry args={[curve, 80, 0.05, 8, false]} />
      <meshStandardMaterial color={color} metalness={0.9} roughness={0.15} />
    </mesh>
  );
}

/* ── Metal: Hip Joint Ball ── */
function JointBall({ color }: { color: string }) {
  return (
    <group rotation={[0.2, 0, 0.1]}>
      <mesh position={[0, 0.3, 0]}>
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshStandardMaterial color={color} metalness={0.95} roughness={0.05} envMapIntensity={1.5} />
      </mesh>
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.18, 0.12, 1, 16]} />
        <meshStandardMaterial color={color} metalness={0.95} roughness={0.08} />
      </mesh>
    </group>
  );
}

/* ── Metal: Needle shape ── */
function NeedleShape({ color }: { color: string }) {
  const curve = useMemo(() => {
    const points: THREE.Vector3[] = [];
    for (let i = 0; i <= 50; i++) {
      const t = (i / 50) * Math.PI * 0.8;
      points.push(new THREE.Vector3(Math.cos(t) * 0.8, Math.sin(t) * 0.8, 0));
    }
    return new THREE.CatmullRomCurve3(points);
  }, []);

  return (
    <mesh rotation={[0, 0, -0.5]}>
      <tubeGeometry args={[curve, 40, 0.04, 8, false]} />
      <meshStandardMaterial color={color} metalness={0.95} roughness={0.05} />
    </mesh>
  );
}

/* ── Polymer: Soft implant ── */
function SoftImplant({ color }: { color: string }) {
  return (
    <mesh>
      <sphereGeometry args={[0.8, 32, 32]} />
      <MeshDistortMaterial color={color} speed={2} distort={0.3} roughness={0.6} metalness={0.05} transparent opacity={0.85} />
    </mesh>
  );
}

/* ── Polymer: Tube/Catheter ── */
function TubeShape({ color }: { color: string }) {
  const curve = useMemo(() => {
    const points: THREE.Vector3[] = [];
    for (let i = 0; i <= 50; i++) {
      const t = i / 50;
      points.push(new THREE.Vector3(Math.sin(t * Math.PI * 2) * 0.3, t * 2.2 - 1.1, Math.cos(t * Math.PI) * 0.2));
    }
    return new THREE.CatmullRomCurve3(points);
  }, []);

  return (
    <mesh>
      <tubeGeometry args={[curve, 40, 0.12, 12, false]} />
      <meshStandardMaterial color={color} metalness={0.0} roughness={0.7} transparent opacity={0.8} side={THREE.DoubleSide} />
    </mesh>
  );
}

/* ── Polymer: Mesh/Fabric ── */
function MeshFabric({ color }: { color: string }) {
  return (
    <mesh rotation={[0.5, 0, 0]}>
      <planeGeometry args={[1.8, 1.8, 12, 12]} />
      <MeshWobbleMaterial color={color} factor={0.4} speed={1.5} roughness={0.8} metalness={0} side={THREE.DoubleSide} transparent opacity={0.75} />
    </mesh>
  );
}

/* ── Polymer: Fiber bundle ── */
function FiberBundle({ color }: { color: string }) {
  const fibers = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const angle = (i / 7) * Math.PI * 2;
      const r = i === 0 ? 0 : 0.18;
      const points: THREE.Vector3[] = [];
      for (let j = 0; j <= 30; j++) {
        const t = j / 30;
        const twist = t * Math.PI * 2;
        points.push(
          new THREE.Vector3(
            Math.cos(angle + twist) * r,
            t * 2 - 1,
            Math.sin(angle + twist) * r
          )
        );
      }
      return new THREE.CatmullRomCurve3(points);
    });
  }, []);

  return (
    <group rotation={[0.3, 0, 0.1]}>
      {fibers.map((curve, i) => (
        <mesh key={i}>
          <tubeGeometry args={[curve, 20, 0.04, 6, false]} />
          <meshStandardMaterial color={color} roughness={0.7} metalness={0} transparent opacity={0.9} />
        </mesh>
      ))}
    </group>
  );
}

/* ── Ceramic: Crystal/Faceted ── */
function CrystalShape({ color }: { color: string }) {
  return (
    <group rotation={[0.2, 0.4, 0.1]}>
      <mesh position={[0, 0.2, 0]}>
        <octahedronGeometry args={[0.7, 0]} />
        <meshPhysicalMaterial
          color={color} metalness={0.2} roughness={0.05}
          transmission={0.3} thickness={1} ior={2.4}
          clearcoat={1} clearcoatRoughness={0.05}
        />
      </mesh>
    </group>
  );
}

/* ── Ceramic: Dental Crown ── */
function CrownShape({ color }: { color: string }) {
  const points = useMemo(() => {
    const pts: THREE.Vector2[] = [];
    pts.push(new THREE.Vector2(0, -0.6));
    pts.push(new THREE.Vector2(0.35, -0.55));
    pts.push(new THREE.Vector2(0.45, -0.3));
    pts.push(new THREE.Vector2(0.48, 0));
    pts.push(new THREE.Vector2(0.44, 0.25));
    pts.push(new THREE.Vector2(0.35, 0.45));
    pts.push(new THREE.Vector2(0.2, 0.55));
    pts.push(new THREE.Vector2(0, 0.58));
    return pts;
  }, []);

  return (
    <mesh rotation={[0.3, 0, 0]}>
      <latheGeometry args={[points, 24]} />
      <meshPhysicalMaterial
        color={color} metalness={0.1} roughness={0.15}
        clearcoat={0.8} clearcoatRoughness={0.1}
      />
    </mesh>
  );
}

/* ── Ceramic: Granules/Powder ── */
function GranulesShape({ color }: { color: string }) {
  const positions = useMemo(() => {
    const pos: [number, number, number][] = [];
    for (let i = 0; i < 30; i++) {
      pos.push([
        (Math.random() - 0.5) * 1.4,
        (Math.random() - 0.5) * 1.4,
        (Math.random() - 0.5) * 0.8,
      ]);
    }
    return pos;
  }, []);

  return (
    <group>
      {positions.map((pos, i) => (
        <mesh key={i} position={pos} rotation={[Math.random() * 3, Math.random() * 3, 0]}>
          <dodecahedronGeometry args={[0.1 + Math.random() * 0.08, 0]} />
          <meshPhysicalMaterial
            color={color} metalness={0.15} roughness={0.25}
            clearcoat={0.5}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ── Ceramic: Flat disc ── */
function DiscShape({ color }: { color: string }) {
  return (
    <group rotation={[0.6, 0.2, 0]}>
      <mesh>
        <cylinderGeometry args={[0.75, 0.75, 0.15, 32]} />
        <meshPhysicalMaterial
          color={color} metalness={0.1} roughness={0.1}
          clearcoat={1} clearcoatRoughness={0.05}
        />
      </mesh>
    </group>
  );
}

/* ── Material ↔ Shape mapping ── */
const materialConfig: Record<string, { Shape: React.FC<{ color: string }>; color: string; speed?: number }> = {
  // Metals
  "Titanium Grade 5":    { Shape: ScrewShape,  color: "#b0b8c8", speed: 0.25 },
  "Stainless Steel 316L":{ Shape: BonePlate,    color: "#c0c5ce", speed: 0.3 },
  "Cobalt-Chrome":       { Shape: JointBall,    color: "#8e99a4", speed: 0.2 },
  "Magnesium AZ91":      { Shape: NeedleShape,  color: "#a8b5a0", speed: 0.35 },
  "Tantalum":            { Shape: StentShape,   color: "#7a8594", speed: 0.2 },
  "Niobium":             { Shape: ScrewShape,   color: "#9aa3b0", speed: 0.3 },
  "NiTi Alloy":          { Shape: StentShape,   color: "#a0a8b8", speed: 0.25 },
  "Platinum-Iridium":    { Shape: NeedleShape,  color: "#d4d4d8", speed: 0.2 },
  // Polymers
  "PEEK":                { Shape: TubeShape,    color: "#c9a96e", speed: 0.35 },
  "UHMW Polyethylene":   { Shape: SoftImplant,  color: "#e8e4da", speed: 0.3 },
  "PMMA":                { Shape: CrystalShape, color: "#d4e7f5", speed: 0.25 },
  "Medical Silicone":    { Shape: SoftImplant,  color: "#e0d4cc", speed: 0.4 },
  "Surgical PLA":        { Shape: FiberBundle,  color: "#b8d4a8", speed: 0.3 },
  "PGA":                 { Shape: FiberBundle,  color: "#a8c8b8", speed: 0.35 },
  "ePTFE":               { Shape: MeshFabric,   color: "#f0ede8", speed: 0.3 },
  "PCL":                 { Shape: TubeShape,    color: "#c8d8c0", speed: 0.3 },
  "Chitosan":            { Shape: GranulesShape,color: "#d4c8a0", speed: 0.25 },
  "Bovine Collagen":     { Shape: MeshFabric,   color: "#f0e8d8", speed: 0.2 },
  "Polyurethane":        { Shape: TubeShape,    color: "#b8c0d0", speed: 0.3 },
  // Ceramics
  "Zirconia":            { Shape: CrownShape,   color: "#f5f0e8", speed: 0.2 },
  "Alumina":             { Shape: CrystalShape, color: "#e8e0d4", speed: 0.2 },
  "Hydroxyapatite":      { Shape: GranulesShape,color: "#f0e8d0", speed: 0.25 },
  "Bioglass 45S5":       { Shape: DiscShape,    color: "#c8d8c8", speed: 0.3 },
  "Pyrolytic Carbon":    { Shape: DiscShape,    color: "#3a3a3a", speed: 0.2 },
  "TCP β":               { Shape: GranulesShape,color: "#f0e4d4", speed: 0.25 },
};

const MaterialModel = ({ name, category, co2Level, strength }: MaterialModelProps) => {
  const config = materialConfig[name];

  // Fallback
  if (!config) {
    return (
      <div className="w-full h-32 rounded-xl overflow-hidden bg-muted/30 flex items-center justify-center">
        <span className="text-xs text-muted-foreground">3D</span>
      </div>
    );
  }

  const { Shape, color, speed } = config;

  return (
    <div className="w-full h-32 rounded-xl overflow-hidden bg-gradient-to-b from-muted/20 to-muted/40">
      <Canvas camera={{ position: [0, 0, 3.5], fov: 35 }} dpr={[1, 1.5]}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow />
          <directionalLight position={[-3, 2, -2]} intensity={0.3} color="#e0f0ff" />
          <pointLight position={[0, -2, 3]} intensity={0.3} color="#2563eb" />
          <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.4}>
            <AutoRotate speed={speed ?? 0.3}>
              <Shape color={color} />
            </AutoRotate>
          </Float>
          <Environment preset="studio" />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default MaterialModel;
