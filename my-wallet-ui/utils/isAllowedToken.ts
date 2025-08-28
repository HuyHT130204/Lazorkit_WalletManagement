import { ALLOWED_TOKENS, ALLOWED_TOKEN_MINTS, TOKEN_CONFIG } from '@/constants/tokenConstants';
import type { Token } from '@/data/tokens';

export function isAllowedToken(token: Token | string | { mint?: string; symbol?: string }): boolean {
  if (!TOKEN_CONFIG.allowlistEnabled) {
    return true; // Allow all tokens if allowlist is disabled
  }

  // Handle string input (symbol)
  if (typeof token === 'string') {
    return ALLOWED_TOKENS.SOL.symbol === token || 
           ALLOWED_TOKENS.USDC.symbol === token || 
           ALLOWED_TOKENS.WSOL.symbol === token;
  }

  // Handle object with mint address (preferred)
  if (token.mint) {
    return ALLOWED_TOKEN_MINTS.includes(token.mint);
  }

  // Handle object with symbol (fallback)
  if (token.symbol) {
    return token.symbol === ALLOWED_TOKENS.SOL.symbol || 
           token.symbol === ALLOWED_TOKENS.USDC.symbol || 
           token.symbol === ALLOWED_TOKENS.WSOL.symbol;
  }

  return false;
}

export function validateTokenBeforeAction(token: Token, showToast?: (message: string, type: 'success' | 'error' | 'warning' | 'info') => void): boolean {
  if (!isAllowedToken(token)) {
    // Use toast instead of alert for better UX
    showTokenRestrictionError(showToast);
    return false;
  }
  return true;
}

export function showTokenRestrictionError(showToast?: (message: string, type: 'success' | 'error' | 'warning' | 'info') => void): void {
  const message = 'Only USDC and SOL are supported in this wallet.';
  
  if (showToast) {
    showToast(message, 'error');
  } else if (typeof window !== 'undefined') {
    // Fallback to console.warn if no toast function provided
    console.warn(message);
  }
}

export function showReceiveWarning(showToast?: (message: string, type: 'success' | 'error' | 'warning' | 'info') => void): void {
  if (!TOKEN_CONFIG.showReceiveWarning) return;
  
  const message = 'Note: Other tokens will not be displayed in this wallet.';
  
  if (showToast) {
    showToast(message, 'warning');
  } else if (typeof window !== 'undefined') {
    // Fallback to console.warn if no toast function provided
    console.warn(message);
  }
}

export function getTokenDecimals(symbol: string): number {
  const token = Object.values(ALLOWED_TOKENS).find(t => t.symbol === symbol);
  return token?.decimals || 9; // Default to 9 decimals
}

export function formatTokenAmount(amount: number, symbol: string): string {
  const decimals = getTokenDecimals(symbol);
  return amount.toFixed(decimals);
} 