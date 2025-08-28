type Props = { title: string; subtitle?: string }
export default function GradientHeadline({ title, subtitle }: Props) {
	return (
		<div className="text-center py-6">
			<h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-b from-blue-200 to-blue-500 bg-clip-text text-transparent">
				{title}
			</h1>
			{subtitle && <p className="text-blue-300/80 text-xl font-semibold">{subtitle}</p>}
		</div>
	)
} 