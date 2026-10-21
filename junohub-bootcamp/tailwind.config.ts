import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './hooks/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)'],
      },
      fontSize: {
        xs: ['16px', { lineHeight: '1.3' }],
        sm: ['19px', { lineHeight: '1.5' }],
        base: ['21px', { lineHeight: '1.5' }],
        lg: ['23px', { lineHeight: '1.45' }],
        xl: ['26px', { lineHeight: '1.3' }],
      },
    },
  },
  plugins: [],
};

export default config;
