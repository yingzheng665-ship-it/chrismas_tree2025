export interface TreeConfig {
  height: number;
  radius: number;
  layers: number;
  color: string;
}

export interface OrnamentProps {
  count: number;
  radius: number;
  color: string;
}

export interface InteractiveState {
  rotationSpeed: number;
  isLightsOn: boolean;
  bloomIntensity: number;
  colorTheme: 'emerald' | 'obsidian' | 'pearl';
}