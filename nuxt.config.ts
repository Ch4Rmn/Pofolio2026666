// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  
  // Modules
  modules: [
    '@nuxt/ui',
    '@nuxtjs/supabase',
  ],
  
  // UI Configuration
  ui: {},
  
  // CSS Configuration
  css: ['/assets/css/main.css'],
  
  // Vite Configuration
  vite: {
    // Your Vite configuration
  },
  
  // Nitro Configuration
  nitro: {
    preset: 'cloudflare_pages'
  },
  
  // Runtime Config
  runtimeConfig: {
    public: {
      // Your public runtime config
    }
  },

  // supabase: {
  //   redirect: false
  // }
  supabase: {
    redirectOptions: {
      login: '/auth/login',
      callback: '/',
      exclude: ['/auth/register','/auth/login'] 
    }
  }
})
