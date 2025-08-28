import Link from 'next/link'
import { useRouter } from 'next/router'
import { Icon } from './icons/Icon'

const tabs = [
	{ href: '/', label: 'Wallet', icon: 'home' as const },
	{ href: '/activity', label: 'Activity', icon: 'activity' as const },
	{ href: '/browser', label: 'Browser', icon: 'browser' as const },
	{ href: '/settings', label: 'Settings', icon: 'settings' as const },
]

export default function TabBar() {
	const { pathname } = useRouter()
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