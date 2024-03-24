import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        prompt: ['Prompt','san-serif']
      },
      animation : {
        'notification' : "4s ease-in-out forwards moveLeftToRight, 5s hideElement 4s forwards ",
      },
      colors: {
        "whiteRabbit": " #f7ede8",
        "wine": " #61004f",
        "white": " white",
        "monadBlue": " #200052",
        "electricIce": " #5feddf",
        "blueTint2": " #3d2487",
        "blueTint": " #ccc4fc",
        "monadPurple": " #836ef9",
        "berry": " #a0055d",
        "relumeLibraryLiterLWhite": "#FFFFFF",
        "relumeLibraryLiterLBlack": "#000000",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark",],
  },
};
export default config;
