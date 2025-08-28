import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { isAllowedToken, validateTokenBeforeAction, showReceiveWarning } from '@/utils/isAllowedToken';
import type { Token } from '@/data/tokens';
import { TOKENS } from '@/data/tokens';
import MigrationModal from '@/components/MigrationModal';
import { useToast } from '@/components/Toast';

interface TokenContextType {
  tokens: Token[];
  allowedTokens: Token[];
  isAllowedToken: (token: Token | string) => boolean;
  validateTokenBeforeAction: (token: Token) => boolean;
  showReceiveWarning: () => void;
  addToken: (token: Token) => boolean;
  removeToken: (symbol: string) => void;
  cleanupLocalCache: () => void;
}

const TokenContext = createContext<TokenContextType | undefined>(undefined);

export function TokenProvider({ children }: { children: React.ReactNode }) {
  const [tokens, setTokens] = useState<Token[]>(TOKENS);
  const [localCacheCleaned, setLocalCacheCleaned] = useState(false);
  const [showMigrationModal, setShowMigrationModal] = useState(false);
  const [removedTokensCount, setRemovedTokensCount] = useState(0);
  const { showToast, ToastContainer } = useToast();

  // Filter to only allowed tokens
  const allowedTokens = useMemo(() => {
    return tokens.filter(isAllowedToken);
  }, [tokens]);

  // Cleanup local cache on mount
  useEffect(() => {
    if (!localCacheCleaned) {
      cleanupLocalCache();
      setLocalCacheCleaned(true);
    }
  }, [localCacheCleaned]);

  const addToken = (token: Token): boolean => {
    if (!isAllowedToken(token)) {
      // Show error message for disallowed tokens
      showToast('Only USDC and SOL can be added.', 'error');
      return false;
    }
    
    setTokens(prev => {
      const exists = prev.find(t => t.symbol === token.symbol);
      if (exists) return prev;
      return [...prev, token];
    });
    return true;
  };

  const removeToken = (symbol: string) => {
    setTokens(prev => prev.filter(t => t.symbol !== symbol));
  };

  const validateTokenBeforeActionWithToast = (token: Token): boolean => {
    return validateTokenBeforeAction(token, showToast);
  };

  const showReceiveWarningWithToast = (): void => {
    showReceiveWarning(showToast);
  };

  const cleanupLocalCache = () => {
    try {
      let removedCount = 0;
      
      // Clean up any cached token data
      const cachedTokens = localStorage.getItem('cachedTokens');
      if (cachedTokens) {
        const parsed = JSON.parse(cachedTokens);
        const filtered = parsed.filter((token: any) => isAllowedToken(token));
        removedCount = parsed.length - filtered.length;
        localStorage.setItem('cachedTokens', JSON.stringify(filtered));
      }
      
      // Remove other token-related cache
      localStorage.removeItem('hiddenTokens');
      localStorage.removeItem('tokenPreferences');
      
      // Show migration modal if tokens were removed
      if (removedCount > 0) {
        setRemovedTokensCount(removedCount);
        setShowMigrationModal(true);
      }
    } catch (error) {
      console.warn('Failed to cleanup local token cache:', error);
    }
  };

  const value: TokenContextType = {
    tokens,
    allowedTokens,
    isAllowedToken,
    validateTokenBeforeAction: validateTokenBeforeActionWithToast,
    showReceiveWarning: showReceiveWarningWithToast,
    addToken,
    removeToken,
    cleanupLocalCache
  };

  return (
    <TokenContext.Provider value={value}>
      {children}
      <MigrationModal 
        isOpen={showMigrationModal}
        onClose={() => setShowMigrationModal(false)}
        removedTokensCount={removedTokensCount}
      />
      <ToastContainer />
    </TokenContext.Provider>
  );
}

export function useTokenContext() {
  const context = useContext(TokenContext);
  if (context === undefined) {
    throw new Error('useTokenContext must be used within a TokenProvider');
  }
  return context;
} 