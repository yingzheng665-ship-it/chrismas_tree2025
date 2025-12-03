import React from 'react';
import { InteractiveState } from '../types';
import { Loader } from '@react-three/drei';
import { Settings2, Sparkles, Zap, Palette } from 'lucide-react';

interface UIProps {
  state: InteractiveState;
  dispatch: React.Dispatch<Partial<InteractiveState>>;
}

export const UI: React.FC<UIProps> = ({ state, dispatch }) => {
  return (
    <>
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-10 flex flex-col justify-between p-8 md:p-12">
        {/* Header */}
        <header className="flex flex-col items-center md:items-start animate-fade-in-down">
          <div className="flex items-center gap-2 mb-2">
             <div className="w-8 h-[1px] bg-[#d4af37]"></div>
             <span className="text-[#d4af37] tracking-[0.3em] text-xs font-serif uppercase">Arix Signature Collection</span>
             <div className="w-8 h-[1px] bg-[#d4af37]"></div>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif text-white tracking-wide drop-shadow-lg" style={{ fontFamily: '"Playfair Display", serif' }}>
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#fff] to-[#d4af37]">Gilded</span> Tree
          </h1>
        </header>

        {/* Controls */}
        <aside className="pointer-events-auto bg-black/20 backdrop-blur-md border border-white/10 p-6 rounded-2xl max-w-sm ml-auto animate-fade-in-up shadow-2xl">
          <div className="flex flex-col gap-6">
            
            {/* Theme Selector */}
            <div className="space-y-3">
               <div className="flex items-center gap-2 text-[#d4af37] text-sm uppercase tracking-widest font-semibold">
                  <Palette size={14} /> <span>Signature Material</span>
               </div>
               <div className="flex gap-2">
                  {(['emerald', 'obsidian', 'pearl'] as const).map((theme) => (
                    <button
                      key={theme}
                      onClick={() => dispatch({ colorTheme: theme })}
                      className={`flex-1 py-2 text-xs uppercase tracking-wider transition-all duration-300 border ${
                        state.colorTheme === theme 
                        ? 'bg-[#d4af37] text-black border-[#d4af37]' 
                        : 'bg-transparent text-white/60 border-white/20 hover:border-white/50'
                      }`}
                    >
                      {theme}
                    </button>
                  ))}
               </div>
            </div>

            {/* Light Toggle */}
            <div className="flex items-center justify-between">
               <span className="text-white/80 font-serif text-lg">Illumination</span>
               <button 
                  onClick={() => dispatch({ isLightsOn: !state.isLightsOn })}
                  className={`relative w-14 h-7 rounded-full transition-colors duration-500 ${state.isLightsOn ? 'bg-[#d4af37]' : 'bg-white/10'}`}
               >
                  <div className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-500 ${state.isLightsOn ? 'translate-x-7' : 'translate-x-0'}`} />
               </button>
            </div>
            
             {/* Sliders */}
             {state.isLightsOn && (
               <div className="space-y-4 pt-2 border-t border-white/10">
                 <div className="space-y-2">
                    <div className="flex justify-between text-xs text-[#d4af37]">
                       <span className="flex items-center gap-1"><Sparkles size={12}/> BLOOM</span>
                       <span>{(state.bloomIntensity).toFixed(1)}</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="3" 
                      step="0.1"
                      value={state.bloomIntensity}
                      onChange={(e) => dispatch({ bloomIntensity: parseFloat(e.target.value) })}
                      className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#d4af37]"
                    />
                 </div>
                 <div className="space-y-2">
                    <div className="flex justify-between text-xs text-[#d4af37]">
                       <span className="flex items-center gap-1"><Zap size={12}/> ROTATION</span>
                       <span>{(state.rotationSpeed * 10).toFixed(0)}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="5" 
                      step="0.1"
                      value={state.rotationSpeed}
                      onChange={(e) => dispatch({ rotationSpeed: parseFloat(e.target.value) })}
                      className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#d4af37]"
                    />
                 </div>
               </div>
             )}
          </div>
        </aside>

        {/* Footer */}
        <footer className="text-center md:text-left text-white/30 text-xs tracking-widest uppercase mt-4 md:mt-0">
           Est. 2024 • Arix Interactive • WebGL Experience
        </footer>
      </div>
      <Loader 
        containerStyles={{ backgroundColor: '#021a12' }}
        innerStyles={{ width: '200px', backgroundColor: '#333' }}
        barStyles={{ backgroundColor: '#d4af37', height: '2px' }}
        dataStyles={{ color: '#d4af37', fontFamily: 'serif', fontSize: '1rem' }}
      />
    </>
  );
};