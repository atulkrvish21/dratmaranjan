/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        medical: {
          50: "#eef8ff",
          100: "#d9efff",
          200: "#bce4ff",
          300: "#8ed1ff",
          400: "#56b4f3",
          500: "#2d94da",
          600: "#1676ba",
          700: "#0f5e97",
          800: "#0f4f7d",
          900: "#003366"
        },
        ink: "#07253f"
      },
      boxShadow: {
        soft: "0 18px 45px rgba(0, 51, 102, 0.12)",
        lift: "0 22px 70px rgba(0, 51, 102, 0.18)"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};
