import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { Icon } from './icons/Icon'

export default function TabBar() {
	const { pathname } = useRouter()
	const { t } = useTranslation('common')
	
	const tabs = [
		{ href: '/', label: t('navigation.wallet'), icon: 'home' as const },
		{ href: '/activity', label: t('navigation.activity'), icon: 'activity' as const },
		{ href: '/swap', label: t('navigation.swap'), icon: 'swap' as const },
		{ href: '/settings', label: t('navigation.settings'), icon: 'settings' as const },
	]

	return (
		<nav className="fixed bottom-0 inset-x-0 z-10 border-t border-gray-800 bg-black/70 backdrop-blur">
			<div className="container-page">
				<ul className="grid grid-cols-4 py-3">
					{tabs.map((t) => {
						const active = pathname === t.href
						return (
							<li key={t.href} className="text-center">
								<Link href={t.href} className="inline-flex flex-col items-center gap-1 text-xs">
									<Icon name={t.icon} className={`w-5 h-5 ${active ? 'text-violet-400' : 'text-gray-400'}`} />
									<span className={active ? 'text-white' : 'text-gray-400'}>{t.label}</span>
								</Link>
							</li>
						)
					})}
				</ul>
			</div>
		</nav>
	)
} 