import React from 'react';
import { EffectComposer, Bloom, Vignette, Noise, ToneMapping } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

interface EffectsProps {
  bloomIntensity: number;
}

export const Effects: React.FC<EffectsProps> = ({ bloomIntensity }) => {
  return (
    <EffectComposer disableNormalPass>
      <ToneMapping 
        blendFunction={BlendFunction.NORMAL}
        adaptive={true} 
        resolution={256} 
        middleGrey={0.6} 
        maxLuminance={16.0} 
        averageLuminance={1.0} 
        adaptationRate={1.0} 
      />
      <Bloom 
        luminanceThreshold={1} 
        mipmapBlur 
        intensity={bloomIntensity} 
        radius={0.6}
        levels={9}
      />
      <Noise opacity={0.02} />
      <Vignette eskil={false} offset={0.1} darkness={1.1} />
    </EffectComposer>
  );
};