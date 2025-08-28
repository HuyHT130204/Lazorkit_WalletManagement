import { Icon } from './icons/Icon'

type Token = { name: string; symbol: string; icon: string }

const popular: Token[] = [
	{ name: 'Ethereum', symbol: 'ETH', icon: '/icons/eth.svg' },
	{ name: 'Sui', symbol: 'SUI', icon: '/icons/sui.svg' },
	{ name: 'Polygon', symbol: 'POL', icon: '/icons/pol.svg' },
	{ name: 'Bitcoin', symbol: 'BTC', icon: '/icons/btc.svg' },
]

export default function PopularTokens() {
	return (
		<div className="card-dark overflow-hidden">
			<div className="px-4 py-3 border-b border-gray-800/80 text-sm text-gray-300">Popular tokens</div>
			<div className="divide-y divide-gray-800">
				{popular.map((t) => (
					<div key={t.symbol} className="flex items-center justify-between px-4 py-3">
						<div className="flex items-center gap-3">
							<img src={t.icon} className="w-8 h-8 rounded-full" />
							<div>
								<p className="font-medium">{t.name}</p>
								<p className="text-xs text-gray-400">{t.symbol}</p>
							</div>
						</div>
						<span className="text-gray-500">›</span>
					</div>
				))}
			</div>
		</div>
	)
} 