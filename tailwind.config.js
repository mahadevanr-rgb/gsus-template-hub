/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0f4ff",
          100: "#e6eeff",
          200: "#c7d9ff",
          300: "#a8c5ff",
          400: "#6b95ff",
          500: "#4f46e5",
          600: "#4339ca",
          700: "#3730a3",
          800: "#2e2782",
          900: "#1f1b4d",
        },
        gray: {
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
        },
      },
      boxShadow: {
        soft: "0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)",
        card: "0 1px 3px rgba(0, 0, 0, 0.08), 0 4px 6px rgba(0, 0, 0, 0.05)",
      },
      spacing: {
        sidebar: "280px",
      },
    },
  },
  plugins: [],
};
