// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css', '~/assets/css/slide-text.css'],
  app: {
    head: {
      htmlAttrs: { lang: 'pl' },
      title: 'Karty Lenormand – Justyna | Profesjonalne czytanie z kart',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Profesjonalne czytanie z kart Lenormand. Pojedyncze pytanie lub pełny rozkład – jasne, konkretne odpowiedzi na nurtujące Cię pytania.'
        },
        { name: 'theme-color', content: '#262645' }
      ],
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32.png' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;700&family=Josefin+Sans:wght@400;700&family=Quintessential&display=swap'
        },
        { rel: 'preload', as: 'image', href: '/slides/slide-1.jpg', fetchpriority: 'high' }
      ]
    }
  }
})
