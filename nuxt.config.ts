// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@vueuse/nuxt", "@nuxt/ui"],
  ui: {
    icons: ["heroicons", "simple-icons", "mdi", "noto-v1"],
  },
  runtimeConfig: {
    session: {
      secretKey: process.env.SESSION_SECRET_KEY,
    },
    backend: {
      secretKey: process.env.BACKEND_SECRET_KEY,
    },
  },
  colorMode: {
    preference: "dark",
  },
});
