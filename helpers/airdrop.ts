import {
    Connection, 
    LAMPORTS_PER_SOL, 
    PublicKey
} from "@solana/web3.js";


async function airdropSol(connection: Connection, toPubKey: PublicKey, amountSol: number): Promise<void> {
    try {
        const airdropTxnSignature = await connection.requestAirdrop(
            toPubKey,
            amountSol * LAMPORTS_PER_SOL
        );

        console.log(`Sent ${amountSol} SOL to ${toPubKey}`);
        console.log(`Airdrop Transaction signature: https://explorer.solana.com/tx/${airdropTxnSignature}?cluster=devnet`);
    } catch (error) {
        console.error(error);
    }
}

export { airdropSol };
