import { useState, useMemo } from 'react'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { useTokenContext } from '@/contexts/TokenContext'
import { useToast } from '@/components/Toast'
import TabBar from '@/components/TabBar'
import { TOKENS } from '@/data/tokens'
import type { Token } from '@/data/tokens'

// Token Selector Component
function TokenSelector({ 
  token, 
  onSelect, 
  label, 
  amount, 
  onAmountChange 
}: { 
  token: Token | null
  onSelect: (token: Token) => void
  label: string
  amount: string
  onAmountChange: (amount: string) => void
}) {
  const [isOpen, setIsOpen] = useState(false)
  const { allowedTokens } = useTokenContext()
  const { t } = useTranslation('common')

  return (
    <div className="relative">
      <div className="card-dark p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">{label}</span>
          <span className="text-xs text-gray-500">
            {t('swap.balance')}: {token ? `${token.balance} ${token.symbol}` : '0.00'}
          </span>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 p-2 rounded-xl bg-gray-800/50 hover:bg-gray-800/70 transition-colors"
          >
            {token ? (
              <>
                <Image src={token.icon} alt={token.symbol} width={32} height={32} className="rounded-full" />
                <span className="font-medium">{token.symbol}</span>
              </>
            ) : (
              <>
                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">?</span>
                </div>
                <span className="text-gray-400">{t('swap.selectToken')}</span>
              </>
            )}
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          <div className="flex-1">
            <input
              type="number"
              value={amount}
              onChange={(e) => onAmountChange(e.target.value)}
              placeholder="0.00"
              className="w-full bg-transparent text-2xl font-semibold outline-none placeholder:text-gray-600"
            />
            {token && (
              <div className="text-sm text-gray-400">
                ≈ ${(parseFloat(amount) * token.priceUsd).toFixed(2)} USD
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Token Selection Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50">
          <div className="bg-gray-900 rounded-t-2xl w-full max-w-md max-h-[70vh] overflow-hidden">
            <div className="p-4 border-b border-gray-800">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{t('swap.selectToken')}</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="overflow-y-auto max-h-[60vh]">
              {allowedTokens.map((t) => (
                <button
                  key={t.symbol}
                  onClick={() => {
                    onSelect(t)
                    setIsOpen(false)
                  }}
                  className="w-full flex items-center gap-3 p-4 hover:bg-gray-800/50 transition-colors"
                >
                  <Image src={t.icon} alt={t.symbol} width={40} height={40} className="rounded-full" />
                  <div className="flex-1 text-left">
                    <div className="font-medium">{t.name}</div>
                    <div className="text-sm text-gray-400">{t.symbol}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm">{t.balance}</div>
                    <div className="text-xs text-gray-400">${(t.balance * t.priceUsd).toFixed(2)}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Swap Button Component
function SwapButton({ 
  fromToken, 
  toToken, 
  fromAmount, 
  toAmount, 
  onSwap 
}: { 
  fromToken: Token | null
  toToken: Token | null
  fromAmount: string
  toAmount: string
  onSwap: () => void
}) {
  const isValid = fromToken && toToken && parseFloat(fromAmount) > 0 && parseFloat(toAmount) > 0
  const hasInsufficientBalance = fromToken ? parseFloat(fromAmount) > (fromToken.balance || 0) : false
  const { t } = useTranslation('common')

  return (
    <button
      onClick={onSwap}
      disabled={!isValid || hasInsufficientBalance}
      className={`w-full py-4 rounded-2xl font-semibold transition-all ${
        isValid && !hasInsufficientBalance
          ? 'bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white'
          : 'bg-gray-800 text-gray-400 cursor-not-allowed'
      }`}
    >
      {!fromToken || !toToken
        ? t('swap.selectTokensToSwap')
        : hasInsufficientBalance
        ? t('swap.insufficientBalance')
        : t('swap.swap')}
    </button>
  )
}

// Swap Details Component
function SwapDetails({ 
  fromToken, 
  toToken, 
  fromAmount, 
  toAmount 
}: { 
  fromToken: Token | null
  toToken: Token | null
  fromAmount: string
  toAmount: string
}) {
  const rate = useMemo(() => {
    if (!fromToken || !toToken || !parseFloat(fromAmount)) return null
    return parseFloat(toAmount) / parseFloat(fromAmount)
  }, [fromToken, toToken, fromAmount, toAmount])

  const priceImpact = useMemo(() => {
    if (!fromToken || !toToken) return null
    // Simulate price impact calculation
    return 0.12 // 0.12% price impact
  }, [fromToken, toToken])

  const { t } = useTranslation('common')

  if (!fromToken || !toToken || !parseFloat(fromAmount)) return null

  return (
    <div className="card-dark p-4 space-y-3">
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-400">{t('swap.rate')}</span>
        <span className="text-white">
          1 {fromToken.symbol} = {rate?.toFixed(6)} {toToken.symbol}
        </span>
      </div>
      
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-400">{t('swap.priceImpact')}</span>
        <span className="text-green-400">{priceImpact}%</span>
      </div>
      
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-400">{t('swap.networkFee')}</span>
        <span className="text-white">~$0.00025</span>
      </div>
      
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-400">{t('swap.minimumReceived')}</span>
        <span className="text-white">
          {(parseFloat(toAmount) * 0.995).toFixed(6)} {toToken.symbol}
        </span>
      </div>
    </div>
  )
}

export default function SwapPage() {
	const [fromToken, setFromToken] = useState<Token | null>(TOKENS[0]) // Default to SOL
	const [toToken, setToToken] = useState<Token | null>(TOKENS[1]) // Default to USDC
	const [fromAmount, setFromAmount] = useState('')
	const [toAmount, setToAmount] = useState('')
	const { validateTokenBeforeAction } = useTokenContext()
	const { showToast, ToastContainer } = useToast()
	const { t } = useTranslation('common')

  // Calculate toAmount based on fromAmount and token prices
  useMemo(() => {
    if (fromToken && toToken && parseFloat(fromAmount) > 0) {
      const calculatedAmount = (parseFloat(fromAmount) * fromToken.priceUsd) / toToken.priceUsd
      setToAmount(calculatedAmount.toFixed(6))
    } else {
      setToAmount('')
    }
  }, [fromToken, toToken, fromAmount])

  const handleSwap = () => {
    if (!fromToken || !toToken) {
      showToast(t('swap.pleaseSelectBothTokens'), 'error')
      return
    }

    if (!validateTokenBeforeAction(fromToken) || !validateTokenBeforeAction(toToken)) {
      return
    }

    if (parseFloat(fromAmount) > (fromToken.balance || 0)) {
      showToast(t('swap.insufficientBalance'), 'error')
      return
    }

    // Simulate swap transaction
    showToast(t('swap.swapTransactionSubmitted'), 'success')
    console.log(`Swapping ${fromAmount} ${fromToken.symbol} for ${toAmount} ${toToken.symbol}`)
  }

  const handleSwitchTokens = () => {
    setFromToken(toToken)
    setToToken(fromToken)
    setFromAmount(toAmount)
  }

  return (
    <>
      <main className="container-page py-6 pb-24 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">{t('swap.title')}</h1>
          <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>

        {/* Swap Interface */}
        <div className="space-y-4">
          {/* From Token */}
          <TokenSelector
            token={fromToken}
            onSelect={setFromToken}
            label={t('swap.from')}
            amount={fromAmount}
            onAmountChange={setFromAmount}
          />

          {/* Switch Button */}
          <div className="flex justify-center">
            <button
              onClick={handleSwitchTokens}
              className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
            </button>
          </div>

          {/* To Token */}
          <TokenSelector
            token={toToken}
            onSelect={setToToken}
            label={t('swap.to')}
            amount={toAmount}
            onAmountChange={setToAmount}
          />

          {/* Swap Details */}
          <SwapDetails
            fromToken={fromToken}
            toToken={toToken}
            fromAmount={fromAmount}
            toAmount={toAmount}
          />

          {/* Swap Button */}
          <SwapButton
            fromToken={fromToken}
            toToken={toToken}
            fromAmount={fromAmount}
            toAmount={toAmount}
            onSwap={handleSwap}
          />
        </div>

        {/* Quick Actions */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-400">{t('swap.quickActions')}</h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="card-dark p-3 text-center hover:bg-gray-800/50 transition-colors">
              <div className="text-sm font-medium">{t('common.max')}</div>
              <div className="text-xs text-gray-400">{t('swap.useAllBalance')}</div>
            </button>
            <button className="card-dark p-3 text-center hover:bg-gray-800/50 transition-colors">
              <div className="text-sm font-medium">50%</div>
              <div className="text-xs text-gray-400">{t('swap.halfBalance')}</div>
            </button>
          </div>
        </div>
      </main>
      <TabBar />
      <ToastContainer />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale ?? 'en', ['common'])),
		},
	}
} 