type SummaryProps = {
	tokenSymbol: string
	amountUsd: number
	methodLabel: string
}

export default function BuySummary({ tokenSymbol, amountUsd, methodLabel }: SummaryProps) {
	return (
		<div className="space-y-4">
			<h2 className="text-xl font-semibold">Complete Payment</h2>
			<div className="card-dark p-6 space-y-3">
				<div className="text-sm text-gray-400">Secure payment processing for</div>
				<div className="text-2xl font-bold">${amountUsd.toFixed(2)} {tokenSymbol}</div>
				<div className="text-xs text-gray-400">Method: {methodLabel}</div>
				<button
					className="w-full btn-primary py-3"
					onClick={() => window.dispatchEvent(new CustomEvent('open-payment-sheet'))}
				>
					Pay Now
				</button>
				<p className="text-center text-xs text-gray-500">Your payment is processed securely through our trusted partner.</p>
			</div>
		</div>
	)
} 