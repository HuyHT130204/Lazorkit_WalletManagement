import Image from 'next/image'

type Props = { image: string; name: string; collection: string }
export default function CollectibleCard({ image, name, collection }: Props) {
	return (
		<div className="card-dark overflow-hidden">
			<Image src={image} alt={name} width={640} height={160} className="w-full h-40 object-cover" />
			<div className="p-3">
				<p className="font-medium">{name}</p>
				<p className="text-xs text-gray-400">{collection}</p>
			</div>
		</div>
	)
} 