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

// Function to read contract data pertaining to a specific task
export const getTask = async (index) => {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const contract = new ethers.Contract(contractAddress, abi, provider);
  const taskValues = await contract.tasks(index);
  return {
    creator: taskValues[0],
    description: taskValues[1],
    reward: ethers.formatEther(taskValues[2]),
    completed: taskValues[3],
    approved: taskValues[4],
  };
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