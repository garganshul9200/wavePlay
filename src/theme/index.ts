export const colors = {
  background: '#07070D',
  surface: '#12121C',
  surfaceElevated: '#1A1A28',
  surfaceHighlight: '#242438',
  border: 'rgba(255, 255, 255, 0.08)',
  borderActive: 'rgba(167, 139, 250, 0.45)',
  textPrimary: '#F8FAFC',
  textSecondary: '#94A3B8',
  textMuted: '#64748B',
  accent: '#8B5CF6',
  accentLight: '#A78BFA',
  accentSoft: 'rgba(139, 92, 246, 0.15)',
  cyan: '#22D3EE',
  cyanSoft: 'rgba(34, 211, 238, 0.12)',
  success: '#34D399',
  tabBar: '#0E0E16',
  miniPlayer: '#14141F',
  overlay: 'rgba(7, 7, 13, 0.85)',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
};

export const radius = {
  sm: 10,
  md: 16,
  lg: 24,
  full: 999,
};

export const typography = {
  hero: {
    fontSize: 34,
    fontWeight: '800' as const,
    letterSpacing: -0.8,
  },
  title: {
    fontSize: 22,
    fontWeight: '700' as const,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600' as const,
  },
  body: {
    fontSize: 15,
    fontWeight: '400' as const,
    lineHeight: 22,
  },
  caption: {
    fontSize: 13,
    fontWeight: '500' as const,
  },
  label: {
    fontSize: 11,
    fontWeight: '700' as const,
    letterSpacing: 1.2,
    textTransform: 'uppercase' as const,
  },
};

export const trackAccents = ['#8B5CF6', '#06B6D4', '#F472B6', '#FBBF24', '#34D399'];

export function getTrackAccent(index: number) {
  return trackAccents[index % trackAccents.length];
}
