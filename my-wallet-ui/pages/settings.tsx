import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import Toggle from '@/components/atoms/Toggle'
import { useState } from 'react'
import TabBar from '@/components/TabBar'
import LanguageSwitcher from '@/components/LanguageSwitcher'

export default function SettingsPage() {
	const [faceId, setFaceId] = useState(true)
	const [priceAlerts, setPriceAlerts] = useState(false)
	const [devMode, setDevMode] = useState(false)
	const { t } = useTranslation('common')
	
	return (
		<>
			<main className="container-page py-6 pb-24 space-y-6">
				<div className="flex items-center justify-between">
					<h1 className="text-2xl font-semibold">{t('settings.title')}</h1>
					<LanguageSwitcher />
				</div>

				<section className="card-dark">
					<div className="px-4 py-3 border-b border-gray-800"><p className="text-sm text-gray-300">{t('settings.profile')}</p></div>
					<div className="px-4 py-4 flex items-center gap-3">
						<div className="w-10 h-10 rounded-full bg-gray-800" />
						<div>
							<p className="font-medium">@kayx86</p>
							<p className="text-xs text-gray-400">{t('wallet.mainAccount')}</p>
						</div>
					</div>
				</section>

				<section className="card-dark divide-y divide-gray-800">
					<div className="px-4 py-3"><p className="text-sm text-gray-300">{t('settings.security')}</p></div>
					<div className="px-4 py-3 flex items-center justify-between"><span>{t('settings.faceIdBiometrics')}</span><Toggle checked={faceId} onChange={setFaceId} /></div>
					<div className="px-4 py-3 flex items-center justify-between"><span>{t('settings.developerMode')}</span><Toggle checked={devMode} onChange={setDevMode} /></div>
				</section>

				<section className="card-dark divide-y divide-gray-800">
					<div className="px-4 py-3"><p className="text-sm text-gray-300">{t('settings.preferences')}</p></div>
					<div className="px-4 py-3">{t('settings.network')}: Mainnet</div>
					<div className="px-4 py-3 flex items-center justify-between"><span>{t('settings.priceAlerts')}</span><Toggle checked={priceAlerts} onChange={setPriceAlerts} /></div>
					<div className="px-4 py-3">{t('settings.currency')}: USD</div>
				</section>
			</main>
			<TabBar />
		</>
	)
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale ?? 'en', ['common'])),
		},
	}
} 