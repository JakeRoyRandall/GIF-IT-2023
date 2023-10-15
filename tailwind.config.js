/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        100: "25rem",
        104: "26rem",
        108: "27rem"
      },
      backgroundColor: {
        button: "#FFD464",
        "button-hover": "#75D3F3",
        "button-active": "#31A2C9",
      },
      boxShadow: {
        button: "0px 4px 0px #F5C340",
        hover: "0px 4px 0px #31A2C9"
      }
    },
  },
  plugins: [],
}

