module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'media', // or 'class'
  theme: {
    extend: {
      translate: {
        200: '200%',
      },
      colors: {
        'main-color': 'var(--main-color)',
        'main-color-accent': 'var(--main-color-accent)',
        'sec-color': 'var(--sec-color)',
        'bg-color': 'var(--bg-color)',
        'hc-color': 'var(--hc-color)',
        'hc-color-accent': 'var(--hc-color-accent)',
        'el-bg-color': 'var(--el-bg-color)',
        'el-bg-hover-color': 'var(--el-bg-hover-color)',
      },
      keyframes: {
        hop: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10%)' },
        },
      },
      animation: {
        hop: 'hop 1s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
