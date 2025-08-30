import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js"

const SOLANA_RPC = "https://api.devnet.solana.com"
const connection = new Connection(SOLANA_RPC, "confirmed")

/**
 * Fetch SOL balance for a public key
 */
export async function fetchBalance(publicKey: string): Promise<number> {
  try {
    const pubkey = new PublicKey(publicKey)
    const balanceLamports = await connection.getBalance(pubkey)
    const balance = balanceLamports / LAMPORTS_PER_SOL
    return balance
  } catch (e) {
    console.error("fetchBalance error:", e)
    return 0
  }
}

/**
 * Request SOL airdrop from Devnet faucet
 */
export async function requestAirdrop(publicKey: string, amount = 1): Promise<string> {
  try {
    console.log("Requesting airdrop for:", publicKey, "Amount:", amount, "SOL")
    const pubkey = new PublicKey(publicKey)
    const signature = await connection.requestAirdrop(pubkey, amount * LAMPORTS_PER_SOL)
    console.log("Airdrop signature:", signature)

    await connection.confirmTransaction(signature)
    return signature
  } catch (e) {
    console.error("Airdrop failed:", e)
    throw e
  }
} 