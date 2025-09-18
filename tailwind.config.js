/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          1: "#F1F2FE",
          2: "#727CF5",
          3: "#2E3262",
          4: "#39AFD1",
          5: "#EBF7FA",
        },
        neutral: {
          1: "#FFFFFF",
          2: "#F5F5F5",
          3: "#6C757D",
          4: "#313A46",
          5: "#000000",
          6: "#CFD3D4",
          7: "#DDDDDD",
          8: "#363C4F",
        },
        alerts: {
          success: {
            1: "#E7FAF5",
            2: "#0ACF97",
            3: "#055361",
          },
          error: {
            1: "#FFEFF2",
            2: "#FA5C7C",
            3: "#642359",
          },
          warning: {
            1: "#FFE0B2",
            2: "#ff9f29",
            3: "#8D3811",
            4: "#74654C",
            5: "#2E3262",
          },
        },
        "modal-bg": {
          DEFAULT: "#00000080",
        },
      },
      fontFamily: {
        poppins: ["Poppins"],
        inter: ["Inter"],
      },
      keyframes: {
        // tooltip animation
        "slide-up-and-fade-in": {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "slide-right-and-fade-in": {
          "0%": {
            opacity: "0",
            transform: "translateX(-10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        "slide-down-and-fade-in": {
          "0%": {
            opacity: "0",
            transform: "translateY(-10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "slide-left-and-fade-in": {
          "0%": {
            opacity: "0",
            transform: "translateX(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        "slide-in-and-out": {
          "0%": {
            transform: "translateY(-100%)",
          },
          "40%": {
            transform: "translateY(0)",
          },
          "60%": {
            transform: "translateY(0)",
          },
          "100%": {
            transform: "translateY(100%)",
          },
        },
        // Card animation
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-out": {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        "fade-in-right": {
          "0%": { opacity: "0", transform: "translateX(-40px)" },
          "100%": { opacity: "1", transform: "translateX(0px)" },
        },
        "fade-in-left": {
          "0%": { opacity: "0", transform: "translateX(40px)" },
          "100%": { opacity: "1", transform: "translateX(0px)" },
        },
        "fade-in-down": {
          "0%": { opacity: "0", transform: "translateY(-40px)" },
          "100%": { opacity: "1", transform: "translateY(0px)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0px)" },
        },
        slideDown: {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        slideUp: {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },

        //Modal
        instructionOverlayShow: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        instructionContentShow: {
          from: {
            opacity: 0,
            transform: "translate(-50%, -100%) scale(0.96)",
          },
          to: { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
        },
      },
      animation: {
        // tooltip animation
        "slide-up-and-fade-in": "slide-up-and-fade-in 0.5s ease-out",
        "slide-right-and-fade-in": "slide-right-and-fade-in 0.5s ease-out",
        "slide-down-and-fade-in": "slide-down-and-fade-in 0.5s ease-out",
        "slide-left-and-fade-in": "slide-left-and-fade-in 0.5s ease-out",

        // Card animation
        "fade-in": "fade-in 0.5s ease-out",
        "fade-out": "fade-out 0.5s ease-out",
        "fade-in-right": "fade-in-right 0.5s ease-out",
        "fade-in-left": "fade-in-left 0.5s ease-out",
        "fade-in-down": "fade-in-down 0.5s ease-out",
        "fade-in-up": "fade-in-up 0.5s ease-out",
        slideDown: "slideDown 300ms cubic-bezier(0.87, 0, 0.13, 1)",
        slideUp: "slideUp 300ms cubic-bezier(0.87, 0, 0.13, 1)",

        //Modal
        instructionOverlayShow: "instructionOverlayShow 300ms ease-in-out",
        instructionContentShow: "instructionContentShow 300ms ease-in-out",
      },
    },
  },
  plugins: [],
};
