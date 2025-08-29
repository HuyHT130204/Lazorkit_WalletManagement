import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { formatAddress } from '@/utils/format'

export default function ConnectWalletButton() {
	const { address, isConnected } = useAccount()
	const { connectors, connect, isPending } = useConnect()
	const { disconnect } = useDisconnect()

	if (isConnected) {
		return (
			<button
				className="px-3 py-1.5 rounded-lg bg-gray-900/60 border border-gray-800 text-sm"
				onClick={() => disconnect()}
			>
				{formatAddress(address)} · Disconnect
			</button>
		)
	}

	return (
		<div className="flex gap-2">
			{connectors.map((c) => (
				<button
					key={c.uid}
					className="px-3 py-1.5 rounded-lg bg-emerald-900/40 border border-emerald-800 text-sm"
					disabled={!c.ready || isPending}
					onClick={() => connect({ connector: c })}
				>
					Connect {c.name}
				</button>
			))}
		</div>
	)
} 