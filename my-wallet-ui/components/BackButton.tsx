import { Icon } from './icons/Icon'

type Props = { onClick?: () => void }
export default function BackButton({ onClick }: Props) {
	return (
		<button
			onClick={onClick}
			className="w-9 h-9 grid place-items-center rounded-xl bg-gray-900/60 border border-gray-800 text-gray-400"
			aria-label="Back"
		>
			<Icon name="chevron-left" className="w-5 h-5" />
		</button>
	)
} 