import React, { useRef, useMemo, useLayoutEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { TREE_MATERIAL_PROPS, GOLD_MATERIAL_PROPS } from '../constants';
import { Ornaments } from './Ornaments';

interface LuxTreeProps {
  color: string;
  isLightsOn: boolean;
}

// Procedural Cedar Foliage - Bigger and Fuller
const CedarFoliage = ({ color }: { color: string }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const tempObject = new THREE.Object3D();
  const count = 3500; // Increased for fullness
  const treeHeight = 11; // Slightly taller
  const baseRadius = 4.8; // Wider base

  const branches = useMemo(() => {
    const data = [];
    for (let i = 0; i < count; i++) {
      const t = i / count;
      // y goes from 0.5 to height
      const y = t * treeHeight;
      
      // Radius profile: Wide base, tapers to point. Power curve for fuller bottom.
      const rLimit = Math.pow((1 - t), 0.9) * baseRadius + 0.5; 
      const r = Math.sqrt(Math.random()) * rLimit; // Volume filling
      
      // Golden Angle for natural distribution
      const angle = i * 2.39996 * 5; 
      
      const x = Math.cos(angle) * r;
      const z = Math.sin(angle) * r;

      // Scale: Smaller at top
      const s = (1 - t * 0.8) * 0.7;

      // Rotation: Point outwards and droop down (Cedar characteristic)
      // Droop factor increases towards bottom
      const droop = 1 + (1-t) * 1.5;
      const lookAtPos = new THREE.Vector3(x * 2, y - droop, z * 2);
      
      data.push({ x, y, z, scale: s, lookAt: lookAtPos });
    }
    return data;
  }, []);

  useLayoutEffect(() => {
    if (!meshRef.current) return;
    branches.forEach((d, i) => {
      tempObject.position.set(d.x, d.y, d.z);
      tempObject.lookAt(d.lookAt);
      
      // Random rotation around local Z axis for natural variety
      tempObject.rotateZ(Math.random() * Math.PI);
      
      // Cedar branches are often long and flat-ish
      tempObject.scale.set(d.scale, d.scale, d.scale * 1.8);
      tempObject.updateMatrix();
      meshRef.current.setMatrixAt(i, tempObject.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [branches]);

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} castShadow receiveShadow>
      {/* Flattened cone for cedar branch look */}
      <coneGeometry args={[0.35, 1.8, 5]} /> 
      <meshPhysicalMaterial 
        {...TREE_MATERIAL_PROPS} 
        color={color} 
        roughness={0.7}
        metalness={0.1}
        flatShading={true} // Adds texture
      />
    </instancedMesh>
  );
};

// Flowing Ribbon Mesh - Wider and smoother
const FlowingRibbon = () => {
   const curve = useMemo(() => {
     const points = [];
     const turns = 5;
     const height = 11;
     const radiusBase = 5.2; // Must be wider than tree base
     
     for (let i = 0; i <= 150; i++) {
       const t = i / 150;
       const angle = t * Math.PI * 2 * turns;
       const y = t * height; // Start from bottom
       // Ribbon shape profile matches tree but wider
       const r = Math.pow((1 - t), 0.9) * radiusBase + 0.5;
       
       // Add elegant wave
       const waveY = Math.sin(t * 25) * 0.3;
       const waveR = Math.cos(t * 20) * 0.2;
       
       points.push(new THREE.Vector3(
         Math.cos(angle) * (r + waveR),
         y + waveY,
         Math.sin(angle) * (r + waveR)
       ));
     }
     return new THREE.CatmullRomCurve3(points);
   }, []);

   return (
     <mesh position={[0, 0, 0]}>
       {/* Thicker tube for "Metal Tape" look */}
       <tubeGeometry args={[curve, 300, 0.25, 12, false]} />
       <meshStandardMaterial 
        {...GOLD_MATERIAL_PROPS} 
        color="#F8D568" 
        roughness={0.15}
        metalness={1.0}
       />
     </mesh>
   );
};

// Five-Pointed Star
const Star = ({ isLightsOn }: { isLightsOn: boolean }) => {
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    const points = 5;
    const outerRadius = 1.0;
    const innerRadius = 0.45;
    const angleOffset = -Math.PI / 2; // Point up

    for (let i = 0; i < points * 2; i++) {
      const angle = (i * Math.PI) / points + angleOffset;
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      if (i === 0) s.moveTo(x, y);
      else s.lineTo(x, y);
    }
    s.closePath();
    return s;
  }, []);

  const starRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (!starRef.current) return;
    starRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.05;
    starRef.current.scale.setScalar(pulse);
  });

  return (
    <group ref={starRef} position={[0, 11.2, 0]}>
       <mesh>
        <extrudeGeometry 
            args={[shape, { 
                depth: 0.4, 
                bevelEnabled: true, 
                bevelThickness: 0.1, 
                bevelSize: 0.05, 
                bevelSegments: 3 
            }]} 
        />
        {/* Center the extruded geometry locally */}
        <meshStandardMaterial 
            color="#FFD700" 
            emissive="#FFD700"
            emissiveIntensity={isLightsOn ? 2.5 : 0.5}
            toneMapped={false}
            metalness={0.9}
            roughness={0.1}
        />
      </mesh>
      {isLightsOn && (
         <pointLight distance={15} intensity={30} color="#ffaa00" decay={1.5} position={[0, 0, 0.5]} />
      )}
    </group>
  );
};

export const LuxTree: React.FC<LuxTreeProps> = ({ color, isLightsOn }) => {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (!groupRef.current) return;
    // Gentle floating breathing animation
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.05) * 0.03;
  });

  return (
    <group ref={groupRef} dispose={null} position={[0, -4.5, 0]}>
      
      {/* Trunk - thicker for bigger tree */}
      <mesh position={[0, 4, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.4, 1.2, 8, 16]} />
        <meshStandardMaterial color="#2d1c0f" roughness={0.9} />
      </mesh>

      {/* Realistic Foliage */}
      <CedarFoliage color={color} />

      {/* Ornaments - Repositioned for new volume */}
      <group position={[0, 0, 0]}>
         <Ornaments count={350} radius={4.2} height={10} />
      </group>

      {/* The Star */}
      <Star isLightsOn={isLightsOn} />
      
      {/* Flowing Ribbon */}
      <FlowingRibbon />

    </group>
  );
};