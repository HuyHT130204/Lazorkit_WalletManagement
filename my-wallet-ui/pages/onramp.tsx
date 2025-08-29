import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import GradientHeadline from '@/components/GradientHeadline'
import Badge from '@/components/atoms/Badge'

export default function OnrampPage() {
	const { t } = useTranslation('common')
	
	return (
		<main className="container-page py-6 pb-24 space-y-6">
			<GradientHeadline title={t('buy.title')} subtitle={t('onramp.instantlySecure')} />
			<div className="flex gap-2 justify-center">
				<Badge variant="solid">{t('onramp.faceIdLogin')}</Badge>
				<Badge variant="solid">{t('onramp.scanAndPay')}</Badge>
				<Badge variant="solid">{t('onramp.under30Seconds')}</Badge>
			</div>

			<section className="card-dark p-6 space-y-4">
				<h3 className="text-xl font-semibold text-center">{t('wallet.getStarted')}</h3>
				<div className="space-y-2">
					<label className="text-sm text-gray-300">{t('swap.from')}</label>
					<div className="card-dark p-3">🇻🇳 VND <span className="text-gray-400 float-right">100,000</span></div>
					<p className="text-xs text-gray-500">1 USDC ≈ 26.367 VND</p>
				</div>
				<div className="space-y-2">
					<label className="text-sm text-gray-300">{t('swap.to')}</label>
					<div className="card-dark p-3">🪙 USDC <span className="text-gray-400 float-right">0.00</span></div>
				</div>
				<div className="grid grid-cols-4 gap-2">
					{[1,5,10,25].map(v => <button key={v} className="btn-outline py-2">{v}</button>)}
				</div>
				<button className="w-full btn-primary py-3">{t('buy.title')} 0 USDC</button>
				<p className="text-center text-xs text-gray-400">{t('onramp.noPasswordsInstantSetup')}</p>
			</section>
		</main>
	)
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale ?? 'en', ['common'])),
		},
	}
} 