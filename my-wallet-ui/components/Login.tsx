"use client"
import React, { useState, useEffect } from "react"
import { Fingerprint, Shield, Sparkles, Zap, Check, X, AlertCircle, Scan, Clock } from "lucide-react"
import { useWallet } from "@lazorkit/wallet"
import { useWalletContext } from "@/contexts/WalletContext"
import LanguageSwitcher from '@/components/LanguageSwitcher'
import { useTranslation } from 'next-i18next'

const Login: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const [authStep, setAuthStep] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [isSdkReady, setIsSdkReady] = useState(false)
  const [particles, setParticles] = useState<Array<{
    id: number
    left: number
    top: number
    duration: number
    delay: number
  }>>([])
  const [isClient, setIsClient] = useState(false)
  const { t } = useTranslation('common')

  const { login } = useWalletContext()
  const { connect, isConnected, smartWalletPubkey } = useWallet()

  // Chỉ tạo particles trên client side để tránh hydration mismatch
  useEffect(() => {
    setIsClient(true)
    setParticles(
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: 6 + Math.random() * 8,
        delay: Math.random() * 4
      }))
    )
  }, [])

  // Typing animation states
  const [typingText, setTypingText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [loopNum, setLoopNum] = useState(0)

  const textArray = [
    t('login.feature1', 'Zero-Knowledge Authentication'),
    t('login.feature2', 'Multi-Signature Support'),
    t('login.feature3', 'Hardware-Level Encryption')
  ]

  // Typing animation effect
  useEffect(() => {
    const tick = () => {
      const i = loopNum % textArray.length
      const fullText = textArray[i]
      
      if (isDeleting) {
        setTypingText(fullText.substring(0, typingText.length - 1))
      } else {
        setTypingText(fullText.substring(0, typingText.length + 1))
      }

      if (!isDeleting && typingText === fullText) {
        setTimeout(() => setIsDeleting(true), 1500)
      } else if (isDeleting && typingText === '') {
        setIsDeleting(false)
        setLoopNum(loopNum + 1)
      }
    }

    const timer = setTimeout(tick, isDeleting ? 100 : 150)
    return () => clearTimeout(timer)
  }, [typingText, isDeleting, loopNum, textArray])

  // Kiểm tra SDK sẵn sàng
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSdkReady(true)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Kiểm tra nếu đã có smartWalletPubkey từ trước
  useEffect(() => {
    if (smartWalletPubkey) {
      login({
        smartWalletAddress: smartWalletPubkey.toBase58(),
        account: { smartWallet: smartWalletPubkey },
      })
    }
  }, [smartWalletPubkey, login])

  const handleConnect = async () => {
    if (!isSdkReady) {
      setError(t('login.sdkNotReady', 'LazorKit SDK is not ready. Please wait a moment and try again.'))
      return
    }
    setIsDialogOpen(true)
    setIsAuthenticating(true)
    setAuthStep(0)
    setError(null)
    try {
      setTimeout(() => setAuthStep(1), 600)
      await connect();
      setTimeout(() => setAuthStep(2), 1200)
      // Đợi SDK cập nhật state
      const checkConnected = () => {
        if (isConnected && smartWalletPubkey) {
          setIsAuthenticating(false)
          setAuthStep(3)
          setTimeout(() => {
            setIsDialogOpen(false)
            login({ smartWalletAddress: smartWalletPubkey.toBase58(), account: { smartWallet: smartWalletPubkey } })
          }, 1000)
        } else {
          setTimeout(checkConnected, 200)
        }
      }
      checkConnected();
    } catch (error) {
      console.error("Login failed:", error)
      setError(error instanceof Error ? error.message : t('login.authFailed', 'Authentication failed'))
      setIsAuthenticating(false)
      setAuthStep(0)
    }
  }

  const getAuthMessage = () => {
    switch (authStep) {
      case 0:
        return t('login.initConnection', 'Initializing secure connection...')
      case 1:
        return t('login.creatingPasskey', 'Creating passkey authentication...')
      case 2:
        return t('login.setupWallet', 'Setting up your Solana smart wallet...')
      case 3:
        return t('login.syncingWallet', 'Syncing wallet state...')
      case 4:
        return t('login.authSuccess', 'Authentication successful!')
      default:
        return t('login.pleaseAuth', 'Please authenticate with your device')
    }
  }

  return (
    <div className="min-h-screen w-full bg-black relative overflow-hidden">
      {/* Background animation */}
      <div className="absolute inset-0">
        {/* Floating particles - chỉ render khi đã ở client side */}
        {isClient && particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-blue-500 rounded-full opacity-20"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animation: `float ${particle.duration}s ease-in-out infinite`,
              animationDelay: `${particle.delay}s`
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">
        {/* Header - Mobile optimized */}
        <div className="text-center mb-12 px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-2">
            {t('login.title', 'LazorKit Wallet')}
          </h1>
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-blue-500">
            {t('login.subtitle', 'Management')}
          </h2>
        </div>

        {/* Feature buttons - Compact design */}
        <div className="flex justify-center items-center gap-2 mb-12 px-4">
          <div className="flex items-center space-x-1.5 px-2.5 py-1.5 bg-gray-900/80 border border-green-500 rounded-full">
            <div className="w-3 h-3 rounded-full border border-green-500 flex items-center justify-center">
              <div className="w-0.5 h-0.5 bg-green-500 rounded-full" />
            </div>
            <span className="text-white font-medium text-xs whitespace-nowrap">{t('login.faceIdLogin', 'Face ID Login')}</span>
          </div>
          
          <div className="flex items-center space-x-1.5 px-2.5 py-1.5 bg-gray-900/80 border border-gray-600 rounded-full">
            <div className="w-3 h-3 flex items-center justify-center">
              <div className="w-2 h-2 border border-blue-500 rounded-sm flex items-center justify-center">
                <div className="w-0.5 h-0.5 bg-blue-500 rounded-full" />
              </div>
            </div>
            <span className="text-white font-medium text-xs whitespace-nowrap">{t('login.scanPay', 'Scan & Pay')}</span>
          </div>
          
          <div className="flex items-center space-x-1.5 px-2.5 py-1.5 bg-gray-900/80 border border-gray-600 rounded-full">
            <Clock className="w-3 h-3 text-blue-500" />
            <span className="text-white font-medium text-xs whitespace-nowrap">{t('login.under30Seconds', 'Under 30 Seconds')}</span>
          </div>
        </div>

        {/* Login card */}
        <div className="w-full max-w-sm mx-4">
          <div className="relative">
            {/* Blue shadow behind card - larger */}
            <div className="absolute -inset-4 bg-blue-500/30 rounded-3xl blur-2xl transform translate-y-3"></div>
            <div className="relative bg-[#111111e6] border border-gray-700 rounded-2xl p-6 shadow-2xl backdrop-blur-sm">
            {/* Card header */}
            <div className="text-center mb-6">
              <div className="w-14 h-14 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-3 border border-gray-600">
                <Fingerprint className="w-7 h-7 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{t('login.loginWithPasskey', 'Login with Passkey')}</h3>
              <p className="text-gray-400 text-sm mb-4">{t('login.useBiometric', 'Use biometric authentication or device PIN')}</p>
              
              {/* Typing animation content - maintains same height */}
              <div className="mb-6" style={{ height: '48px' }}>
                <div className="flex items-center justify-center min-h-[48px]">
                  <div className="text-center">
                    <div className="text-sm font-medium text-blue-400 mb-1">
                      {typingText}
                      <span className="animate-pulse">|</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {t('login.tagline', 'Advanced • Reliable • Innovative')}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Feature highlights */}
              <div className="grid grid-cols-2 gap-2 mb-6">
                <div className="bg-gray-800/50 rounded-lg p-2 border border-gray-700">
                  <Shield className="w-4 h-4 text-blue-500 mx-auto mb-1" />
                  <p className="text-xs text-gray-400">{t('login.endToEndEncrypted', 'End-to-End Encrypted')}</p>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-2 border border-gray-700">
                  <Zap className="w-4 h-4 text-yellow-500 mx-auto mb-1" />
                  <p className="text-xs text-gray-400">{t('login.lightningFast', 'Lightning Fast')}</p>
                </div>
              </div>
            </div>

            {/* Login button */}
            <button
              onClick={handleConnect}
              disabled={isAuthenticating || !isSdkReady}
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 mb-4"
            >
              <div className="flex items-center justify-center space-x-2">
                <Fingerprint className="w-4 h-4" />
                <span className="text-sm">
                  {isAuthenticating ? t('login.authenticating', 'Authenticating...') : isSdkReady ? t('login.login', 'Login') : t('login.loadingSdk', 'Loading SDK...')}
                </span>
              </div>
            </button>

            {/* Trust indicators */}
            <div className="flex items-center justify-center space-x-4 text-xs text-gray-400">
              <div className="flex items-center space-x-1">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                <span>{t('login.secure', 'Secure')}</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                <span>{t('login.fast', 'Fast')}</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-1.5 h-1.5 bg-white rounded-full" />
                <span>{t('login.private', 'Private')}</span>
              </div>
            </div>
          </div>
          </div>
        </div>

        {/* Footer with language switcher and LazorKit intro */}
        <div className="mt-12 flex items-center justify-between max-w-md mx-auto px-4">
          <div className="text-gray-400 text-xs">
            <p>{t('login.shortIntro', 'Next-gen wallet platform')}</p>
          </div>
          <div className="flex items-center">
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      {/* Authentication Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-md">
            <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 shadow-2xl">
              {/* Close button */}
              <button
                onClick={() => {
                  setIsDialogOpen(false)
                  setIsAuthenticating(false)
                  setError(null)
                }}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-800 hover:bg-gray-700 border border-gray-600 flex items-center justify-center transition-all duration-200"
              >
                <X className="w-4 h-4 text-white" />
              </button>

              {/* Header */}
              <div className="text-center space-y-2 mb-8">
                <div className="flex items-center justify-center space-x-3">
                  <div className="p-2 bg-gray-800 rounded-full">
                    <Fingerprint className="w-6 h-6 text-blue-500" />
                  </div>
                  <h2 className="text-xl font-bold text-white">{t('login.authenticateWithPasskey', 'Authenticate with Passkey')}</h2>
                </div>
                <p className="text-gray-400 text-sm">{t('login.creatingWallet', 'Creating and connecting your Solana wallet')}</p>
              </div>

              <div className="flex flex-col items-center space-y-6">
                {error ? (
                  <>
                    {/* Error state */}
                    <div className="relative">
                      <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center border-2 border-red-500">
                        <AlertCircle className="w-12 h-12 text-red-500" />
                      </div>
                    </div>
                    <div className="text-center space-y-2">
                      <p className="text-sm font-medium text-red-400">{t('login.authFailed', 'Authentication failed')}</p>
                      <p className="text-xs text-gray-400">{error}</p>
                      <button
                        onClick={() => {
                          setError(null)
                          handleConnect()
                        }}
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        {t('login.tryAgain', 'Try Again')}
                      </button>
                    </div>
                  </>
                ) : isAuthenticating ? (
                  <>
                    {/* Animated authentication icon */}
                    <div className="relative">
                      <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center relative border-2 border-blue-500">
                        <Fingerprint className="w-12 h-12 text-blue-500 animate-pulse" />
                      </div>
                    </div>
                    {/* Progress steps */}
                    <div className="flex items-center space-x-2">
                      {[0, 1, 2, 3].map((step) => (
                        <div key={step} className="flex items-center">
                          <div
                            className={`w-2 h-2 rounded-full transition-all duration-500 ${
                              step <= authStep ? "bg-blue-500" : "bg-gray-700"
                            }`}
                          />
                          {step < 3 && (
                            <div
                              className={`w-6 h-0.5 mx-1 transition-all duration-500 ${
                                step < authStep ? "bg-blue-500" : "bg-gray-700"
                              }`}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="text-center space-y-3">
                      <p className="text-sm font-medium text-white">{getAuthMessage()}</p>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Success state */}
                    <div className="relative">
                      <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center border-2 border-green-500">
                        <Check className="w-12 h-12 text-green-500" />
                      </div>
                    </div>
                    <div className="text-center space-y-2">
                      <p className="text-sm font-medium text-white">{t('login.walletReady', 'Wallet is ready to use!')}</p>
                      <p className="text-xs text-gray-400">{t('login.redirecting', 'Redirecting to your wallet...')}</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.2;
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  )
}

export default Login
