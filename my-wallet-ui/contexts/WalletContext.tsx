"use client"
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useWalletConnection } from '@/hooks/useWalletConnection'
import { fetchBalance } from '@/services/solana'
import type { Wallet } from '@/types/wallet'

interface WalletContextType {
  isLoggedIn: boolean
  wallet: Wallet | null
  walletName: string
  walletBalance: number
  isLoading: boolean
  error: string | null
  login: (walletData: { smartWalletAddress: string; account: unknown }) => Promise<void>
  logout: () => Promise<void>
  updateWalletName: (name: string) => void
  refreshBalance: () => Promise<void>
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export const useWalletContext = () => {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error('useWalletContext must be used within a WalletProvider')
  }
  return context
}

interface WalletProviderProps {
  children: ReactNode
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [walletName, setWalletName] = useState("Main Wallet")
  const [walletBalance, setWalletBalance] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    isConnected,
    address,
    smartWalletPublicKey,
    connectWallet,
    disconnectWallet,
  } = useWalletConnection()

  // Auto-login nếu wallet đã có smartWalletPubkey và isConnected từ SDK
  useEffect(() => {
    if (isConnected && address && !isLoggedIn) {
      setWalletName("Main Wallet")
      setIsLoggedIn(true)
    }
  }, [isConnected, address, isLoggedIn])

  // Fetch wallet balance when address changes
  useEffect(() => {
    const fetchWalletBalance = async () => {
      if (address) {
        const bal = await fetchBalance(address)
        setWalletBalance(bal)
      } else {
        setWalletBalance(0)
      }
    }
    fetchWalletBalance()
  }, [address])

  const login = async (walletData: { smartWalletAddress: string; account: unknown }) => {
    setIsLoading(true)
    setError(null)
    try {
      setWalletName("Main Wallet")
      setIsLoggedIn(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed")
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    setIsLoading(true)
    try {
      await disconnectWallet()
      setIsLoggedIn(false)
      setWalletName("Main Wallet")
      setWalletBalance(0)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Logout failed")
    } finally {
      setIsLoading(false)
    }
  }

  const updateWalletName = (name: string) => {
    setWalletName(name)
  }

  const refreshBalance = async () => {
    if (address) {
      const bal = await fetchBalance(address)
      setWalletBalance(bal)
    }
  }

  // Create wallet object for components
  const wallet: Wallet | null = address ? {
    id: "1",
    address: address,
    name: walletName,
    balance: walletBalance,
    tokens: [],
  } : null

  const value: WalletContextType = {
    isLoggedIn,
    wallet,
    walletName,
    walletBalance,
    isLoading,
    error,
    login,
    logout,
    updateWalletName,
    refreshBalance,
  }

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  )
} 