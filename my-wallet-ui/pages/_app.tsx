import type { AppProps } from 'next/app'
import Head from 'next/head'
import '@/styles/globals.css'
import { TokenProvider } from '@/contexts/TokenContext'
import { WalletProvider } from '@/contexts/WalletContext'
import { LazorkitProvider } from '@lazorkit/wallet'
import Layout from '@/components/Layout'
import { appWithTranslation } from 'next-i18next'
import nextI18NextConfig from '../next-i18next.config.js'
import { Buffer } from 'buffer'

if (typeof window !== "undefined") {
  window.Buffer = Buffer
}

function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<title>LazorKit Wallet UI</title>
			</Head>
			<div className="dark">
				<div className="neon-bg min-h-screen">
					<LazorkitProvider
						rpcUrl="https://api.devnet.solana.com"
						ipfsUrl="https://portal.lazor.sh"
						paymasterUrl="https://lazorkit-paymaster.onrender.com"
					>
						<WalletProvider>
					<TokenProvider>
								<Layout>
						<Component {...pageProps} />
								</Layout>
					</TokenProvider>
						</WalletProvider>
					</LazorkitProvider>
				</div>
			</div>
		</>
	)
}

export default appWithTranslation(App, nextI18NextConfig)
