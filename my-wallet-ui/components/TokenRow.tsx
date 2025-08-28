import type { Token } from '@/data/tokens'
import TokenAvatar from './TokenAvatar'

export default function TokenRow({ token }: { token: Token }) {
	const fiat = token.balance * token.priceUsd
	const change = token.change24h ?? 0
	const changeColor = change >= 0 ? 'text-emerald-400' : 'text-red-400'
	return (
		<div className="flex items-center py-3 px-4">
			<TokenAvatar src={token.icon} alt={token.symbol} />
			<div className="flex-1 ml-3">
				<p className="text-white font-medium leading-tight">{token.name}</p>
				<p className="text-gray-400 text-xs">{token.balance} {token.symbol}</p>
			</div>
			<div className="text-right">
				<p className="text-white font-medium">${fiat.toFixed(2)}</p>
				<p className={`text-xs ${changeColor}`}>{change >= 0 ? '+' : ''}{change.toFixed(2)}%</p>
			</div>
		</div>
	)
} 