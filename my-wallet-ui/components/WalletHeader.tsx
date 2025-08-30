import { useMemo, useState } from 'react'
import Link from 'next/link'
import { TOKENS } from '@/data/tokens'
import { Icon } from './icons/Icon'
import BackButton from './BackButton'
import Image from 'next/image'
import { useTokenContext } from '@/contexts/TokenContext'
import { useWalletContext } from '@/contexts/WalletContext'
import { WalletSelector } from './WalletSelector'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import { useTranslation } from 'next-i18next'
import { formatAddress } from '@/utils/wallet'
import { ChevronDown, Copy, Check } from 'lucide-react'

export default function WalletHeader() {
	const [searchOpen, setSearchOpen] = useState(false)
	const [walletDropdownOpen, setWalletDropdownOpen] = useState(false)
	const [q, setQ] = useState('')
	const [copied, setCopied] = useState(false)
	const { isAllowedToken } = useTokenContext()
	const { wallet, walletName } = useWalletContext()
	const { t } = useTranslation('common')
	 
	const results = useMemo(() => {
		const s = q.trim().toLowerCase()
		if (!s) return TOKENS.filter(isAllowedToken)
		return TOKENS.filter((t) => 
			isAllowedToken(t) && (t.name.toLowerCase().includes(s) || t.symbol.toLowerCase().includes(s))
		)
	}, [q, isAllowedToken])

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
		<div className="space-y-2">
			{/* Top Row - @kayx86 + 3 Icons */}
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<div className="w-9 h-9 rounded-full bg-gray-800" />
					<div>
						<p className="text-sm text-gray-400">@kayx86</p>
					</div>
				</div>
				<div className="flex items-center gap-2">
					<button className="w-9 h-9 grid place-items-center rounded-xl bg-gray-900/60 border border-gray-800">
						<Icon name="scan" className="w-5 h-5" />
					</button>
					<button
						className="w-9 h-9 grid place-items-center rounded-xl bg-gray-900/60 border border-gray-800"
						onClick={() => setSearchOpen((v) => !v)}
					>
						<Icon name="search" className="w-5 h-5" />
					</button>
					<LanguageSwitcher />
				</div>
			</div>

			{/* Bottom Row - Main Account + Wallet Button */}
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-semibold">{t('wallet.mainAccount')}</h1>
				</div>
				<div className="relative">
					{wallet ? (
						<button
							onClick={() => setWalletDropdownOpen(!walletDropdownOpen)}
							className="flex items-center gap-2 px-3 py-2 bg-gray-900/60 border border-gray-800 rounded-xl hover:bg-gray-800 transition-all duration-200"
						>
							<div className="w-5 h-5 rounded-full bg-[#9945FF] flex items-center justify-center">
								<span className="text-xs font-bold text-white">L</span>
							</div>
							<div className="text-sm font-medium text-white">{formatAddress(wallet.address)}</div>
							<ChevronDown className={`w-3 h-3 text-gray-400 transition-transform duration-200 ${walletDropdownOpen ? 'rotate-180' : ''}`} />
						</button>
					) : (
						<button className="px-3 py-2 bg-gray-900/60 border border-gray-800 rounded-xl text-white font-medium text-sm">
							Connect Wallet
						</button>
					)}

					{/* Wallet Dropdown - Compact Design */}
					{walletDropdownOpen && wallet && (
						<>
							<div className="fixed inset-0 z-40" onClick={() => setWalletDropdownOpen(false)} />
							<div className="absolute top-full right-0 mt-2 w-64 card-dark z-50 overflow-hidden">
								<div className="p-3">
									<div className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">WALLET ACCOUNTS</div>
									{walletList.map((walletItem) => (
										<div
											key={walletItem.id}
											className={`p-3 rounded-lg cursor-pointer transition-all duration-200 flex items-center gap-3 hover:bg-gray-800/50 ${walletItem.isActive ? 'bg-gray-800/30 border border-[#9945FF]/30' : ''}`}
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
						</>
					)}
				</div>
			</div>

			{/* Search Modal */}
			{searchOpen && (
				<div className="fixed inset-0 z-20 p-4 backdrop-blur bg-black/60">
					<div className="container-page space-y-3">
						<div className="flex items-center gap-2">
							<BackButton onClick={() => setSearchOpen(false)} />
							<input
								placeholder={t('common.search') + ' tokens, NFTs...'}
								value={q}
								onChange={(e) => setQ(e.target.value)}
								className="w-full px-4 py-3 rounded-2xl bg-gray-900 border border-gray-800 outline-none"
							/>
						</div>
						<div className="card-dark divide-y divide-gray-800 max-h-[50vh] overflow-auto">
							{results.map((t) => (
								<Link
									key={t.symbol}
									href={`/token/${t.symbol.toLowerCase()}`}
									className="flex items-center gap-3 px-4 py-3 hover:bg-gray-800/40"
									onClick={() => setSearchOpen(false)}
								>
									<Image src={t.icon} alt={t.symbol} width={28} height={28} className="rounded-full" />
									<div className="flex-1">
										<p className="font-medium">{t.name}</p>
										<p className="text-xs text-gray-400">{t.symbol}</p>
									</div>
								</Link>
							))}
						</div>
					</div>
				</div>
			)}
		</div>
	)
} 