type Props = { children: React.ReactNode; variant?: 'solid' | 'outline' }
export default function Badge({ children, variant = 'outline' }: Props) {
	if (variant === 'solid') {
		return <span className="px-3 py-1 rounded-xl text-xs bg-blue-600/20 text-blue-300 border border-blue-500/30">{children}</span>
	}
	return <span className="px-3 py-1 rounded-xl text-xs text-blue-300 border border-blue-500/40">{children}</span>
} 