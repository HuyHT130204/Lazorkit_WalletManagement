import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { getTokenBySymbol } from '@/data/tokens'
import ActionButton from '@/components/ActionButton'
import TabBar from '@/components/TabBar'
import BackButton from '@/components/BackButton'
import Image from 'next/image'
import { useTokenContext } from '@/contexts/TokenContext'
import { useToast } from '@/components/Toast'
import { useEffect } from 'react'

function Sparkline() {
	const points = [2,4,3,6,8,7,9,12,10,13]
	const path = points.map((p,i)=>`${i*10},${20 - p}`).join(' ')
	return (
		<svg viewBox="0 0 100 20" className="w-full h-8">
			<polyline fill="none" stroke="#60a5fa" strokeWidth="2" points={path} />
		</svg>
	)
}

export default function TokenDetail() {
	const router = useRouter()
	const { symbol } = router.query
	const { isAllowedToken, validateTokenBeforeAction, showReceiveWarning } = useTokenContext()
	const { showToast, ToastContainer } = useToast()
	const { t } = useTranslation('common')
	const token = typeof symbol === 'string' ? getTokenBySymbol(symbol) : undefined

	// Redirect if token is not allowed
	useEffect(() => {
		if (token && !isAllowedToken(token)) {
			showToast(t('tokenRestriction.tokenNotSupported'), 'error');
			router.push('/');
		}
	}, [token, isAllowedToken, router, showToast, t]);

	if (!token) return null
	if (!isAllowedToken(token)) return null
	const fiat = (token.balance * token.priceUsd).toFixed(2)

	return (
		<>
			<main className="container-page py-6 space-y-6 pb-24">
				<header className="flex items-center gap-3">
					<BackButton onClick={() => router.back()} />
					<h1 className="text-2xl font-semibold">{token.name}</h1>
				</header>

				<section className="text-center space-y-1">
					<Image src={token.icon} alt={token.symbol} width={56} height={56} className="w-14 h-14 mx-auto rounded-full" />
					<div className="text-4xl font-bold">${fiat}</div>
					<p className="text-gray-400 text-sm">{token.balance} {token.symbol} • ${token.priceUsd}/ {token.symbol}</p>
				</section>

				<div className="card-dark p-3"><Sparkline /></div>

				<section className="grid grid-cols-4 gap-3">
					<ActionButton 
						iconName="qr" 
						label={t('wallet.receive')} 
						onClick={showReceiveWarning}
					/>
					<ActionButton 
						iconName="send" 
						label={t('wallet.send')} 
						onClick={() => {
							if (!validateTokenBeforeAction(token)) return;
							// Proceed with send operation
						}}
					/>
					<Link href="/swap">
						<ActionButton iconName="swap" label={t('wallet.swap')} />
					</Link>
					<Link href="/buy"><ActionButton iconName="buy" label={t('wallet.buy')} /></Link>
				</section>

				<section className="card-dark p-4 text-sm text-gray-400">
					{t('activity.noRecentTransactions')}
				</section>
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