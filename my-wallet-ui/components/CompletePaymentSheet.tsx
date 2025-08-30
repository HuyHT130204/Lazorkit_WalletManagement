import { useTranslation } from 'next-i18next'
import { Icon } from './icons/Icon'

type Props = {
	amountUsd: number
	currency: string
	onClose: () => void
	onPay: () => void
}

export default function CompletePaymentSheet({ amountUsd, currency, onClose, onPay }: Props) {
	const { t } = useTranslation('common')
	
	return (
		<div className="fixed inset-0 z-30 flex items-center justify-center p-4">
			<div className="absolute inset-0 bg-black/60 backdrop-blur" onClick={onClose} />
			<div className="relative w-full max-w-md card-dark border-blue-900/40">
				<div className="flex justify-end p-4 text-gray-400">
					<button onClick={onClose} className="hover:text-white transition-colors">✕</button>
				</div>
				<div className="px-6 pb-6 space-y-6">
					<h3 className="text-2xl font-semibold text-center">{t('buy.completePayment')}</h3>
					<p className="text-center text-gray-400">
						{t('buy.securePaymentProcessing')} <span className="text-blue-300 font-medium">${amountUsd.toFixed(2)} {currency}</span>
					</p>
					
					<div className="mx-auto w-40 h-32 rounded-2xl grid place-items-center" style={{boxShadow:'inset 0 0 0 1px rgba(59,130,246,0.25)'}}>
						{/* Credit card icon */}
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12 text-blue-300">
							<rect x="2" y="5" width="20" height="14" rx="2" ry="2"/>
							<line x1="2" y1="10" x2="22" y2="10"/>
						</svg>
					</div>
					
					<div className="card-dark p-4 border border-blue-900/40 rounded-xl">
						<div className="text-xl font-semibold">
							${amountUsd.toFixed(2)} {currency} <span className="text-sm text-gray-400">≈ 26.339 VND</span>
						</div>
						<button 
							className="w-full btn-primary py-3 mt-3 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 transition-all" 
							onClick={onPay}
						>
							<Icon name="buy" className="w-5 h-5" />
							<span>{t('buy.payNow')}</span>
						</button>
					</div>
					
					<div className="card-dark p-4 rounded-xl">
						<div className="flex items-center gap-2 mb-2">
							<div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
								<svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
									<path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
								</svg>
							</div>
							<p className="text-emerald-400 font-medium">{t('buy.securePayment')}</p>
						</div>
						<p className="text-xs text-gray-400">{t('buy.paymentProcessedSecurely')}</p>
					</div>
				</div>
			</div>
		</div>
	)
} 