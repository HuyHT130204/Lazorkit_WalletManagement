import { useRouter } from 'next/router'
import { useState, useRef, useEffect } from 'react'

export default function LanguageSwitcher() {
  const router = useRouter()
  const { locale, pathname, asPath, query } = router
  const [isOpen, setIsOpen] = useState(false)
  const [dropdownPosition, setDropdownPosition] = useState<'top' | 'bottom'>('bottom')
  const buttonRef = useRef<HTMLButtonElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const changeLanguage = (newLocale: string) => {
    setIsOpen(false)
    router.push({ pathname, query }, asPath, { locale: newLocale })
  }

  // Kiểm tra vị trí để quyết định dropdown hiển thị phía trên hay dưới
  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const dropdownHeight = 80 // Ước tính chiều cao dropdown
      
      // Nếu không đủ không gian phía dưới, hiển thị phía trên
      if (buttonRect.bottom + dropdownHeight > windowHeight) {
        setDropdownPosition('top')
      } else {
        setDropdownPosition('bottom')
      }
    }
  }, [isOpen])

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
          buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const label = (locale === 'vi' ? 'VIE' : 'ENG')

  return (
    <div className="relative">
      <button
        ref={buttonRef}
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
        <div 
          ref={dropdownRef}
          className={`absolute right-0 w-28 bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-50 ${
            dropdownPosition === 'top' 
              ? 'bottom-full mb-2' 
              : 'top-full mt-2'
          }`}
        >
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