type Props = { image: string; name: string; collection: string }
export default function CollectibleCard({ image, name, collection }: Props) {
	return (
		<div className="card-dark overflow-hidden">
			<img src={image} className="w-full h-40 object-cover" />
			<div className="p-3">
				<p className="font-medium">{name}</p>
				<p className="text-xs text-gray-400">{collection}</p>
			</div>
		</div>
	)
} 