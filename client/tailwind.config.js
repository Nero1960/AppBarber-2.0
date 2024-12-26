/** @type {import('tailwindcss').Config} */
import tailwindcssAnimated from "tailwindcss-animated"
export default {
  darkMode: ["class"],
  content: [
    './src/**/*.{ts,tsx,js,jsx}',
    './index.html'
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {

      fontFamily: {
        heading: [
          'Playfair Display'
        ],

        body: [
          'Work Sans'
        ],
      },
      colors: {

        black: {
          "50": "#E8E8E8",
          "100": "#CFCFCF",
          "200": "#9E9E9E",
          "300": "#707070",
          "400": "#404040",
          "500": "#0F0F0F",
          "600": "#0D0D0D",
          "700": "#0A0A0A",
          "800": "#050505",
          "900": "#030303",
          "950": "#030303"
        },

        brown: {
          "50": "#E8E8E8",
          "100": "#D1D1D1",
          "200": "#A6A6A6",
          "300": "#787878",
          "400": "#4D4D4D",
          "500": "#1F1F1F",
          "600": "#1A1A1A",
          "700": "#121212",
          "800": "#0D0D0D",
          "900": "#050505",
          "950": "#030303"
        },

        white: {
          "50": "#FFFFFF",
          "100": "#FCFCFC",
          "200": "#FCFCFC",
          "300": "#FAFAFA",
          "400": "#FAFAFA",
          "500": "#F7F7F7",
          "600": "#C7C7C7",
          "700": "#949494",
          "800": "#636363",
          "900": "#303030",
          "950": "#1A1A1A"
        },

        Primary: {
          "50": "#FBF6EF",
          "100": "#F7EDDE",
          "200": "#EED9B9",
          "300": "#E6C798",
          "400": "#DEB577",
          "500": "#D6A354",
          "600": "#C1872E",
          "700": "#906423",
          "800": "#5F4217",
          "900": "#31220C",
          "950": "#191106"
        },

        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [tailwindcssAnimated],
}