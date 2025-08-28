type Props = { title: string; desc: string; icon: string; href?: string }
export default function DappCard({ title, desc, icon, href = '#' }: Props) {
	return (
		<a href={href} className="card-dark p-4 flex items-center gap-3 hover:border-blue-500/40">
			<img src={icon} className="w-10 h-10 rounded-xl" />
			<div>
				<p className="font-medium">{title}</p>
				<p className="text-xs text-gray-400">{desc}</p>
			</div>
		</a>
	)
} 