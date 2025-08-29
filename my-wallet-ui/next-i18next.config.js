/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'vi'],
    localeDetection: false,
  },
  defaultNS: 'common',
  ns: ['common'],
  fallbackLng: 'en',
  // Use relative path instead of absolute path to avoid issues on Vercel
  localePath: './public/locales',
  reloadOnPrerender: process.env.NODE_ENV === 'development',
  react: { useSuspense: false },
}