import { ReactNode } from 'react'
import { Icon } from './icons/Icon'

type ActionButtonProps = {
	icon?: ReactNode
	iconName?: Parameters<typeof Icon>[0]['name']
	label: string
	onClick?: () => void
}

export default function ActionButton({ icon, iconName, label, onClick }: ActionButtonProps) {
	return (
		<button
			className="action-btn p-3 rounded-xl bg-gray-900/60 border border-gray-800 w-20"
			onClick={onClick}
		>
			<div className="w-6 h-6 mb-1 text-violet-300">
				{iconName ? <Icon name={iconName} className="w-6 h-6" /> : icon}
			</div>
			<span className="text-xs">{label}</span>
		</button>
	)
} 