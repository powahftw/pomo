module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'media', // or 'class'
  theme: {
    extend: {
      colors: {
        'main-color': 'var(--main-color)',
        'main-color-accent': 'var(--main-color-accent)',
        'sec-color': 'var(--sec-color)',
        'bg-color': 'var(--bg-color)',
        'el-bg-color': 'var(--el-bg-color)',
        'el-bg-hover-color': 'var(--el-bg-hover-color)',
      },
    },
  },
  plugins: [],
};
