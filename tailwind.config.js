/* eslint-disable @typescript-eslint/no-require-imports */

const { colors } = require("./src/colors")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors,
      fontFamily: {
        inter: ["Inter_400Regular"],
        "inter-semibold": ["Inter_600SemiBold"],
        sora: ["Sora_700Bold"],
      },
    },
  },
  plugins: [],
}
