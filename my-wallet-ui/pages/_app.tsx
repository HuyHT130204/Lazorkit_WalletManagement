import type { AppProps } from 'next/app'
import Head from 'next/head'
import '@/styles/globals.css'
import { TokenProvider } from '@/contexts/TokenContext'
import { appWithTranslation } from 'next-i18next'
import nextI18NextConfig from '../next-i18next.config.js'
import { http, createConfig } from 'wagmi'
import { sepolia, mainnet } from 'wagmi/chains'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { injected } from 'wagmi/connectors'
import { createContext, useContext, useState, useEffect } from 'react'

const queryClient = new QueryClient()

// Create a context for Web3Modal availability
const Web3ModalContext = createContext<{ isAvailable: boolean }>({ isAvailable: false })

export const useWeb3Modal = () => useContext(Web3ModalContext)

function Web3ModalProvider({ children }: { children: React.ReactNode }) {
	const [isWeb3ModalAvailable, setIsWeb3ModalAvailable] = useState(false)

	useEffect(() => {
		// Web3Modal Solana config - Make it optional to avoid 403 errors
		const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? ''

		// Debug logging
		console.log('WalletConnect Project ID:', projectId ? `${projectId.substring(0, 8)}...` : 'NOT SET')

		// Only create Web3Modal if we have a valid project ID and we're in the browser
		if (typeof window !== 'undefined' && projectId && projectId.trim() !== '') {
			// Dynamically import Web3Modal to avoid SSR issues
			import('@web3modal/solana/react').then(({ createWeb3Modal, defaultSolanaConfig }) => {
				try {
					const solana = defaultSolanaConfig({
						metadata: {
							name: 'LazorKit Wallet',
							description: 'LazorKit Wallet UI',
							url: 'https://localhost',
							icons: ['https://avatars.githubusercontent.com/u/37784886?v=4']
						},
						chains: []
					})
					
					createWeb3Modal({
						projectId,
						solanaConfig: solana,
						themeMode: 'dark',
						themeVariables: {
							'--w3m-accent': '#059669'
						},
						chains: [],
						// Disable features that might cause API calls
						enableAnalytics: false,
						enableOnramp: false
					})

					console.log('Web3Modal initialized successfully')
					setIsWeb3ModalAvailable(true)
				} catch (error) {
					console.error('Failed to initialize Web3Modal:', error)
					// Continue without Web3Modal - the app will still work with other wallet connections
				}
			}).catch((error) => {
				console.error('Failed to load Web3Modal:', error)
				// Continue without Web3Modal
			})
		} else {
			console.warn('Web3Modal will not be available. Using alternative wallet connections.')
		}
	}, [])

	return (
		<Web3ModalContext.Provider value={{ isAvailable: isWeb3ModalAvailable }}>
			{children}
		</Web3ModalContext.Provider>
	)
}

export const wagmiConfig = createConfig({
	chains: [mainnet, sepolia],
	ssr: true,
	transports: {
		[mainnet.id]: http(),
		[sepolia.id]: http(),
	},
	connectors: [injected()],
})

function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<title>LazorKit Wallet UI</title>
			</Head>
			<div className="dark">
				<div className="neon-bg min-h-screen">
					<QueryClientProvider client={queryClient}>
						<WagmiProvider config={wagmiConfig}>
							<Web3ModalProvider>
								<TokenProvider>
									<Component {...pageProps} />
								</TokenProvider>
							</Web3ModalProvider>
						</WagmiProvider>
					</QueryClientProvider>
				</div>
			</div>
		</>
	)
}

export default appWithTranslation(App, nextI18NextConfig)
