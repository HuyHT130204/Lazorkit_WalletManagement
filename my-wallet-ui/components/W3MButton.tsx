import React, { useState } from 'react'
import { useWeb3Modal } from '@/pages/_app'

type Props = {
	label?: string
	size?: 'sm' | 'md' | 'lg'
	balance?: 'show' | 'hide'
}

export default function W3MButton(props: Props) {
	const { isAvailable } = useWeb3Modal()
	const [isLoading, setIsLoading] = useState(false)

	// Function to handle wallet connection
	const handleConnectWallet = async () => {
		if (!isAvailable) {
			alert('Wallet connection is not available. Please check your configuration.')
			return
		}

		setIsLoading(true)
		try {
			// Try to trigger the w3m-button click if it exists
			if (typeof window !== 'undefined') {
				const w3mButton = document.querySelector('w3m-button') as HTMLElement
				if (w3mButton) {
					w3mButton.click()
				} else {
					alert('Wallet connection is not available. Please check your configuration.')
				}
			}
		} catch (error) {
			console.error('Error opening wallet modal:', error)
			alert('Failed to open wallet connection. Please try again.')
		} finally {
			setIsLoading(false)
		}
	}

	// If Web3Modal is not available, render a fallback button
	if (!isAvailable) {
		return (
			<button
				className={`px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
					props.size === 'sm' ? 'px-3 py-1.5 text-xs' : 
					props.size === 'lg' ? 'px-6 py-3 text-base' : ''
				}`}
				onClick={handleConnectWallet}
				disabled={isLoading}
			>
				{isLoading ? 'Connecting...' : (props.label || 'Connect Wallet')}
			</button>
		)
	}

	// Render the Web3Modal button when available
	return React.createElement('w3m-button', {
		...props,
		label: props.label || 'Connect Wallet'
	} as unknown as Record<string, unknown>)
} 