import React, { useRef, useMemo, useLayoutEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { GOLD_MATERIAL_PROPS } from '../constants';

interface OrnamentsProps {
  count: number;
  radius: number;
  height: number;
  color?: string;
}

export const Ornaments: React.FC<OrnamentsProps> = ({ count, radius, height, color }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const tempObject = new THREE.Object3D();

  const particles = useMemo(() => {
    const data = [];
    for (let i = 0; i < count; i++) {
      // Distribution for a wide Cedar tree
      const ratio = i / count;
      
      // Normalized height (0 at bottom, 1 at top)
      // Use power to put more ornaments at the bottom
      const hNorm = Math.pow(ratio, 0.8); 
      const y = hNorm * height; // 0 to height

      // Radius is wider at bottom, tapers non-linearly
      // Cedar shape: slightly curved cone
      const maxR = radius * (1 - hNorm) * 1.2; 
      
      const angle = i * 137.5; // Golden angle
      
      // Push them to the surface of the "foliage"
      const r = maxR * 0.8 + (Math.random() * 0.2 * maxR); 

      const x = Math.cos(angle) * r;
      const z = Math.sin(angle) * r;
      
      const scale = Math.random() * 0.2 + 0.15; // Larger ornaments for luxury

      data.push({ x, y, z, scale });
    }
    return data;
  }, [count, radius, height]);

  useLayoutEffect(() => {
    if (!meshRef.current) return;
    
    particles.forEach((particle, i) => {
      tempObject.position.set(particle.x, particle.y, particle.z);
      tempObject.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      tempObject.scale.set(particle.scale, particle.scale, particle.scale);
      tempObject.updateMatrix();
      meshRef.current.setMatrixAt(i, tempObject.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [particles]);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.05) * 0.05;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} castShadow receiveShadow>
      <sphereGeometry args={[1, 32, 32]} />
      <meshPhysicalMaterial 
        {...GOLD_MATERIAL_PROPS} 
        color={color || GOLD_MATERIAL_PROPS.color}
      />
    </instancedMesh>
  );
};