import withMT from "@material-tailwind/html/utils/withMT";

/** @type {import('tailwindcss').Config} */
module.exports = withMT({
  content: ["./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      keyframes: {
        slideInFromLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInFromRight: {
          '0%': { transform: 'translateX(+50%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        popup: {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        meteor: {
          "0%": { transform: "rotate(215deg) translateX(0)", opacity: 1 },
          "70%": { opacity: 1 },
          "100%": {
            transform: "rotate(215deg) translateX(-500px)",
            opacity: 0,
          },
        },
        keyframes: {
          slideInFromBottom: {
            '50%': { transform: 'translateY(100%)', opacity: '0' },
            '100%': { transform: 'translateY(0)', opacity: '1' },
          },
        },
      },
      animation: {
        slideInFromLeft: 'slideInFromLeft 1s ease-out forwards',
        slideInFromRight: 'slideInFromRight 0.5s ease-in forwards',
        popup: 'popup 0.5s ease-out forwards',
        meteoreffect: "meteor 0.5s linear infinite",
        slideInFromBottom: 'slideInFromBottom 0.5s ease-out',
      },
    },
  },
  plugins: [require('flowbite/plugin')],
})

