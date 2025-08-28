type Props = { checked: boolean; onChange: (v: boolean) => void }
export default function Toggle({ checked, onChange }: Props) {
	return (
		<button
			role="switch"
			aria-checked={checked}
			onClick={() => onChange(!checked)}
			className={`w-12 h-7 rounded-full px-1 transition-colors ${checked ? 'bg-blue-600' : 'bg-gray-700'}`}
		>
			<span className={`block w-5 h-5 bg-white rounded-full transition-transform ${checked ? 'translate-x-5' : ''}`} />
		</button>
	)
} 