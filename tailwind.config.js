/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-red": "#DC3535",
        "primary-orange": "#D17842",
        "primary-black": "#0C0F14",
        "primary-dark-grey": "#141921",
        "secondary-dark-grey": "#21262E",
        "primary-grey": "#252A32",
        "secondary-grey": "#252A32",
        "primary-light-grey": "#52555A",
        "secondary-light-grey": "#AEAEAE",
        "primary-white": "#FFFFFF",
        "primary-black-rgba": "rgba(12,15,20,0.5)",
        "secondary-black-rgba": "rgba(0,0,0,0.7)",
      },
      fontFamily: {
        "poppins-thin": ["Poppins-Thin", "sans-serif"],
        "poppins-extralight": ["Poppins-ExtraLight", "sans-serif"],
        "poppins-light": ["Poppins-Light", "sans-serif"],
        "poppins-regular": ["Poppins-Regular", "sans-serif"],
        "poppins-medium": ["Poppins-Medium", "sans-serif"],
        "poppins-semibold": ["Poppins-SemiBold", "sans-serif"],
        "poppins-bold": ["Poppins-Bold", "sans-serif"],
        "poppins-extrabold": ["Poppins-ExtraBold", "sans-serif"],
        "poppins-black": ["Poppins-Black", "sans-serif"],
      },
    },
  },
  plugins: [],
};
