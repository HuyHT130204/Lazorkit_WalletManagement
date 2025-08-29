import ConnectWalletButton from '@/components/ConnectWalletButton'
import WalletDetails from '@/components/WalletDetails'

export default function WalletPanel() {
	return (
		<div className="card-dark px-3 py-3 space-y-2 border border-gray-800">
			<div className="text-sm font-medium">Wallet</div>
			<ConnectWalletButton />
			<WalletDetails />
		</div>
	)
} 