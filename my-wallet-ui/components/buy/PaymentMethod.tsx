import { useTranslation } from 'next-i18next'

type Method = {
	id: string
	label: string
	icon?: string
}

export default function PaymentMethod({ onSelect }: { onSelect: (m: Method) => void }) {
	const { t } = useTranslation('common')
	const methods: Method[] = [
		{ id: 'applepay', label: t('buy.applePayViaUnlimit') },
		{ id: 'card', label: t('buy.cardMasked', { last4: '4242' }) },
	]
	return (
		<div className="space-y-4">
			<h2 className="text-xl font-semibold">{t('buy.selectPaymentMethod')}</h2>
			<div className="card-dark divide-y divide-gray-800">
				{methods.map((m) => (
					<button key={m.id} className="w-full text-left px-4 py-3 hover:bg-gray-800/40" onClick={() => onSelect(m)}>
						{m.label}
					</button>
				))}
			</div>
		</div>
	)
} 