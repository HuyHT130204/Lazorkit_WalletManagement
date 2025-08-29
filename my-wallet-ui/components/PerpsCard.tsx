import { useTranslation } from 'next-i18next'

export default function PerpsCard() {
	const { t } = useTranslation('common')
	return (
		<div className="card-dark p-4">
			<div className="flex items-start justify-between">
				<div className="flex items-start gap-3">
					<div className="w-10 h-10 rounded-xl bg-emerald-600/20 grid place-items-center">🪙</div>
					<div>
						<p className="text-lg font-semibold">{t('wallet.perps')}</p>
						<p className="text-sm text-gray-300">{t('perps.description')}</p>
					</div>
				</div>
				<button className="text-violet-300 hover:text-violet-200 transition-colors">{t('perps.manage')}</button>
			</div>
		</div>
	)
} 