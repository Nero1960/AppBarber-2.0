// src/lib/chartThemes.ts

export type ChartPaletteType = 'appBarberPremium' | 'monochromatic' | 'pastel' | 'dark';

export interface ChartTheme {
  colors: string[];
  stroke: string;
  tooltipBg: string;
  tooltipBorder: string;
}

export const chartThemes: Record<ChartPaletteType, ChartTheme> = {
  appBarberPremium: {
    colors: ['#D6A354', '#C1872E', '#906423', '#5F4217'], // Dorados
    stroke: '#D6A354',
    tooltipBg: '#0F0F0F',
    tooltipBorder: '#ffffff'
  },
  monochromatic: {
    colors: ['#2563EB', '#3B82F6', '#60A5FA', '#93C5FD'], // Degradados de Azules Corporativos
    stroke: '#3B82F6',
    tooltipBg: '#1E293B',
    tooltipBorder: '#2563EB'
  },
  pastel: {
    colors: ['#FFB7B2', '#FFDAC1', '#E2F0CB', '#B5EAD7'], // Tonos Suaves
    stroke: '#4A4A4A',
    tooltipBg: '#FFFFFF',
    tooltipBorder: '#FFB7B2'
  },
  dark: {
    colors: ['#22C55E', '#3B82F6', '#EF4444', '#A855F7'], // Alto Contraste Neón
    stroke: '#949494',
    tooltipBg: '#09090B',
    tooltipBorder: '#27272A'
  }
};