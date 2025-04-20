// tailwind.config.js
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        darkbg: '#0f172a',
        darkmid: '#1e293b',
        darktext: '#cbd5e1'
      },
    },
  },
  plugins: [],
};
