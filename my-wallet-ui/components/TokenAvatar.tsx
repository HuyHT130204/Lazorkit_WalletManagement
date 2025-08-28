type Props = { src: string; alt: string; size?: number }
export default function TokenAvatar({ src, alt, size = 36 }: Props) {
	return (
		<img
			src={src}
			alt={alt}
			style={{ width: size, height: size }}
			className="rounded-full ring-1 ring-black/20 shadow-sm"
		/>
	)
} 