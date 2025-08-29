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
  localePath: typeof window === 'undefined' ? require('path').resolve('./public/locales') : '/locales',
  reloadOnPrerender: process.env.NODE_ENV === 'development',
  react: { useSuspense: false },
  interpolation: {
    escapeValue: false,
  },
  debug: process.env.NODE_ENV === 'development',
}