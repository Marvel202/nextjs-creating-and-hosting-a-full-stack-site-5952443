import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
  extend: {
  colors: {
    pink: {
      100: '#FFE4E6',
      600: '#DB2777'
    },
    purple: {
      100: '#F3E8FF',
      600: '#9333EA'
    }
  }
},
};
export default config;
