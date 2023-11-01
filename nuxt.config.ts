// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {enabled: true},
    modules: ["@nuxt/ui", '@nuxtjs/turnstile'],
    ui: {
        icons: ["heroicons", "simple-icons", "mdi", "noto-v1"],
    },
    turnstile: {
        siteKey: process.env.TURNSTILE_SITE_KEY,
    },
    runtimeConfig: {
        backend: {
            secretKey: process.env.BACKEND_SECRET_KEY,
        },
        turnstile: {
            secretKey: process.env.TURNSTILE_SECRET_KEY,
        }
    }
});
