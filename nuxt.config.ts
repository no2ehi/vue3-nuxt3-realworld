// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
  ],
  css: [
    '~/assets/main.css',
    '~/assets/style.css'
  ],
  runtimeConfig: {
		public: {
			baseUrl: process.env.BASE_URL,
		},
	},
})
