import { useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";

function RotatingMesh({ shapeType = "torusknot" }) {
  const meshRef = useRef();
  const [hovered, setHover] = useState(false);
  const [clicked, setClick] = useState(false);

  // Animate rotation on every frame
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(time / 4) * 0.4;
      meshRef.current.rotation.y = time / 2.5;
      meshRef.current.rotation.z = Math.cos(time / 5) * 0.2;
    }
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHover(true);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHover(false);
      }}
      onClick={(e) => {
        e.stopPropagation();
        setClick(!clicked);
      }}
      scale={hovered ? 1.25 : 1.1}
      style={{ cursor: "pointer" }}
    >
      {shapeType === "torusknot" && (
        <torusKnotGeometry args={[0.8, 0.25, 120, 16]} />
      )}
      {shapeType === "dodecahedron" && (
        <dodecahedronGeometry args={[1.0]} />
      )}
      {shapeType === "icosahedron" && (
        <icosahedronGeometry args={[1.0]} />
      )}
      {shapeType === "sphere" && (
        <sphereGeometry args={[1.0, 32, 32]} />
      )}

      <meshStandardMaterial
        color={hovered ? "#ff007f" : clicked ? "#00f2fe" : "#9b51e0"}
        wireframe={!hovered}
        roughness={0.15}
        metalness={0.85}
        emissive={hovered ? "#330018" : "#1a0033"}
        emissiveIntensity={1.2}
      />
    </mesh>
  );
}

export default function Canvas3D({ shape = "torusknot" }) {
  return (
    <div style={{ width: "100%", height: "100%", minHeight: "280px", position: "relative", zIndex: 5 }}>
      <Suspense fallback={
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", color: "var(--text-secondary)", fontSize: "0.9rem", fontFamily: "var(--font-mono)" }}>
          Loading 3D Core...
        </div>
      }>
        <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 8, 5]} intensity={1.5} />
          <pointLight position={[-5, -5, -5]} intensity={0.8} />
          <Float speed={2} rotationIntensity={1.2} floatIntensity={1.5}>
            <RotatingMesh shapeType={shape} />
          </Float>
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      </Suspense>
    </div>
  );
}
