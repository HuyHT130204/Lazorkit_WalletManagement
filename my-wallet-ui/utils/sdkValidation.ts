import { isAllowedToken } from './isAllowedToken';
import type { Token } from '@/data/tokens';

// This should be called right before any SDK/blockchain operation
export function validateBeforeSDKCall(token: Token, operation: 'send' | 'swap' | 'approve'): boolean {
  if (!isAllowedToken(token)) {
    console.warn(`Blocked ${operation} operation for disallowed token:`, token.symbol);
    return false;
  }
  
  console.log(`Proceeding with ${operation} for allowed token:`, token.symbol);
  return true;
}

// Wrapper for send operations
export function validateSendOperation(token: Token, amount: number, recipient: string): boolean {
  if (!validateBeforeSDKCall(token, 'send')) {
    return false;
  }
  
  // Additional validation for send operation
  if (amount <= 0) {
    console.warn('Invalid send amount:', amount);
    return false;
  }
  
  if (!recipient || recipient.length === 0) {
    console.warn('Invalid recipient address');
    return false;
  }
  
  return true;
}

// Wrapper for swap operations
export function validateSwapOperation(fromToken: Token, toToken: Token, amount: number): boolean {
  if (!validateBeforeSDKCall(fromToken, 'swap')) {
    return false;
  }
  
  if (!validateBeforeSDKCall(toToken, 'swap')) {
    return false;
  }
  
  // Additional validation for swap operation
  if (amount <= 0) {
    console.warn('Invalid swap amount:', amount);
    return false;
  }
  
  if (fromToken.symbol === toToken.symbol) {
    console.warn('Cannot swap same token');
    return false;
  }
  
  return true;
}

// Wrapper for approve operations
export function validateApproveOperation(token: Token, spender: string, amount: number): boolean {
  if (!validateBeforeSDKCall(token, 'approve')) {
    return false;
  }
  
  // Additional validation for approve operation
  if (!spender || spender.length === 0) {
    console.warn('Invalid spender address');
    return false;
  }
  
  if (amount < 0) {
    console.warn('Invalid approve amount:', amount);
    return false;
  }
  
  return true;
}

// Example usage in SDK calls:
/*
export async function sendToken(token: Token, amount: number, recipient: string) {
  if (!validateSendOperation(token, amount, recipient)) {
    throw new Error('Send operation validation failed');
  }
  
  // Proceed with actual SDK call
  return await sdk.send(token.mint, amount, recipient);
}
*/ 