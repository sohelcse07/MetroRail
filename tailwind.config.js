/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",


"./src/**/*.{js,ts,jsx,tsx}",
  ],
  
  theme: {
    extend: {
      colors: {
        primary: "#3B82F6", // Blue
        secondary: "#6B7280", // Gray
        success: "#10B981", // Green
        danger: "#EF4444", // Red
        warning: "#F59E0B", // Amber
        info: "#06B6D4", // Cyan
      },
    },
  },
  plugins: [],
}

