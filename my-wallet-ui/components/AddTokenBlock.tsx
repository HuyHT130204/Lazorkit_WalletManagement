import { useState } from 'react';
import type { Token } from '@/data/tokens';

interface AddTokenBlockProps {
  onAddToken?: (token: Token) => void;
  children?: React.ReactNode;
}

export default function AddTokenBlock({ onAddToken, children }: AddTokenBlockProps) {
  const [showBlockedMessage, setShowBlockedMessage] = useState(false);

  return (
    <div className="relative">
      {children}
      
      {/* Blocked Message Toast */}
      {showBlockedMessage && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-red-900/90 border border-red-700 rounded-lg px-4 py-3 text-white text-sm z-50">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <span>Only USDC and SOL can be added.</span>
          </div>
        </div>
      )}
    </div>
  );
}

// Hook to use in components that need to block add token
export function useAddTokenBlock() {
  const [isBlocked, setIsBlocked] = useState(false);

  const blockAddToken = (token: Token) => {
    const isAllowed = token.symbol === 'SOL' || token.symbol === 'USDC';
    
    if (!isAllowed) {
      setIsBlocked(true);
      setTimeout(() => setIsBlocked(false), 3000);
      return false;
    }
    
    return true;
  };

  return { blockAddToken, isBlocked };
} 