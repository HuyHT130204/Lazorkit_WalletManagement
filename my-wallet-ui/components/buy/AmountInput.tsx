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
				<select
					value={fiat}
					onChange={(e) => setFiat(e.target.value as 'USD' | 'EUR' | 'VND')}
					className="bg-transparent border border-gray-700 rounded-lg px-2 py-1 text-sm"
				>
					<option value="USD">USD</option>
					<option value="EUR">EUR</option>
					<option value="VND">VND</option>
				</select>
			</div>

			<div className="text-center">
				<div className="text-6xl font-bold">{fiat === 'VND' ? '' : '$'}{amount}</div>
				<p className="text-sm text-gray-400">{tokenAmount.toFixed(5)} SOL ↕</p>
			</div>

			<div className="grid grid-cols-3 gap-3">
				{[25, 50, 100].map((v) => (
					<button key={v} className="rounded-2xl bg-gray-900/60 border border-gray-800 py-3" onClick={() => setAmount(v)}>{fiat === 'VND' ? v * FX.VND : v}{fiat === 'USD' ? '$' : ''}</button>
				))}
			</div>

			<div className="grid grid-cols-3 gap-3 select-none">
				{['1','2','3','4','5','6','7','8','9','.','0','⌫'].map((k) => (
					<button
						key={k}
						className="rounded-2xl bg-gray-900/60 border border-gray-800 py-5 text-lg hover:bg-gray-800"
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

			<button className="w-full btn-primary py-4" onClick={() => onContinue(amount, fiat)}>
				Continue
			</button>
		</div>
	)
} 