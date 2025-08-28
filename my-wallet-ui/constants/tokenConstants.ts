export const ALLOWED_TOKENS = {
  SOL: { 
    symbol: 'SOL', 
    isNative: true,
    decimals: 9,
    mint: 'So11111111111111111111111111111111111111112' // Native SOL mint
  },
  USDC: { 
    symbol: 'USDC', 
    isNative: false,
    decimals: 6,
    mint: process.env.NEXT_PUBLIC_USDC_MINT_SOLANA || 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'
  },
  WSOL: {
    symbol: 'wSOL',
    isNative: false,
    decimals: 9,
    mint: process.env.NEXT_PUBLIC_WSOL_MINT_SOLANA || 'So11111111111111111111111111111111111111112'
  }
};

export const ALLOWED_TOKEN_SYMBOLS = ['SOL', 'USDC', 'wSOL'];
export const ALLOWED_TOKEN_MINTS = Object.values(ALLOWED_TOKENS).map(token => token.mint);

export const TOKEN_CONFIG = {
  allowlistEnabled: process.env.NEXT_PUBLIC_ALLOWLIST_ENABLED === 'true',
  showReceiveWarning: process.env.NEXT_PUBLIC_SHOW_RECEIVE_WARNING === 'true',
  solanaNetwork: process.env.NEXT_PUBLIC_SOLANA_NETWORK || 'mainnet-beta',
  solanaRpc: process.env.NEXT_PUBLIC_SOLANA_RPC || 'https://api.mainnet-beta.solana.com'
}; 