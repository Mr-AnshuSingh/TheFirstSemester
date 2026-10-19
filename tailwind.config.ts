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
        dim: '#6b665b',
        accentRed: '#d4572b',
        accentTeal: '#2a7f78',
        accentGold: '#d49a14',
        accentBlue: '#3567a6',
        accentGreen: '#5b8a39',
      },
      fontFamily: {
        hand: ['Caveat', '"Segoe Print"', '"Bradley Hand"', 'cursive'],
        sans: ['system-ui', '-apple-system', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        sketch: '3px 3px 0 #2b2a28',
        sketchLg: '4px 4px 0 #2b2a28',
      },
    },
  },
  plugins: [],
};

export default config;
