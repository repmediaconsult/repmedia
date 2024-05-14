// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["@/assets/css/index.css", "@/assets/css/font.css"],
  modules: ["@nuxt/ui"],
  colorMode: {
    preference: "light",
  },
});
