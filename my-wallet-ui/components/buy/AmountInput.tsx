import { useState } from 'react'

type Props = {
	currency?: 'USD' | 'EUR' | 'VND'
	quotePerUnit?: number // SOL per 1 USD baseline
	onContinue: (amount: number, currency: 'USD' | 'EUR' | 'VND') => void
}

const FX: Record<'USD' | 'EUR' | 'VND', number> = { USD: 1, EUR: 0.92, VND: 25300 }

export default function AmountInput({ currency = 'USD', quotePerUnit = 0.0046, onContinue }: Props) {
	const [amount, setAmount] = useState<number>(0)
	const [fiat, setFiat] = useState<'USD' | 'EUR' | 'VND'>(currency)
	const usdAmount = fiat === 'USD' ? amount : fiat === 'EUR' ? amount / FX.EUR : amount / FX.VND
	const tokenAmount = usdAmount * quotePerUnit

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<h2 className="text-xl font-semibold">Buy SOL</h2>
				<div className="relative">
					<select
						value={fiat}
						onChange={(e) => setFiat(e.target.value as 'USD' | 'EUR' | 'VND')}
						className="bg-gray-900/60 border border-gray-800 rounded-xl px-3 py-2 pr-8 text-sm text-white hover:bg-gray-800/80 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500/50 appearance-none"
					>
						<option value="USD" className="bg-gray-900 text-white">USD</option>
						<option value="EUR" className="bg-gray-900 text-white">EUR</option>
						<option value="VND" className="bg-gray-900 text-white">VND</option>
					</select>
					<div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
						<svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
						</svg>
					</div>
				</div>
			</div>

			<div className="text-center">
				<div className="text-6xl font-bold">{fiat === 'VND' ? '' : '$'}{amount}</div>
				<p className="text-sm text-gray-400">{tokenAmount.toFixed(5)} SOL ↕</p>
			</div>

			<div className="grid grid-cols-3 gap-3">
				{[25, 50, 100].map((v) => (
					<button 
						key={v} 
						className="rounded-2xl bg-gray-900/60 border border-gray-800 py-3 hover:bg-gray-800/80 transition-colors text-white" 
						onClick={() => setAmount(v)}
					>
						{fiat === 'VND' ? v * FX.VND : v}{fiat === 'USD' ? '$' : ''}
					</button>
				))}
			</div>

			<div className="grid grid-cols-3 gap-3 select-none">
				{['1','2','3','4','5','6','7','8','9','.','0','⌫'].map((k) => (
					<button
						key={k}
						className="rounded-2xl bg-gray-900/60 border border-gray-800 py-5 text-lg hover:bg-gray-800/80 transition-colors text-white"
						onClick={() => {
							if (k === '⌫') {
								setAmount((prev) => Math.floor(prev / 10))
								return
							}
							if (k === '.') return
							setAmount((prev) => Number(`${prev}${k}`))
						}}
					>
						{k}
					</button>
				))}
			</div>

			<button 
				className="w-full bg-violet-600 hover:bg-violet-700 text-white font-medium py-4 px-6 rounded-xl transition-colors" 
				onClick={() => onContinue(amount, fiat)}
			>
				Continue
			</button>
		</div>
	)
} 