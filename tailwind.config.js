/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-red": "var(--color-primary-red)",
        "primary-orange": "var(--color-primary-orange)",
        "primary-background": "var(--color-primary-background)",
        "secondary-background": "var(--color-secondary-background)",
        "tertiary-background": "var(--color-tertiary-background)",
        "primary-grey": "var(--color-primary-grey)",
        "secondary-grey": "var(--color-secondary-grey)",
        "primary-text": "var(--color-primary-text)",
        "secondary-text": "var(--color-secondary-text)",
        "tertiary-text": "var(--color-tertiary-text)",
        "accent-text": "var(--color-accent-text)",
        "success-green": "var(--color-success-green)",
        "primary-overlay": "var(--color-primary-overlay)",
        "secondary-overlay": "var(--color-secondary-overlay)",
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
