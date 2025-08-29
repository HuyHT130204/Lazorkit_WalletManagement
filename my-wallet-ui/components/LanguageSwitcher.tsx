import { useRouter } from 'next/router'
import { useState } from 'react'

export default function LanguageSwitcher() {
  const router = useRouter()
  const { locale, pathname, asPath, query } = router
  const [isOpen, setIsOpen] = useState(false)

  const changeLanguage = (newLocale: string) => {
    setIsOpen(false)
    router.push({ pathname, query }, asPath, { locale: newLocale })
  }

  const label = (locale === 'vi' ? 'VIE' : 'ENG')

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 px-2 py-2 hover:bg-gray-800/60 rounded-lg transition-colors"
        aria-label="language switcher"
      >
        <span className="text-sm font-medium">{label}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-28 bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-50">
          <div className="py-1">
            <button
              onClick={() => changeLanguage('en')}
              className={`w-full px-3 py-2 text-left hover:bg-gray-800 transition-colors ${
                locale === 'en' ? 'bg-violet-600/20 text-violet-400' : 'text-gray-300'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => changeLanguage('vi')}
              className={`w-full px-3 py-2 text-left hover:bg-gray-800 transition-colors ${
                locale === 'vi' ? 'bg-violet-600/20 text-violet-400' : 'text-gray-300'
              }`}
            >
              VI
            </button>
          </div>
        </div>
      )}
    </div>
  )
} 