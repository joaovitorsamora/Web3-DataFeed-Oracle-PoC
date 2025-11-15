// relayer.js
//----------------------------------------------------
// Envia o payload assinado para o contrato on-chain
//----------------------------------------------------

import dotenv from "dotenv";
import { ethers } from "ethers";
import { generateSignedPayload } from "./adapter-signer.js";
import fs from "fs";

dotenv.config();

// ====== ENV ======
const RPC = process.env.RELAYER_RPC_URL || process.env.RPC_URL;
const CONTRACT_ADDR = process.env.CONTRACT_ADDR;
const RELAYER_PRIVATE_KEY = process.env.RELAYER_PRIVATE_KEY;

if (!RPC) throw new Error("Falta RPC_URL no .env");
if (!CONTRACT_ADDR) throw new Error("Falta CONTRACT_ADDR no .env");
if (!RELAYER_PRIVATE_KEY) throw new Error("Falta RELAYER_PRIVATE_KEY no .env");

// ====== ABI ======
const abi = [
  "function updateSearchVolumeWithSig(uint256 newVolume,uint256 nonce,uint256 timestamp,bytes signature) external",
  "function currentSearchVolume() view returns(uint256)",
  "function lastUpdateTimestamp() view returns(uint256)",
  "event ValuationUpdated(uint256 newValuation, uint256 newSearchVolume, address indexed updater)"
];

// ====== RELAYER MAIN ======
async function runRelayer() {
  const provider = new ethers.providers.JsonRpcProvider(RPC);
  const wallet = new ethers.Wallet(RELAYER_PRIVATE_KEY, provider);
  const contract = new ethers.Contract(CONTRACT_ADDR, abi, wallet);

  console.log("⏳ Coletando Google Trends + assinando payload...");
  const payload = await generateSignedPayload();

  console.log("Payload assinado:", payload);

  console.log("🔁 Enviando transação...");

  const tx = await contract.updateSearchVolumeWithSig(
    payload.newVolume,
    payload.nonce,
    payload.timestamp,
    payload.signature,
    {
      gasLimit: 300000
    }
  );

  console.log("⛽ TX enviada:", tx.hash);

  const receipt = await tx.wait();
  console.log("🏁 TX confirmada:", receipt.transactionHash);

  console.log("🎉 Oracle atualizado com sucesso!");
}

runRelayer().catch(err => {
  console.error("Erro no relayer:", err.message);
  process.exit(1);
});
