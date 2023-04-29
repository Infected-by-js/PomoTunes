module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: ['class', '[data-mode="dark"]'],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
      },

      animation: {
        fadeIn: 'fadeIn 0.3s ease',
        fadeIn1s: 'fadeIn 1s ease',
        fadeOut: 'fadeOut 0.3s ease',
      },

      backgroundImage: {
        gradient: 'var(--gradient)',
        'gradient-r': 'var(--gradient-r)',
        'gradient-half': 'var(--gradient-half)',
      },

      flexGrow: {
        2: 2,
        3: 3,
      },

      inset: {
        '1/10': '10%',
        '1/5': '20%',
        '2/5': '40%',
        '3/5': '60%',
        '4/5': '80%',
      },
    },
  },
  plugins: [],
};
