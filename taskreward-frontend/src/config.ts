import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http, createConfig } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'

export const config = getDefaultConfig({
  appName: 'Task Reward',
  projectId: 'd10a0a706bf4da85dc7c63dae0eae031',
  chains: [mainnet, sepolia],
});