import Toggle from '@/components/atoms/Toggle'
import { useState } from 'react'
import TabBar from '@/components/TabBar'

export default function SettingsPage() {
	const [faceId, setFaceId] = useState(true)
	const [priceAlerts, setPriceAlerts] = useState(false)
	const [devMode, setDevMode] = useState(false)
	return (
		<>
			<main className="container-page py-6 pb-24 space-y-6">
				<h1 className="text-2xl font-semibold">Settings</h1>

				<section className="card-dark">
					<div className="px-4 py-3 border-b border-gray-800"><p className="text-sm text-gray-300">Profile</p></div>
					<div className="px-4 py-4 flex items-center gap-3">
						<div className="w-10 h-10 rounded-full bg-gray-800" />
						<div>
							<p className="font-medium">@kayx86</p>
							<p className="text-xs text-gray-400">Main Account</p>
						</div>
					</div>
				</section>

				<section className="card-dark divide-y divide-gray-800">
					<div className="px-4 py-3"><p className="text-sm text-gray-300">Security</p></div>
					<div className="px-4 py-3 flex items-center justify-between"><span>Face ID / Biometrics</span><Toggle checked={faceId} onChange={setFaceId} /></div>
					<div className="px-4 py-3 flex items-center justify-between"><span>Developer Mode</span><Toggle checked={devMode} onChange={setDevMode} /></div>
				</section>

				<section className="card-dark divide-y divide-gray-800">
					<div className="px-4 py-3"><p className="text-sm text-gray-300">Preferences</p></div>
					<div className="px-4 py-3">Network: Mainnet</div>
					<div className="px-4 py-3 flex items-center justify-between"><span>Price alerts</span><Toggle checked={priceAlerts} onChange={setPriceAlerts} /></div>
					<div className="px-4 py-3">Currency: USD</div>
				</section>
			</main>
			<TabBar />
		</>
	)
} 