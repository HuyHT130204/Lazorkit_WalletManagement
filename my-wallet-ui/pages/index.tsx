import Link from 'next/link'
import { useState } from 'react'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import ActionButton from '@/components/ActionButton'
import TokenList from '@/components/TokenList'
import WalletHeader from '@/components/WalletHeader'
import GetStartedCard from '@/components/GetStartedCard'
import PopularTokens from '@/components/PopularTokens'
import TabBar from '@/components/TabBar'
import SegmentedTabs from '@/components/SegmentedTabs'
import PerpsCard from '@/components/PerpsCard'
import CollectibleCard from '@/components/CollectibleCard'
import { TOKENS } from '@/data/tokens'
import { useTokenContext } from '@/contexts/TokenContext'

export default function Home() {
	const [tab, setTab] = useState(0)
	const { validateTokenBeforeAction, showReceiveWarning } = useTokenContext()
	const { t } = useTranslation('common')
	
	return (
		<>
			<main className="container-page py-6 space-y-6 pb-24">
				<WalletHeader />
				
				{/* Language Switcher moved into header actions; removing duplicate here */}

				{/* Token Restriction Banner */}
				<div className="bg-blue-900/20 border border-blue-800 rounded-lg p-3 mb-4">
					<p className="text-blue-300 text-sm">
						{t('tokenRestriction.banner')}
					</p>
				</div>

				<section className="text-center space-y-1">
					<div className="text-5xl font-bold">$1.96</div>
					<div className="flex items-center justify-center gap-2 text-emerald-400 text-sm">
						<span>+ $0.12</span>
						<span className="bg-emerald-950/60 text-emerald-300 px-2 py-0.5 rounded-md">+6.43%</span>
					</div>
				</section>

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
							// This would be replaced with actual send logic
							const token = TOKENS[0]; // Example token
							if (!validateTokenBeforeAction(token)) return;
							// Proceed with send
						}}
					/>
					<Link href="/swap">
						<ActionButton iconName="swap" label={t('wallet.swap')} />
					</Link>
					<Link href="/buy">
						<ActionButton iconName="buy" label={t('wallet.buy')} />
					</Link>
				</section>

				<GetStartedCard />
				<PerpsCard />

				<div className="flex items-center justify-between">
					<h2 className="text-xl font-semibold">{tab === 0 ? t('wallet.tokens') : t('wallet.collectibles')}</h2>
					<SegmentedTabs tabs={[t('wallet.tokens'), t('wallet.collectibles')]} onChange={setTab} />
				</div>

				{tab === 0 ? (
					<>
						<TokenList tokens={TOKENS} />
						<PopularTokens />
					</>
				) : (
					<div className="grid grid-cols-2 gap-3">
						<CollectibleCard image="/icons/solana.svg" name="Solana OG" collection="Solana" />
						<CollectibleCard image="/icons/usdc.svg" name="USDC Badge" collection="USD Coin" />
					</div>
								)}
				</main>
			<TabBar />
		</>
	)
}

import nextI18NextConfig from '../next-i18next.config.js'
export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale ?? 'en', ['common'], nextI18NextConfig)),
		},
	}
}
