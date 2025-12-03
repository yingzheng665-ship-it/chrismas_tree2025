import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows, Sparkles, Float } from '@react-three/drei';
import { LuxTree } from './LuxTree';
import { Gifts } from './Gifts';
import { Effects } from './Effects';
import { THEMES, COLORS } from '../constants';
import type { InteractiveState } from '../types';

interface SceneProps {
  config: InteractiveState;
}

export const Scene: React.FC<SceneProps> = ({ config }) => {
  const theme = THEMES[config.colorTheme];

  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      gl={{ antialias: false, toneMappingExposure: 1.1 }}
      style={{ background: theme.bgColor, transition: 'background 1s ease' }}
    >
      <PerspectiveCamera makeDefault position={[0, 6, 20]} fov={35} />
      
      <Suspense fallback={null}>
        <Environment preset="city" />
        
        {/* Dynamic Lighting */}
        <ambientLight intensity={0.3} color={theme.treeColor} />
        
        {/* Key Light */}
        <spotLight 
          position={[15, 15, 15]} 
          angle={0.25} 
          penumbra={1} 
          intensity={400} 
          castShadow 
          shadow-mapSize={[2048, 2048]} 
          color="#fff5e6"
        />
        
        {/* Fill Light */}
        <pointLight position={[-12, 5, -12]} intensity={80} color="#dbeeff" />
        
        {/* Back/Rim Light for Ribbon/Gold popping */}
        <spotLight position={[0, 12, -15]} intensity={300} color="#ffd700" angle={0.6} />

        <group rotation={[0, 0, 0]}>
            <LuxTree color={theme.treeColor} isLightsOn={config.isLightsOn} />
            
            {/* Gifts on the floor - moved further out for larger tree */}
            <group position={[0, -4.5, 0]}>
               <Gifts count={18} radius={6.5} />
            </group>
        </group>

        {/* Floor Reflections */}
        <ContactShadows 
            position={[0, -4.5, 0]} 
            resolution={1024} 
            scale={80} 
            blur={2.5} 
            opacity={0.5} 
            far={10} 
            color="#000000" 
        />
        
        {/* Magical Atmosphere */}
        {config.isLightsOn && (
            <Float speed={1} rotationIntensity={0.2} floatIntensity={0.2}>
                <Sparkles 
                    count={400} 
                    scale={[20, 15, 20]} 
                    size={8} 
                    speed={0.3} 
                    opacity={0.6} 
                    color={COLORS.GOLD.shine} 
                />
            </Float>
        )}

        <Effects bloomIntensity={config.isLightsOn ? config.bloomIntensity : 0} />
        
        <OrbitControls 
          enablePan={false} 
          autoRotate={true}
          autoRotateSpeed={config.rotationSpeed}
          maxPolarAngle={Math.PI / 1.9} 
          minPolarAngle={Math.PI / 3}
          minDistance={12}
          maxDistance={30}
          target={[0, 2, 0]}
        />
      </Suspense>
    </Canvas>
  );
};