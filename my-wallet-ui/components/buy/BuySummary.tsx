import { useTranslation } from 'next-i18next'
import { Icon } from '../icons/Icon'

type SummaryProps = { 
	tokenSymbol: string; 
	amountUsd: number; 
	methodLabel: string;
	onContinue: () => void;
}

export default function BuySummary({ tokenSymbol, amountUsd, methodLabel, onContinue }: SummaryProps) {
	const { t } = useTranslation('common')
	
	return (
		<div className="space-y-4">
			<div className="card-dark p-4 space-y-2 text-sm text-gray-300">
				<div className="flex items-center justify-between"><span>Token</span><span>{tokenSymbol}</span></div>
				<div className="flex items-center justify-between"><span>Amount</span><span>${amountUsd.toFixed(2)}</span></div>
				<div className="flex items-center justify-between"><span>Method</span><span>{methodLabel}</span></div>
			</div>
			
			<button 
				className="w-full btn-primary py-3 flex items-center justify-center gap-2" 
				onClick={onContinue}
			>
				<Icon name="buy" className="w-5 h-5" />
				<span>{t('buy.payNow')}</span>
			</button>
		</div>
	)
} 