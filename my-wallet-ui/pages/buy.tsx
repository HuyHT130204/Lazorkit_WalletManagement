import { useEffect, useState } from 'react'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import TokenSelector from '@/components/buy/TokenSelector'
import AmountInput from '@/components/buy/AmountInput'
import PaymentMethod from '@/components/buy/PaymentMethod'
import BuySummary from '@/components/buy/BuySummary'
import CompletePaymentSheet from '@/components/CompletePaymentSheet'
import BackButton from '@/components/BackButton'
import { useToast } from '@/components/Toast'

export default function BuyPage() {
	const [step, setStep] = useState<'token' | 'amount' | 'method' | 'summary' | 'sheet'>('token')
	const [token, setToken] = useState<{ name: string; symbol: string } | null>(null)
	const [amount, setAmount] = useState<number>(0)
	const [fiat, setFiat] = useState<'USD' | 'EUR' | 'VND'>('USD')
	const [method, setMethod] = useState<{ id: string; label: string } | null>(null)
	const { showToast, ToastContainer } = useToast()
	const { t } = useTranslation('common')

	useEffect(() => {
		const handler = () => setStep('sheet')
		window.addEventListener('open-payment-sheet', handler as EventListener)
		return () => window.removeEventListener('open-payment-sheet', handler as EventListener)
	}, [])

	return (
		<>
		<main className="container-page py-6 space-y-6">
			<header className="flex items-center gap-3">
				<BackButton onClick={() => history.back()} />
				<h1 className="text-2xl font-semibold">{t('buy.title')} {token?.symbol ?? ''}</h1>
			</header>

			{step === 'token' && (
				<TokenSelector
					onSelect={(t) => {
						setToken(t)
						setStep('amount')
					}}
				/>
			)}

			{step === 'amount' && (
				<AmountInput
					onContinue={(amt, currency) => {
						setAmount(amt)
						setFiat(currency)
						setStep('method')
					}}
				/>
			)}

			{step === 'method' && (
				<PaymentMethod
					onSelect={(m) => {
						setMethod(m)
						setStep('summary')
					}}
				/>
			)}

			{step === 'summary' && token && method && (
				<BuySummary tokenSymbol={token.symbol} amountUsd={amount} methodLabel={`${method.label} • ${fiat}`} />
			)}

			{step === 'sheet' && (
				<CompletePaymentSheet
					amountUsd={amount}
					currency={token?.symbol ?? 'USDC'}
					onClose={() => setStep('summary')}
						onPay={() => showToast(t('buy.paymentConfirmed'), 'success')}
				/>
			)}
		</main>
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