// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  pages: true,
  srcDir: 'src/',
  devtools: { enabled: false },
  
  modules: [
    'nuxt-icon',   
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/tailwindcss',
    
  ],
})
