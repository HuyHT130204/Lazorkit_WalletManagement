type Method = {
	id: string
	label: string
	icon?: string
}

const methods: Method[] = [
	{ id: 'applepay', label: 'Apple Pay via Unlimit' },
	{ id: 'card', label: 'Card •••• 4242' },
]

export default function PaymentMethod({ onSelect }: { onSelect: (m: Method) => void }) {
	return (
		<div className="space-y-4">
			<h2 className="text-xl font-semibold">Payment Method</h2>
			<div className="card-dark divide-y divide-gray-800">
				{methods.map((m) => (
					<button key={m.id} className="w-full text-left px-4 py-3 hover:bg-gray-800/40" onClick={() => onSelect(m)}>
						{m.label}
					</button>
				))}
			</div>
		</div>
	)
} 