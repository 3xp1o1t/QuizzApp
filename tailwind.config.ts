// import type { Config } from 'tailwindcss';

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#007FFF',
        secondary: '#1AFFD5',
        success: '#36F1CD',
        warning: '#F7EE7F',
        danger: '#A54657',
        info: '#39A0ED',
        light: '#F7F7F7',
        dark: '#161616',
      },
      container: {
        center: true,
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in forwards',
        fadeOut: 'fadeOut 0.5s ease-out forwards',
        slideRight: 'slideRight 0.5s ease-in forwards',
        slideLeft: 'slideLeft 0.5s ease-in forwards',
        slideUp: 'slideUp 0.5s ease-in forwards',
        slideDown: 'slideDown 0.5s ease-in forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        slideRight: {
          '0%': { transform: 'translateX(-5px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideLeft: {
          '0%': { transform: 'translateX(5px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(5px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-5px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      backgroundImage: {
        'header-bg': "url('/assets/header-bg.jpg')",
        'header-bg-2': "url('/assets/header-bg-2.jpg')",
      },
    },
  },
  plugins: [],
};
// export default config;
