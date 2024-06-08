import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { createMint } from "@solana/spl-token";


async function createMintAccount(connection: Connection, keypair: Keypair): Promise<PublicKey> {
    const tokenMint = await createMint(
        connection,
        keypair,              // Signer
        keypair.publicKey,    // Mint Authority
        null,                 // Freeze Authority
        0                     // Decimal
    );

    return tokenMint;
}

export { createMintAccount };
