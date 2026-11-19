import { ColorPaletteType, FontFamilyType, ThemeConfig, TemplateType } from '../types/profile';

export interface PaletteDefinition {
  name: string;
  isLight?: boolean;
  bg: string;
  surface: string;
  surfaceBorder: string;
  text: string;
  textMuted: string;
  accent: string;
  accentHover: string;
  accentGlow: string;
  gradient: string;
}

export const COLOR_PALETTES: Record<ColorPaletteType, PaletteDefinition> = {
  zenith: {
    name: 'Professional Navy & Blue',
    isLight: false,
    bg: '#0B132B',
    surface: '#1C2541',
    surfaceBorder: '#3A506B',
    text: '#F8FAFC',
    textMuted: '#94A3B8',
    accent: '#2563EB',
    accentHover: '#1D4ED8',
    accentGlow: 'rgba(37, 99, 235, 0.25)',
    gradient: 'from-blue-600 to-indigo-600'
  },
  modernLight: {
    name: 'Modern Clean Light',
    isLight: true,
    bg: '#F8FAFC',
    surface: '#FFFFFF',
    surfaceBorder: '#E2E8F0',
    text: '#0F172A',
    textMuted: '#64748B',
    accent: '#2563EB',
    accentHover: '#1D4ED8',
    accentGlow: 'rgba(37, 99, 235, 0.18)',
    gradient: 'from-blue-600 to-indigo-600'
  },
  sunsetVibrant: {
    name: 'Sunset Glow & Coral',
    isLight: false,
    bg: '#13091B',
    surface: '#231233',
    surfaceBorder: '#3D1D59',
    text: '#FFF7ED',
    textMuted: '#FDBA74',
    accent: '#FF5964',
    accentHover: '#E02D3A',
    accentGlow: 'rgba(255, 89, 100, 0.3)',
    gradient: 'from-rose-500 via-pink-500 to-amber-400'
  },
  oceanTeal: {
    name: 'Pacific Teal & Cyan',
    isLight: false,
    bg: '#041824',
    surface: '#08283B',
    surfaceBorder: '#104A6B',
    text: '#F0FDFA',
    textMuted: '#5EEAD4',
    accent: '#06B6D4',
    accentHover: '#0891B2',
    accentGlow: 'rgba(6, 182, 212, 0.25)',
    gradient: 'from-teal-400 to-cyan-500'
  },
  lavenderLight: {
    name: 'Soft Lavender Pastel',
    isLight: true,
    bg: '#FAF8FF',
    surface: '#FFFFFF',
    surfaceBorder: '#EDE9FE',
    text: '#1E1B4B',
    textMuted: '#7C3AED',
    accent: '#7C3AED',
    accentHover: '#6D28D9',
    accentGlow: 'rgba(124, 58, 237, 0.2)',
    gradient: 'from-purple-600 to-pink-500'
  },
  luxuryChampagne: {
    name: 'Haute Champagne & Gold',
    isLight: false,
    bg: '#0C0A09',
    surface: '#1C1917',
    surfaceBorder: '#44403C',
    text: '#FAF6F0',
    textMuted: '#E7D7C1',
    accent: '#D4AF37',
    accentHover: '#B8942A',
    accentGlow: 'rgba(212, 175, 55, 0.3)',
    gradient: 'from-amber-200 via-yellow-400 to-amber-500'
  },
  tokyoNeo: {
    name: 'Tokyo Neon & Magenta',
    isLight: false,
    bg: '#0A0518',
    surface: '#160B30',
    surfaceBorder: '#2A1556',
    text: '#FAF5FF',
    textMuted: '#D8B4FE',
    accent: '#E11D48',
    accentHover: '#BE123C',
    accentGlow: 'rgba(225, 29, 72, 0.3)',
    gradient: 'from-fuchsia-500 via-rose-500 to-violet-600'
  },
  neonMatrix: {
    name: 'Neon Cyber Matrix',
    isLight: false,
    bg: '#020D08',
    surface: '#061D12',
    surfaceBorder: '#0F3F27',
    text: '#ECFDF5',
    textMuted: '#34D399',
    accent: '#10B981',
    accentHover: '#059669',
    accentGlow: 'rgba(16, 185, 129, 0.35)',
    gradient: 'from-emerald-400 to-green-500'
  },
  midnight: {
    name: 'Midnight Azure',
    isLight: false,
    bg: '#030712',
    surface: '#0f172a',
    surfaceBorder: '#1e293b',
    text: '#f8fafc',
    textMuted: '#94a3b8',
    accent: '#38bdf8',
    accentHover: '#0284c7',
    accentGlow: 'rgba(56, 189, 248, 0.25)',
    gradient: 'from-sky-400 to-blue-600'
  },
  emerald: {
    name: 'Nordic Emerald',
    isLight: false,
    bg: '#05130e',
    surface: '#0d221b',
    surfaceBorder: '#1b4335',
    text: '#f0fdf4',
    textMuted: '#86efac',
    accent: '#10b981',
    accentHover: '#059669',
    accentGlow: 'rgba(16, 185, 129, 0.25)',
    gradient: 'from-emerald-400 to-teal-600'
  },
  amber: {
    name: 'Solar Amber',
    isLight: false,
    bg: '#0c0a09',
    surface: '#1c1917',
    surfaceBorder: '#292524',
    text: '#fafaf9',
    textMuted: '#a8a29e',
    accent: '#f59e0b',
    accentHover: '#d97706',
    accentGlow: 'rgba(245, 158, 11, 0.25)',
    gradient: 'from-amber-400 to-orange-500'
  },
  crimson: {
    name: 'Crimson Slate',
    isLight: false,
    bg: '#0f0507',
    surface: '#1f0d12',
    surfaceBorder: '#3d1622',
    text: '#fff1f2',
    textMuted: '#fda4af',
    accent: '#e11d48',
    accentHover: '#be123c',
    accentGlow: 'rgba(225, 29, 72, 0.25)',
    gradient: 'from-rose-500 to-red-600'
  },
  cyberpunk: {
    name: 'Linear Violet',
    isLight: false,
    bg: '#0f172a',
    surface: '#1e293b',
    surfaceBorder: '#334155',
    text: '#f8fafc',
    textMuted: '#cbd5e1',
    accent: '#6366f1',
    accentHover: '#4f46e5',
    accentGlow: 'rgba(99, 102, 241, 0.25)',
    gradient: 'from-indigo-500 to-blue-600'
  },
  monochrome: {
    name: 'Monochrome Minimal',
    isLight: false,
    bg: '#0a0a0a',
    surface: '#171717',
    surfaceBorder: '#262626',
    text: '#ffffff',
    textMuted: '#a3a3a3',
    accent: '#ffffff',
    accentHover: '#e5e5e5',
    accentGlow: 'rgba(255, 255, 255, 0.15)',
    gradient: 'from-neutral-200 to-neutral-400'
  },
  nordic: {
    name: 'Nordic Frost',
    isLight: false,
    bg: '#0b131e',
    surface: '#152232',
    surfaceBorder: '#24374e',
    text: '#f1f5f9',
    textMuted: '#93c5fd',
    accent: '#3b82f6',
    accentHover: '#2563eb',
    accentGlow: 'rgba(59, 130, 246, 0.25)',
    gradient: 'from-blue-500 to-indigo-600'
  }
};

export const FONT_CLASSES: Record<FontFamilyType, string> = {
  inter: 'font-sans',
  outfit: 'font-display',
  editorial: 'font-editorial',
  space: 'font-space',
  syne: 'font-syne',
  mono: 'font-mono'
};

export const DEFAULT_THEME_CONFIG: ThemeConfig = {
  templateId: 'fullstack',
  fontFamily: 'outfit',
  colorPalette: 'zenith',
  accentColor: '#c9a84c',
  backgroundColor: '#0d0f14',
  surfaceColor: '#12151c',
  textColor: '#e6e2d8',
  spacing: 'normal',
  borderRadius: 'md',
  glassmorphism: true,
  showAnimations: true,
  sections: [
    { id: 'hero', name: 'Hero / Introduction', visible: true, order: 0 },
    { id: 'about', name: 'About & Bio', visible: true, order: 1 },
    { id: 'projects', name: 'Selected Work & Projects', visible: true, order: 2 },
    { id: 'experience', name: 'Work Experience', visible: true, order: 3 },
    { id: 'skills', name: 'Technical Skills & Radar', visible: true, order: 4 },
    { id: 'education', name: 'Education & Certifications', visible: true, order: 5 },
    { id: 'hackathons', name: 'Hackathons & Awards', visible: true, order: 6 },
    { id: 'contact', name: 'Contact & Connect', visible: true, order: 7 }
  ]
};
