import { generateKeyPair } from "./helpers/keygen";
import { airdropSol } from "./helpers/airdrop";
import { createMintAccount } from "./helpers/spl_init";
import { mintTokens } from "./helpers/spl_mint";

import { Connection, PublicKey } from "@solana/web3.js";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import { transferTokens } from "./helpers/spl_transfer";

require('dotenv').config()

const keypair = getKeypairFromEnvironment("SECRET_KEY");
const connection = new Connection("https://api.devnet.solana.com", "finalized");

async function main() {
    console.log(`Public Key: ${keypair.publicKey.toBase58()}`);

    const balanceInLamports = await connection.getBalance(keypair.publicKey);
    if (balanceInLamports === 0) {
        await airdropSol(connection, keypair.publicKey, 0.5);
    }

    const tokenMint = await createMintAccount(connection, keypair);
    console.log(`New Token Mint Txn: https://explorer.solana.com/address/${tokenMint}?cluster=devnet`);

    await mintTokens(connection, tokenMint, keypair, 10);

    const dst_pubkey = new PublicKey("7bTyR6EJmtrEDddizTyntZKznBTgoin7cdX9utEe3a77");
    await transferTokens(connection, tokenMint, keypair, 5, dst_pubkey);
}

main()
  .then(() => {
    console.log("Finished successfully")
    process.exit(0)
  })
  .catch((error) => {
    console.log(error)
    process.exit(1)
  })
