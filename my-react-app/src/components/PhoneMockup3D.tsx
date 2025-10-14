import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, RoundedBox, Environment } from '@react-three/drei';
import * as THREE from 'three';

interface Phone3DProps {
  image: string;
  isHovered: boolean;
}

function Phone3D({ image, isHovered }: Phone3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  // Load texture
  useState(() => {
    const loader = new THREE.TextureLoader();
    loader.load(image, (loadedTexture) => {
      setTexture(loadedTexture);
    });
  });

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle floating animation
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
      
      // Auto-rotate when not hovered
      if (!isHovered) {
        groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
      }
    }
  });

  return (
    <group ref={groupRef}>
      {/* Phone Body */}
      <RoundedBox
        args={[1.8, 3.6, 0.15]}
        radius={0.15}
        smoothness={4}
        position={[0, 0, 0]}
      >
        <meshStandardMaterial
          color="#1a1a1a"
          metalness={0.9}
          roughness={0.1}
        />
      </RoundedBox>

      {/* Screen */}
      <RoundedBox
        args={[1.65, 3.3, 0.02]}
        radius={0.1}
        smoothness={4}
        position={[0, 0, 0.08]}
      >
        <meshStandardMaterial
          color="#000000"
          metalness={0.5}
          roughness={0.2}
        />
      </RoundedBox>

      {/* Screen Content */}
      {texture && (
        <mesh position={[0, 0, 0.09]}>
          <planeGeometry args={[1.5, 3.0]} />
          <meshStandardMaterial
            map={texture}
            emissive="#ffffff"
            emissiveIntensity={0.3}
          />
        </mesh>
      )}

      {/* Camera Notch */}
      <mesh position={[0, 1.7, 0.08]}>
        <cylinderGeometry args={[0.03, 0.03, 0.05, 16]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* Power Button */}
      <RoundedBox
        args={[0.05, 0.3, 0.05]}
        radius={0.02}
        smoothness={4}
        position={[0.925, 0.5, 0]}
        rotation={[0, 0, 0]}
      >
        <meshStandardMaterial color="#0a0a0a" metalness={0.8} roughness={0.2} />
      </RoundedBox>

      {/* Volume Buttons */}
      <RoundedBox
        args={[0.05, 0.2, 0.05]}
        radius={0.02}
        smoothness={4}
        position={[-0.925, 0.8, 0]}
      >
        <meshStandardMaterial color="#0a0a0a" metalness={0.8} roughness={0.2} />
      </RoundedBox>
      <RoundedBox
        args={[0.05, 0.2, 0.05]}
        radius={0.02}
        smoothness={4}
        position={[-0.925, 0.4, 0]}
      >
        <meshStandardMaterial color="#0a0a0a" metalness={0.8} roughness={0.2} />
      </RoundedBox>
    </group>
  );
}

interface PhoneMockup3DProps {
  image: string;
  autoRotate?: boolean;
}

const PhoneMockup3D = ({ image, autoRotate = true }: PhoneMockup3DProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        width: '100%',
        height: '400px',
        position: 'relative',
        borderRadius: '16px',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
        <pointLight position={[10, 10, 5]} intensity={0.3} color="#3b82f6" />

        <Phone3D image={image} isHovered={isHovered} />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={autoRotate && !isHovered}
          autoRotateSpeed={2}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
        />

        <Environment preset="city" />
      </Canvas>

      <div
        style={{
          position: 'absolute',
          bottom: '15px',
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'rgba(255, 255, 255, 0.6)',
          fontSize: '0.75rem',
          textAlign: 'center',
          pointerEvents: 'none',
          background: 'rgba(0, 0, 0, 0.3)',
          padding: '4px 12px',
          borderRadius: '12px',
          backdropFilter: 'blur(10px)',
        }}
      >
        {isHovered ? 'Drag to rotate' : 'Hover to control'}
      </div>
    </div>
  );
};

export default PhoneMockup3D;
