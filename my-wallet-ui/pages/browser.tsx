import DappCard from '@/components/DappCard'
import Badge from '@/components/atoms/Badge'
import TabBar from '@/components/TabBar'

export default function BrowserPage() {
	return (
		<>
			<main className="container-page py-6 pb-24 space-y-4">
				<h1 className="text-2xl font-semibold">Browser</h1>
				<div className="flex gap-2">
					<Badge variant="solid">Featured</Badge>
					<Badge>DEX</Badge>
					<Badge>DeFi</Badge>
					<Badge>NFTs</Badge>
				</div>
				<div className="grid gap-3">
					<DappCard title="Jupiter" desc="Best rates across Solana DEXes" icon="/icons/solana.svg" />
					<DappCard title="Magic Eden" desc="Discover and trade NFTs" icon="/icons/eth.svg" />
					<DappCard title="Uniswap" desc="Swap ERC20 tokens easily" icon="/icons/eth.svg" />
				</div>
			</main>
			<TabBar />
		</>
	)
} 