import { Keypair } from "@solana/web3.js";


function generateKeyPair(): Keypair {
    const keypair = Keypair.generate();

    return keypair;
}

export { generateKeyPair };
