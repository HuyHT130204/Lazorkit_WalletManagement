import { useTranslation } from 'next-i18next'

export default function PerpsCard() {
	const { t } = useTranslation('common')
	return (
		<div className="card-dark p-4 flex items-start gap-3">
			<div className="w-10 h-10 rounded-xl bg-emerald-600/20 grid place-items-center">🪙</div>
			<div className="flex-1">
				<p className="text-lg font-semibold">{t('wallet.perps')}</p>
				<p className="text-sm text-gray-300">{t('perps.description')}</p>
				<div className="mt-2">
					<button className="text-violet-300">{t('perps.manage')}</button>
				</div>
			</div>
		</div>
	)
} 