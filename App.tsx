import React, { useState, useReducer } from 'react';
import { Scene } from './components/Scene';
import { UI } from './components/UI';
import { InteractiveState } from './types';

// Simple state reducer for cleaner updates
function stateReducer(state: InteractiveState, action: Partial<InteractiveState>): InteractiveState {
  return { ...state, ...action };
}

const initialState: InteractiveState = {
  rotationSpeed: 0.5,
  isLightsOn: true,
  bloomIntensity: 1.5,
  colorTheme: 'emerald',
};

const App: React.FC = () => {
  const [state, dispatch] = useReducer(stateReducer, initialState);

  return (
    <div className="w-full h-screen bg-[#021a12] text-white overflow-hidden relative selection:bg-[#d4af37] selection:text-black">
      <Scene config={state} />
      <UI state={state} dispatch={dispatch} />
    </div>
  );
};

export default App;