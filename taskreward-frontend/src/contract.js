import { ethers, Contract } from "ethers";
import { abi } from "./TaskReward.json"; // Your contract ABI

const contractAddress = "0x47693A641aB05F3C2728c875686822be5750BfBE";

// Function to read contract data
export const getTaskRewardBalance = async (address) => {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const contract = new ethers.Contract(contractAddress, abi, provider);
  return await contract.balanceOf(address);
};

// Function to read contract data
export const getTaskCount = async () => {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const contract = new ethers.Contract(contractAddress, abi, provider);
  return await contract.taskCount();
};

export const createNewTask = async (description, reward) => {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const contract = new Contract(contractAddress, abi, signer);
  const tx = await contract.createTask(description, {
    value: ethers.parseUnits(reward.toString(), "ether")
  });
  await tx.wait();
};