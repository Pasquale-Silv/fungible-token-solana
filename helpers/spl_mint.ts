import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import { getOrCreateAssociatedTokenAccount, mintTo } from "@solana/spl-token";

async function mintTokens(connection: Connection, mint: PublicKey, keypair: Keypair, amount: number) {

    const associatedTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        keypair,             // Signer/Payer
        mint,                // Mint: Mint associated with the account to set or verify
        keypair.publicKey,   // Owner: Owner of the account to set or verify
    );

    const transactionSignature = await mintTo(
        connection,                      // connection: the JSON-RPC connection to the cluster
        keypair,                         // Signer/Payer
        mint,                            // mint: the token mint that the new token account is associated with
        associatedTokenAccount.address,  // destination: the token account that tokens will be minted to
        keypair,                         // authority: the account authorized to mint tokens
        amount                           // amount: the raw amount of tokens to mint outside of decimals, e.g. if Scrooge Coin mint's decimals property was set to 2 then to get 1 full Scrooge Coin you would need to set this property to 100
    );

    console.log(`Minted '${amount}' tokens... to '${keypair.publicKey}'`);
    console.log(`ATA: '${associatedTokenAccount.address}'\n`);

    console.log(`Transaction Signature: '${transactionSignature}'`);
    console.log(`Transaction Signature: https://explorer.solana.com/tx/${transactionSignature}?cluster=devnet`);

    // Refetching ATA for displaying the correct amount of tokens
    const associatedTokenAccountRefetched = await getOrCreateAssociatedTokenAccount(
        connection,
        keypair,             // Signer/Payer
        mint,                // Mint: Mint associated with the account to set or verify
        keypair.publicKey,   // Owner: Owner of the account to set or verify
    );
    console.log(`\nToken Balance: ${associatedTokenAccountRefetched.amount}`);
}

export { mintTokens };
