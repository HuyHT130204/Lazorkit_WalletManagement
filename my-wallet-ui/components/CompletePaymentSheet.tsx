import { Icon } from './icons/Icon'

type Props = {
	amountUsd: number
	currency: string
	onClose: () => void
	onPay: () => void
}

export default function CompletePaymentSheet({ amountUsd, currency, onClose, onPay }: Props) {
	return (
		<div className="fixed inset-0 z-30 flex items-center justify-center p-4">
			<div className="absolute inset-0 bg-black/60 backdrop-blur" onClick={onClose} />
			<div className="relative w-full max-w-md card-dark border-blue-900/40">
				<div className="flex justify-end p-4 text-gray-400">
					<button onClick={onClose}>✕</button>
				</div>
				<div className="px-6 pb-6 space-y-6">
					<h3 className="text-2xl font-semibold text-center">Complete Payment</h3>
					<p className="text-center text-gray-400">Secure payment processing for <span className="text-blue-300 font-medium">${amountUsd.toFixed(2)} {currency}</span></p>
					<div className="mx-auto w-40 h-32 rounded-2xl grid place-items-center" style={{boxShadow:'inset 0 0 0 1px rgba(59,130,246,0.25)'}}>
						<Icon name="buy" className="w-10 h-10 text-blue-300" />
					</div>
					<div className="card-dark p-4 border border-blue-900/40">
						<div className="text-xl font-semibold">${amountUsd.toFixed(2)} {currency} <span className="text-sm text-gray-400">≈ 26.339 VND</span></div>
						<button className="w-full btn-primary py-3 mt-3 flex items-center justify-center gap-2" onClick={onPay}>
							<Icon name="buy" className="w-5 h-5" />
							<span>Pay Now</span>
						</button>
					</div>
					<div className="card-dark p-4">
						<p className="text-emerald-400">Secure Payment</p>
						<p className="text-xs text-gray-400">Your payment is processed securely through our trusted payment partner</p>
					</div>
				</div>
			</div>
		</div>
	)
} 