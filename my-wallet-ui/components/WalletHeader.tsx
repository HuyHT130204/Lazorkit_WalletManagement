import { useMemo, useState } from 'react'
import Link from 'next/link'
import { TOKENS } from '@/data/tokens'
import { Icon } from './icons/Icon'
import BackButton from './BackButton'
import Image from 'next/image'
import { useTokenContext } from '@/contexts/TokenContext'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import { useTranslation } from 'next-i18next'
import W3MButton from '@/components/W3MButton'

export default function WalletHeader() {
	const [searchOpen, setSearchOpen] = useState(false)
	const [q, setQ] = useState('')
	const { isAllowedToken } = useTokenContext()
	const { t } = useTranslation('common')
	 
	const results = useMemo(() => {
		const s = q.trim().toLowerCase()
		if (!s) return TOKENS.filter(isAllowedToken)
		return TOKENS.filter((t) => 
			isAllowedToken(t) && (t.name.toLowerCase().includes(s) || t.symbol.toLowerCase().includes(s))
		)
	}, [q, isAllowedToken])

	return (
		<div className="space-y-2">
			{/* Row 1: handle + small icons */}
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<div className="w-9 h-9 rounded-full bg-gray-800" />
					<p className="text-sm text-gray-400">@kayx86</p>
				</div>
				<div className="flex items-center gap-1.5">
					<button className="w-8 h-8 grid place-items-center rounded-lg bg-gray-900/60 border border-gray-800">
						<Icon name="qr" className="w-4 h-4" />
					</button>
					<button
						className="w-8 h-8 grid place-items-center rounded-lg bg-gray-900/60 border border-gray-800"
						onClick={() => setSearchOpen((v) => !v)}
					>
						<Icon name="search" className="w-4 h-4" />
					</button>
					<LanguageSwitcher />
				</div>
			</div>

			{/* Row 2: title + connect modal trigger */}
			<div className="flex items-center justify-between">
				<h1 className="text-2xl font-semibold">{t('wallet.mainAccount')}</h1>
				<W3MButton balance="hide" size="sm" label="Connect Wallet" />
			</div>

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