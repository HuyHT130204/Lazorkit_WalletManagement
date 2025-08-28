import Badge from '@/components/atoms/Badge'
import TabBar from '@/components/TabBar'

type Tx = { id: string; type: 'receive' | 'send' | 'swap'; token: string; amount: string; time: string }
const txs: Tx[] = [
	{ id: '1', type: 'receive', token: 'USDC', amount: '+$25.00', time: '2h ago' },
	{ id: '2', type: 'send', token: 'SOL', amount: '-0.002 SOL', time: '1d ago' },
	{ id: '3', type: 'swap', token: 'BTC', amount: '+$1.10', time: '3d ago' },
]

export default function ActivityPage() {
	return (
		<>
			<main className="container-page py-6 pb-24 space-y-4">
				<div>
					<h1 className="text-2xl font-semibold">Activity</h1>
					<p className="text-sm text-gray-400">Last 7 days: <span className="text-emerald-400">+$26.10</span></p>
				</div>

				<div className="flex gap-2">
					<Badge variant="solid">All</Badge>
					<Badge>Send</Badge>
					<Badge>Receive</Badge>
					<Badge>Swap</Badge>
				</div>

				<div className="card-dark divide-y divide-gray-800">
					{txs.map((t) => (
						<div key={t.id} className="flex items-center justify-between px-4 py-3">
							<div className="flex items-center gap-3">
								<div className="w-8 h-8 rounded-full bg-gray-800 grid place-items-center">
									{t.type === 'receive' ? '⬇' : t.type === 'send' ? '⬆' : '⇄'}
								</div>
								<div>
									<p className="font-medium capitalize">{t.type} {t.token}</p>
									<p className="text-xs text-gray-400">{t.time}</p>
								</div>
							</div>
							<p className={t.amount.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}>{t.amount}</p>
						</div>
					))}
				</div>
			</main>
			<TabBar />
		</>
	)
} 