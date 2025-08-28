export default function PerpsCard() {
	return (
		<div className="card-dark p-4 flex items-start gap-3">
			<div className="w-10 h-10 rounded-xl bg-emerald-600/20 grid place-items-center">🪙</div>
			<div className="flex-1">
				<p className="text-lg font-semibold">Perps</p>
				<p className="text-sm text-gray-300">Use perps to trade on an asset's future price with leverage</p>
			</div>
			<button className="text-violet-300">Manage</button>
		</div>
	)
} 