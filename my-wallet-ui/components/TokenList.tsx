import Link from 'next/link'
import TokenRow from './TokenRow'
import type { Token } from '@/data/tokens'
import { useTokenContext } from '@/contexts/TokenContext'

export default function TokenList({ tokens, title = 'Tokens' }: { tokens: Token[]; title?: string }) {
	const { allowedTokens } = useTokenContext();
	
	// Filter to only allowed tokens
	const filteredTokens = tokens.filter(token => 
		allowedTokens.some(allowed => allowed.symbol === token.symbol)
	);

	return (
		<div className="card-dark overflow-hidden">
			<div className="px-4 py-3 border-b border-gray-800/80 text-sm text-gray-300">{title}</div>
			<div>
				{filteredTokens.map((t) => (
					<Link key={t.symbol} href={`/token/${t.symbol.toLowerCase()}`} className="block hover:bg-gray-800/40">
						<TokenRow token={t} />
					</Link>
				))}
			</div>
		</div>
	)
} 