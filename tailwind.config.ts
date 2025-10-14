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
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        // Wedding theme colors
        gold: {
          50: "#fefdf8",
          100: "#fdf9e8",
          200: "#faf0c7",
          300: "#f6e39a",
          400: "#f0d06c",
          500: "#e8b84d",
          600: "#d4a03a",
          700: "#b8852f",
          800: "#946a2a",
          900: "#785626",
        },
        rose: {
          50: "#fdf2f8",
          100: "#fce7f3",
          200: "#fbcfe8",
          300: "#f9a8d4",
          400: "#f472b6",
          500: "#ec4899",
          600: "#db2777",
          700: "#be185d",
          800: "#9d174d",
          900: "#831843",
        },
        sage: {
          50: "#f6f7f6",
          100: "#e3e7e3",
          200: "#c7d2c7",
          300: "#a3b5a3",
          400: "#7d957d",
          500: "#5f7a5f",
          600: "#4a5f4a",
          700: "#3d4e3d",
          800: "#334033",
          900: "#2c352c",
        },
      },
      fontFamily: {
        sans: ["Poppins", "system-ui", "sans-serif"],
        serif: ["Lora", "Georgia", "serif"],
        handwriting: ["Dancing Script", "cursive"],
        monsieur: ["var(--font-monsieur-la-doulaise)", "cursive"],
        bodoni: ["var(--font-bodoni-moda)", "serif"],
        licorice: ["var(--font-licorice)", "cursive"],
        italianno: ["var(--font-italianno)", "cursive"],
        parisienne: ["var(--font-parisienne)", "cursive"],
        alexBrush: ["var(--font-alex-brush)", "cursive"],
        pinyonScript: ["var(--font-pinyon-script)", "cursive"],
        mrsSaintDelafield: ["var(--font-mrs-saint-delafield)", "cursive"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-down": "slideDown 0.5s ease-out",
        "scale-in": "scaleIn 0.3s ease-out",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
