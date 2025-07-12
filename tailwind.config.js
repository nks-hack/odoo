// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./app/**/*.{js,ts,jsx,tsx,mdx}",
//     "*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         border: "hsl(var(--border))",
//         input: "hsl(var(--input))",
//         ring: "hsl(var(--ring))",
//         background: "hsl(var(--background))",
//         foreground: "hsl(var(--foreground))",
//         primary: {
//           DEFAULT: "hsl(var(--primary))",
//           foreground: "hsl(var(--primary-foreground))",
//         },
//         secondary: {
//           DEFAULT: "hsl(var(--secondary))",
//           foreground: "hsl(var(--secondary-foreground))",
//         },
//         destructive: {
//           DEFAULT: "hsl(var(--destructive))",
//           foreground: "hsl(var(--destructive-foreground))",
//         },
//         muted: {
//           DEFAULT: "hsl(var(--muted))",
//           foreground: "hsl(var(--muted-foreground))",
//         },
//         accent: {
//           DEFAULT: "hsl(var(--accent))",
//           foreground: "hsl(var(--accent-foreground))",
//         },
//         popover: {
//           DEFAULT: "hsl(var(--popover))",
//           foreground: "hsl(var(--popover-foreground))",
//         },
//         card: {
//           DEFAULT: "hsl(var(--card))",
//           foreground: "hsl(var(--card-foreground))",
//         },
//       },
//       borderRadius: {
//         lg: "var(--radius)",
//         md: "calc(var(--radius) - 2px)",
//         sm: "calc(var(--radius) - 4px)",
//       },
//       animation: {
//         "fade-in": "fadeIn 0.5s ease-in-out",
//         "slide-up": "slideUp 0.3s ease-out",
//         "bounce-in": "bounceIn 0.6s ease-out",
//       },
//       keyframes: {
//         fadeIn: {
//           "0%": { opacity: "0" },
//           "100%": { opacity: "1" },
//         },
//         slideUp: {
//           "0%": { transform: "translateY(20px)", opacity: "0" },
//           "100%": { transform: "translateY(0)", opacity: "1" },
//         },
//         bounceIn: {
//           "0%": { transform: "scale(0.3)", opacity: "0" },
//           "50%": { transform: "scale(1.05)" },
//           "70%": { transform: "scale(0.9)" },
//           "100%": { transform: "scale(1)", opacity: "1" },
//         },
//       },
//     },
//   },
//   plugins: [],
// }
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Gaming/Cyberpunk Color Palette
        neon: {
          pink: "#ff0080",
          purple: "#8b5cf6",
          blue: "#00d4ff",
          green: "#00ff88",
          yellow: "#ffff00",
          orange: "#ff8800",
        },
        cyber: {
          dark: "#0a0a0f",
          darker: "#050508",
          purple: "#1a0b2e",
          blue: "#16213e",
          pink: "#2d1b3d",
        },
        glow: {
          pink: "rgba(255, 0, 128, 0.5)",
          purple: "rgba(139, 92, 246, 0.5)",
          blue: "rgba(0, 212, 255, 0.5)",
          green: "rgba(0, 255, 136, 0.5)",
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
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
        "bounce-in": "bounceIn 0.6s ease-out",
        "glow-pulse": "glowPulse 2s ease-in-out infinite alternate",
        "neon-flicker": "neonFlicker 1.5s ease-in-out infinite alternate",
        "cyber-scan": "cyberScan 3s linear infinite",
        float: "float 3s ease-in-out infinite",
        "matrix-rain": "matrixRain 20s linear infinite",
        "gradient-shift": "gradientShift 8s ease-in-out infinite",
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
        bounceIn: {
          "0%": { transform: "scale(0.3)", opacity: "0" },
          "50%": { transform: "scale(1.05)" },
          "70%": { transform: "scale(0.9)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        glowPulse: {
          "0%": { boxShadow: "0 0 5px currentColor" },
          "100%": { boxShadow: "0 0 20px currentColor, 0 0 30px currentColor" },
        },
        neonFlicker: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
        cyberScan: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        matrixRain: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      boxShadow: {
        "neon-pink": "0 0 10px #ff0080, 0 0 20px #ff0080, 0 0 30px #ff0080",
        "neon-blue": "0 0 10px #00d4ff, 0 0 20px #00d4ff, 0 0 30px #00d4ff",
        "neon-purple": "0 0 10px #8b5cf6, 0 0 20px #8b5cf6, 0 0 30px #8b5cf6",
        "neon-green": "0 0 10px #00ff88, 0 0 20px #00ff88, 0 0 30px #00ff88",
        "cyber-glow": "0 4px 20px rgba(139, 92, 246, 0.3)",
        "inner-glow": "inset 0 0 10px rgba(139, 92, 246, 0.2)",
      },
      backgroundImage: {
        "cyber-grid":
          "linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)",
        "neon-gradient": "linear-gradient(45deg, #ff0080, #8b5cf6, #00d4ff)",
        "cyber-gradient": "linear-gradient(135deg, #0a0a0f 0%, #1a0b2e 50%, #16213e 100%)",
        "gaming-gradient": "linear-gradient(45deg, #ff0080, #8b5cf6, #00d4ff, #00ff88)",
      },
      backgroundSize: {
        grid: "20px 20px",
      },
      fontFamily: {
        cyber: ["Orbitron", "monospace"],
        gaming: ["Rajdhani", "sans-serif"],
      },
    },
  },
  plugins: [],
}