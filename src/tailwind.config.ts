import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      container: {
        center: true, // Centers the container
        padding: "1rem", // Adds padding on all sides
        screens: {
          sm: "100%", // Full width on small screens
          md: "640px",
          lg: "768px",
          xl: "1024px",
          "2xl": "1280px",
        },
      },
    },
  },
  plugins: [],
};

export default config;
