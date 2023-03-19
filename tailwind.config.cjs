module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: ["class", '[data-mode="dark"]'],
  theme: {
    extend: {
      colors: {
        light: "#fafaf9",
        dark: "#471515",
        gray: "#e2e8f0",
        "accent-100": "var(--color-accent-100)",
        "accent-300": "var(--color-accent-300)",
        "accent-500": "var(--color-accent-500)",
        "accent-700": "var(--color-accent-700)",
        "accent-900": "var(--color-accent-900)",
      },
    },
  },
  plugins: [],
};
