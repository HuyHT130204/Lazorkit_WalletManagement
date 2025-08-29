import { useTranslation } from 'next-i18next'

export default function GetStartedCard() {
	const { t } = useTranslation('common')
	
	return (
		<div className="card-dark p-4 flex items-start gap-3">
			<div className="w-10 h-10 rounded-xl bg-violet-600/20 grid place-items-center text-violet-300">✨</div>
			<div className="flex-1">
				<p className="text-sm">{t('wallet.getRealTimeUpdates')}</p>
			</div>
			<button className="text-gray-500">✕</button>
		</div>
	)
} 