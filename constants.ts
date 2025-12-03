import * as THREE from 'three';

export const COLORS = {
  EMERALD: {
    primary: '#00382B',
    secondary: '#001A12',
    highlight: '#00FF9D'
  },
  GOLD: {
    primary: '#FFD700',
    metallic: '#D4AF37',
    shine: '#FFF8E7'
  },
  RED: {
    primary: '#8A0F0F',
    secondary: '#590505',
    highlight: '#FF4D4D'
  },
  OBSIDIAN: {
    primary: '#1a1a1a',
    secondary: '#000000',
  },
  PEARL: {
    primary: '#f0f0f0',
    secondary: '#e0e0e0',
  }
};

export const THEMES = {
  emerald: {
    treeColor: '#0f2e1e', // Darker, more realistic pine green
    bgColor: COLORS.EMERALD.secondary,
    ornamentColor: COLORS.GOLD.primary,
  },
  obsidian: {
    treeColor: '#111111',
    bgColor: '#050505',
    ornamentColor: '#C0C0C0',
  },
  pearl: {
    treeColor: '#F5F5F5',
    bgColor: '#333333',
    ornamentColor: COLORS.GOLD.metallic,
  }
};

export const GOLD_MATERIAL_PROPS = {
  color: COLORS.GOLD.metallic,
  metalness: 1,
  roughness: 0.15,
  clearcoat: 1,
  clearcoatRoughness: 0.1,
  envMapIntensity: 1.5,
};

export const RED_SATIN_MATERIAL_PROPS = {
  color: COLORS.RED.primary,
  metalness: 0.4,
  roughness: 0.3,
  clearcoat: 0.5,
  clearcoatRoughness: 0.2,
  envMapIntensity: 1.2,
};

export const TREE_MATERIAL_PROPS = {
  metalness: 0.1,
  roughness: 0.8,
  envMapIntensity: 0.5,
};