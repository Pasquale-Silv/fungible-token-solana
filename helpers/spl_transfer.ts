import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";


async function transferTokens(connection: Connection, mint: PublicKey, keypair: Keypair, amount: number, dst_pubkey: PublicKey) {

    // ATA src
    const srcAssociatedTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        keypair,             // Signer/Payer
        mint,                // Mint: Mint associated with the account to set or verify
        keypair.publicKey,   // Owner: Owner of the account to set or verify
    );

    // ATA dst
    const dstAssociatedTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        keypair,             // Signer/Payer
        mint,                // Mint: Mint associated with the account to set or verify
        dst_pubkey,          // Owner: Owner of the account to set or verify
    );

    const transactionSignature = await transfer(
        connection,                         // connection: the JSON-RPC connection to the cluster
        keypair,                            // payer: the account of the payer for the transaction
        srcAssociatedTokenAccount.address,  // source (src): the token account sending tokens
        dstAssociatedTokenAccount.address,  // destination (dst): the token account receiving tokens
        keypair,                            // owner: the account of the owner of the source token account
        amount                              // amount: the number of tokens to transfer
    );

    console.log(`Transferred ${amount} tokens from ${srcAssociatedTokenAccount.address} (${srcAssociatedTokenAccount.owner}) to ${dstAssociatedTokenAccount.address} (${dstAssociatedTokenAccount.owner})`);
    console.log(`Transaction Signature: https://explorer.solana.com/tx/${transactionSignature}?cluster=devnet`);
}

export { transferTokens };
