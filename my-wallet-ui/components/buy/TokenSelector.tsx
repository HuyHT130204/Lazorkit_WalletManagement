type Token = {
	name: string
	symbol: string
	icon: string
}

const popular: Token[] = [
	{ name: 'Solana', symbol: 'SOL', icon: '/icons/solana.svg' },
	{ name: 'USD Coin', symbol: 'USDC', icon: '/icons/usdc.svg' },
	{ name: 'Ethereum', symbol: 'ETH', icon: '/icons/eth.svg' },
]

export default function TokenSelector({ onSelect }: { onSelect: (t: Token) => void }) {
	return (
		<div className="space-y-4">
			<h2 className="text-xl font-semibold">Select Token</h2>
			<div className="card-dark divide-y divide-gray-800">
				{popular.map((t) => (
					<button
						key={t.symbol}
						className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-800/40"
						onClick={() => onSelect(t)}
					>
						<div className="flex items-center gap-3">
							<img src={t.icon} className="w-8 h-8 rounded-full" />
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