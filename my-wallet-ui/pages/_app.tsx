import type { AppProps } from 'next/app'
import Head from 'next/head'
import '@/styles/globals.css'
import { TokenProvider } from '@/contexts/TokenContext'

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<title>LazorKit Wallet UI</title>
			</Head>
			<div className="dark">
				<div className="neon-bg min-h-screen">
					<TokenProvider>
						<Component {...pageProps} />
					</TokenProvider>
				</div>
			</div>
		</>
	)
}
