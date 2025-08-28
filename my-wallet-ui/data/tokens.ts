export type Token = {
	name: string
	symbol: string
	icon: string
	priceUsd: number
	balance: number
	change24h?: number
}

export const TOKENS: Token[] = [
	{ symbol: 'SOL', name: 'Solana', icon: '/icons/solana.svg', priceUsd: 168.5, balance: 0.00905, change24h: 6.43 },
	{ symbol: 'USDC', name: 'USD Coin', icon: '/icons/usdc.svg', priceUsd: 1, balance: 1, change24h: 0.01 },
]

export function getTokenBySymbol(symbol: string): Token | undefined {
	return TOKENS.find((t) => t.symbol.toLowerCase() === symbol.toLowerCase())
} 