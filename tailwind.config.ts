import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                vice: {
                    pink: "#ff00cc", // Neon Pink
                    blue: "#00cccc", // Deep Teal
                    yellow: "#ffcc00",
                    orange: "#ff9900", // Sunset Orange
                    purple: "#9900ff",
                },
                midnight: "#0a0a0a", // Midnight Black
            },
            fontFamily: {
                sans: ["var(--font-inter)", "sans-serif"],
                display: ["var(--font-chalet)", "sans-serif"],
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
            },
        },
    },
    plugins: [],
};
export default config;
