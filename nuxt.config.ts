import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  runtimeConfig: {
    // Update these values via Environment Variables
    // e.g NUXT_PUBLIC_HOST_URL or NUXT_PUBLIC_APICD_URL
    public: {
      CLIENT_APICD_URL: "",
      NIMVIO_PROJECT_ID: "",
    },
  },
  nitro: {
    prerender: {
      routes: ['/']
    }
  },
  vite: {
    plugins: [
      vanillaExtractPlugin({
        emitCssInSsr: true
      })
    ]
  },
  build: {
    transpile: ['@vanilla-extract/css']
  }
})
