import { useAccount, useChainId } from 'wagmi'
import { formatAddress } from '@/utils/format'

export default function WalletDetails() {
	const { address, isConnected } = useAccount()
	const chainId = useChainId()

	if (!isConnected) return null

	return (
		<div className="text-xs text-gray-300">
			<div>Address: {formatAddress(address)}</div>
			<div>Chain ID: {chainId}</div>
		</div>
	)
} 