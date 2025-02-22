import { createPublicClient, createWalletClient, http } from "viem";
import { sepolia } from "viem/chains";
import { abi } from "./TaskReward.json"; // Your contract ABI

const contractAddress = "0x47693A641aB05F3C2728c875686822be5750BfBE";

// Create a read-only client
export const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(),
});

// Create a wallet client (for signing transactions)
export const walletClient = createWalletClient({
  chain: sepolia,
  transport: http(),
});

// Function to read contract data
export const getTaskRewardBalance = async (address) => {
  return await publicClient.readContract({
    address: contractAddress,
    abi,
    functionName: "balanceOf",
    args: [address],
  });
};