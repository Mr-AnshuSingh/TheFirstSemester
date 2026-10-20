import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        paper: '#f6f0e1',
        paper2: '#efe7d2',
        paper3: '#e6dcc3',
        ink: '#2b2a28',
        dim: '#555046', // WCAG AA contrast >= 5.5:1 against paper
        accentRed: '#c85025',
        accentTeal: '#1e6e67',
        accentGold: '#b8810b',
        accentBlue: '#2c5890',
        accentGreen: '#4e7a2e',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', '-apple-system', '"Segoe UI"', 'Roboto', 'sans-serif'],
        hand: ['var(--font-caveat)', 'Caveat', '"Segoe Print"', '"Bradley Hand"', 'cursive'],
      },
      fontSize: {
        badge: ['12px', { lineHeight: '16px' }],
        meta: ['14px', { lineHeight: '20px' }],
        body: ['16px', { lineHeight: '1.6' }],
        subhead: ['18px', { lineHeight: '24px' }],
        title: ['22px', { lineHeight: '28px' }],
        'hand-sm': ['24px', { lineHeight: '1.1' }],
        'hand-md': ['30px', { lineHeight: '1.05' }],
        'hand-lg': ['38px', { lineHeight: '1.0' }],
        'hand-xl': ['48px', { lineHeight: '0.95' }],
      },
      boxShadow: {
        sketch: '3px 3px 0 #2b2a28',
        sketchy: '2px 2px 0 rgba(43, 42, 40, 0.9)',
        sketchLg: '4px 4px 0 #2b2a28',
      },
    },
  },
  plugins: [],
};

export default config;
