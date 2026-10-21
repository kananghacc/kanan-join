/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#FF3A3A',
        'primary-hover': '#D92E2E',
        canvas: '#FFFFFF',
        'canvas-soft': '#F4F8FF',
        'canvas-warm': '#FFF7F7',
        hairline: '#D8E5F6',
        ink: '#0B3A66',
        'body-strong': '#234F78',
        body: '#456C91',
        mute: '#6F8BA8',
        'brand-blue': '#0B3A66',
        'brand-blue-soft': '#EAF3FF',
        'brand-blue-pale': '#F4F8FF',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        sm: '8px',
        md: '12px',
        lg: '16px',
      },
    },
  },
  plugins: [],
};
