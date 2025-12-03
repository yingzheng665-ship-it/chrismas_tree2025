import React, { useMemo } from 'react';
import * as THREE from 'three';
import { RED_SATIN_MATERIAL_PROPS, GOLD_MATERIAL_PROPS } from '../constants';

interface GiftProps {
  count?: number;
  radius?: number;
}

export const Gifts: React.FC<GiftProps> = ({ count = 12, radius = 4 }) => {
  const gifts = useMemo(() => {
    const items = [];
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + (Math.random() * 0.5);
      const r = radius + Math.random() * 1.5;
      const x = Math.cos(angle) * r;
      const z = Math.sin(angle) * r;
      const size = 0.6 + Math.random() * 0.6; // Box size
      const height = size * (0.8 + Math.random() * 0.4); 
      
      // Random rotation
      const rotationY = Math.random() * Math.PI;

      items.push({ position: [x, height / 2, z] as [number, number, number], size: [size, height, size] as [number, number, number], rotation: [0, rotationY, 0] as [number, number, number] });
    }
    return items;
  }, [count, radius]);

  return (
    <group>
      {gifts.map((gift, i) => (
        <group key={i} position={gift.position} rotation={gift.rotation}>
          {/* Box */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={gift.size} />
            <meshPhysicalMaterial {...RED_SATIN_MATERIAL_PROPS} />
          </mesh>
          
          {/* Ribbon Vertical */}
          <mesh position={[0, 0, 0]} scale={[1.02, 1.02, 1.02]}>
             <boxGeometry args={[gift.size[0] * 0.15, gift.size[1], gift.size[2] + 0.01]} />
             <meshStandardMaterial {...GOLD_MATERIAL_PROPS} />
          </mesh>
          {/* Ribbon Horizontal */}
          <mesh position={[0, 0, 0]} scale={[1.02, 1.02, 1.02]}>
             <boxGeometry args={[gift.size[0] + 0.01, gift.size[1], gift.size[2] * 0.15]} />
             <meshStandardMaterial {...GOLD_MATERIAL_PROPS} />
          </mesh>

          {/* Bow Top */}
          <group position={[0, gift.size[1]/2, 0]}>
             <mesh rotation={[0, 0, Math.PI / 4]} position={[0, 0.1, 0]}>
                <torusGeometry args={[0.15 * gift.size[0], 0.05 * gift.size[0], 16, 32]} />
                <meshStandardMaterial {...GOLD_MATERIAL_PROPS} />
             </mesh>
             <mesh rotation={[0, Math.PI / 2, -Math.PI / 4]} position={[0, 0.1, 0]}>
                <torusGeometry args={[0.15 * gift.size[0], 0.05 * gift.size[0], 16, 32]} />
                <meshStandardMaterial {...GOLD_MATERIAL_PROPS} />
             </mesh>
          </group>
        </group>
      ))}
    </group>
  );
};