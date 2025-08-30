import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import Toggle from '@/components/atoms/Toggle'
import { useState } from 'react'
import TabBar from '@/components/TabBar'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import { useWalletContext } from '@/contexts/WalletContext'
import { formatAddress } from '@/utils/wallet'
import { LogOut, User, Shield, Edit3, Check, X, Bell, Lock, Smartphone, Info, ChevronRight, Trash2, AlertTriangle, Copy, ChevronDown } from 'lucide-react'

export default function SettingsPage() {
	const [faceId, setFaceId] = useState(true)
	const [priceAlerts, setPriceAlerts] = useState(false)
	const [devMode, setDevMode] = useState(false)
	const [isEditingName, setIsEditingName] = useState(false)
	const [newWalletName, setNewWalletName] = useState("")
	const [walletListOpen, setWalletListOpen] = useState(false)
	const [copied, setCopied] = useState(false)
	const { t } = useTranslation('common')
	const { wallet, walletName, updateWalletName, logout } = useWalletContext()

	const handleCopy = (address: string, e: React.MouseEvent) => {
		e.stopPropagation()
		navigator.clipboard.writeText(address)
		setCopied(true)
		setTimeout(() => setCopied(false), 1200)
	}

	const walletList = [
		{
			id: 'solana',
			name: 'Solana',
			address: wallet?.address || 'Not connected',
			icon: '🔵',
			network: 'Devnet',
			isActive: true
		},
		{
			id: 'usdc',
			name: 'USDC',
			address: wallet?.address || 'Not connected',
			icon: '💚',
			network: 'Devnet',
			isActive: false
		}
	]
	
	return (
		<>
			<main className="container-page py-6 pb-24 space-y-6">
				<div className="flex items-center justify-between">
					<h1 className="text-2xl font-semibold">{t('settings.title')}</h1>
					<LanguageSwitcher />
				</div>

				{/* Wallet Profile Section */}
				<section className="card-dark">
					<div className="px-4 py-3 border-b border-gray-800">
						<p className="text-sm text-gray-300">Wallet Profile</p>
					</div>
					<div className="px-4 py-4 flex items-center gap-3">
						<div className="w-10 h-10 rounded-full bg-[#9945FF] flex items-center justify-center">
							<span className="text-sm font-bold text-white">L</span>
						</div>
						<div className="flex-1">
							<p className="font-medium">{walletName}</p>
							<p className="text-xs text-gray-400">{wallet ? formatAddress(wallet.address) : 'Not connected'}</p>
						</div>
						<div className="text-right">
							<p className="font-bold text-lg">{wallet ? `${wallet.balance.toFixed(4)} SOL` : '0 SOL'}</p>
							<p className="text-xs text-gray-400">Balance</p>
						</div>
					</div>
				</section>

				{/* Wallet Management Section */}
				<section className="card-dark divide-y divide-gray-800">
					<div className="px-4 py-3">
						<p className="text-sm text-gray-300">Wallet Management</p>
					</div>
					<div className="px-4 py-3 flex items-center justify-between">
						<span>Wallet Name</span>
						{isEditingName ? (
							<div className="flex gap-2 items-center">
								<input
									value={newWalletName}
									onChange={(e) => setNewWalletName(e.target.value)}
									className="px-2 py-1 bg-gray-800 border border-gray-700 rounded text-sm"
									placeholder="Enter wallet name"
								/>
								<button
									onClick={() => {
										if (newWalletName.trim()) {
											updateWalletName(newWalletName.trim())
											setIsEditingName(false)
										}
									}}
									className="p-1 bg-green-600 rounded"
								>
									<Check className="w-3 h-3 text-white" />
								</button>
								<button
									onClick={() => setIsEditingName(false)}
									className="p-1 bg-gray-600 rounded"
								>
									<X className="w-3 h-3 text-white" />
								</button>
							</div>
						) : (
							<div className="flex items-center gap-2">
								<span className="text-sm">{walletName}</span>
								<button
									onClick={() => {
										setNewWalletName(walletName)
										setIsEditingName(true)
									}}
									className="p-1 hover:bg-gray-700 rounded"
								>
									<Edit3 className="w-3 h-3 text-gray-400" />
								</button>
							</div>
						)}
					</div>
					<div className="px-4 py-3 flex items-center justify-between">
						<span>Network</span>
						<span className="text-sm text-emerald-400">Devnet</span>
					</div>
					<div className="px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-gray-800/40" onClick={() => setWalletListOpen(!walletListOpen)}>
						<span>Wallet Accounts</span>
						<div className="flex items-center gap-2">
							<span className="text-sm text-gray-400">2 accounts</span>
							<ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${walletListOpen ? 'rotate-180' : ''}`} />
						</div>
					</div>
					
					{/* Wallet List Dropdown */}
					{walletListOpen && (
						<div className="px-4 py-3 bg-gray-900/50">
							<div className="space-y-3">
								{walletList.map((walletItem) => (
									<div
										key={walletItem.id}
										className={`p-3 rounded-lg flex items-center gap-3 bg-gray-800/50 ${walletItem.isActive ? 'border border-[#9945FF]/30' : ''}`}
									>
										<div className="relative">
											<div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center">
												<span className="text-sm">{walletItem.icon}</span>
											</div>
											{walletItem.isActive && (
												<div className="absolute -top-1 -right-1 w-3 h-3 bg-[#9945FF] rounded-full border-2 border-gray-900"></div>
											)}
										</div>
										<div className="flex-1 min-w-0">
											<div className="flex items-center justify-between">
												<div className="text-sm font-semibold text-white">{walletItem.name}</div>
												<div className="flex items-center gap-1">
													<button
														onClick={(e) => handleCopy(walletItem.address, e)}
														className="p-1 hover:bg-gray-700 rounded transition-colors"
													>
														{copied ? (
															<Check className="w-3 h-3 text-green-400" />
														) : (
															<Copy className="w-3 h-3 text-gray-400" />
														)}
													</button>
												</div>
											</div>
											<div className="flex items-center justify-between mt-1">
												<div className="text-xs text-gray-400 font-mono">{formatAddress(walletItem.address)}</div>
												<div className="text-xs text-emerald-400">{walletItem.network}</div>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					)}
				</section>

				<section className="card-dark divide-y divide-gray-800">
					<div className="px-4 py-3"><p className="text-sm text-gray-300">{t('settings.security')}</p></div>
					<div className="px-4 py-3 flex items-center justify-between"><span>{t('settings.faceIdBiometrics')}</span><Toggle checked={faceId} onChange={setFaceId} /></div>
					<div className="px-4 py-3 flex items-center justify-between"><span>{t('settings.developerMode')}</span><Toggle checked={devMode} onChange={setDevMode} /></div>
				</section>

				<section className="card-dark divide-y divide-gray-800">
					<div className="px-4 py-3"><p className="text-sm text-gray-300">{t('settings.preferences')}</p></div>
					<div className="px-4 py-3">{t('settings.network')}: Devnet</div>
					<div className="px-4 py-3 flex items-center justify-between"><span>{t('settings.priceAlerts')}</span><Toggle checked={priceAlerts} onChange={setPriceAlerts} /></div>
					<div className="px-4 py-3">{t('settings.currency')}: USD</div>
				</section>

				{/* Danger Zone */}
				<section className="card-dark divide-y divide-gray-800">
					<div className="px-4 py-3"><p className="text-sm text-gray-300">Danger Zone</p></div>
					<div className="px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-gray-800/40" onClick={logout}>
						<div className="flex items-center gap-2">
							<LogOut className="w-4 h-4 text-red-400" />
							<span className="text-red-400">Sign Out</span>
						</div>
						<ChevronRight className="w-4 h-4 text-gray-400" />
					</div>
				</section>
			</main>
			<TabBar />
		</>
	)
}

import nextI18NextConfig from '../next-i18next.config.js'
export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale ?? 'en', ['common'], nextI18NextConfig)),
		},
	}
} 