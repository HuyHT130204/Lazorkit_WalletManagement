type SummaryProps = { tokenSymbol: string; amountUsd: number; methodLabel: string }

export default function BuySummary({ tokenSymbol, amountUsd, methodLabel }: SummaryProps) {
	return (
		<div className="card-dark p-4 space-y-2 text-sm text-gray-300">
			<div className="flex items-center justify-between"><span>Token</span><span>{tokenSymbol}</span></div>
			<div className="flex items-center justify-between"><span>Amount</span><span>${amountUsd.toFixed(2)}</span></div>
			<div className="flex items-center justify-between"><span>Method</span><span>{methodLabel}</span></div>
		</div>
	)
} 