// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/content", "@nuxtjs/tailwindcss", "@nuxtjs/google-fonts"],
  extends: "@nuxt-themes/typography",
  googleFonts: {
    families: {
      Salsa: true,
      Caveat: true,
      "Roboto+Mono": true,
      "IBM+Plex+Mono": true,
    },
  },
  plugins: [],
});
