import { useState } from 'react'

type Props = { tabs: string[]; onChange?: (idx: number) => void }
export default function SegmentedTabs({ tabs, onChange }: Props) {
	const [active, setActive] = useState(0)
	return (
		<div className="bg-gray-900/60 border border-gray-800 rounded-xl p-1 inline-flex">
			{tabs.map((t, i) => (
				<button
					key={t}
					className={`px-3 py-1 text-sm rounded-lg ${i === active ? 'bg-gray-800 text-white' : 'text-gray-400'}`}
					onClick={() => {
						setActive(i)
						onChange?.(i)
					}}
				>
					{t}
				</button>
			))}
		</div>
	)
} 