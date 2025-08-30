"use client"
import React from 'react'
import { useWalletContext } from '@/contexts/WalletContext'
import Login from './Login'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isLoggedIn } = useWalletContext()

  if (!isLoggedIn) {
    return <Login />
  }

  return <>{children}</>
}

export default Layout 