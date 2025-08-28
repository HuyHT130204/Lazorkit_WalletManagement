import Link from 'next/link'
import TokenRow from './TokenRow'
import type { Token } from '@/data/tokens'

export default function TokenList({ tokens, title = 'Tokens' }: { tokens: Token[]; title?: string }) {
	return (
		<div className="card-dark overflow-hidden">
			<div className="px-4 py-3 border-b border-gray-800/80 text-sm text-gray-300">{title}</div>
			<div>
				{tokens.map((t) => (
					<Link key={t.symbol} href={`/token/${t.symbol.toLowerCase()}`} className="block hover:bg-gray-800/40">
						<TokenRow token={t as any} />
					</Link>
				))}
			</div>
		</div>
	)
} 