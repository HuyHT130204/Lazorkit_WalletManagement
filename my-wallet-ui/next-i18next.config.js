/** @type {import('next-i18next').UserConfig} */
module.exports = {
  defaultNS: 'common',
  fallbackLng: 'en',
  localePath: './public/locales',
  reloadOnPrerender: process.env.NODE_ENV === 'development',
  react: { 
    useSuspense: false 
  },
  interpolation: {
    escapeValue: false,
  },
  debug: false,
}