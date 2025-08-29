export function formatAddress(address?: string, size: number = 4) {
	if (!address) return ''
	const start = address.slice(0, 2 + size)
	const end = address.slice(-size)
	return `${start}…${end}`
} 