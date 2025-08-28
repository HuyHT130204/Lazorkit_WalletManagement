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
	{ symbol: 'BTC', name: 'Bitcoin', icon: '/icons/btc.svg', priceUsd: 65000, balance: 0.00002, change24h: 2.3 },
	{ symbol: 'ETH', name: 'Ethereum', icon: '/icons/eth.svg', priceUsd: 3300, balance: 0, change24h: -1.2 },
	{ symbol: 'SUI', name: 'Sui', icon: '/icons/sui.svg', priceUsd: 1.2, balance: 0, change24h: 4.1 },
	{ symbol: 'POL', name: 'Polygon', icon: '/icons/pol.svg', priceUsd: 0.72, balance: 0, change24h: 0.8 },
]

export function getTokenBySymbol(symbol: string): Token | undefined {
	return TOKENS.find((t) => t.symbol.toLowerCase() === symbol.toLowerCase())
} 