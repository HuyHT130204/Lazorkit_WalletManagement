import Image from 'next/image'
import { useTranslation } from 'next-i18next'

type Token = {
	name: string
	symbol: string
	icon: string
}

export default function TokenSelector({ onSelect }: { onSelect: (t: Token) => void }) {
	const { t } = useTranslation('common')
	const popular: Token[] = [
		{ name: t('tokens.solana'), symbol: 'SOL', icon: '/icons/solana.svg' },
		{ name: t('tokens.usdCoin'), symbol: 'USDC', icon: '/icons/usdc.svg' },
	]
	return (
		<div className="space-y-4">
			<h2 className="text-xl font-semibold">{t('buy.selectToken')}</h2>
			<div className="card-dark divide-y divide-gray-800">
				{popular.map((t) => (
					<button
						key={t.symbol}
						className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-800/40"
						onClick={() => onSelect(t)}
					>
						<div className="flex items-center gap-3">
							<Image src={t.icon} alt={t.symbol} width={32} height={32} className="rounded-full" />
							<div>
								<p className="font-medium">{t.name}</p>
								<p className="text-xs text-gray-400">{t.symbol}</p>
							</div>
						</div>
						<span className="text-gray-400">›</span>
					</button>
				))}
			</div>
		</div>
	)
} 