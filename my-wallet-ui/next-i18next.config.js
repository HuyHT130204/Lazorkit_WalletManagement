const path = require('path')

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
  // Use absolute path based on this config file's directory to avoid resolution issues on Vercel
  localePath: path.resolve(__dirname, './public/locales'),
  reloadOnPrerender: process.env.NODE_ENV === 'development',
  react: { useSuspense: false },
} 