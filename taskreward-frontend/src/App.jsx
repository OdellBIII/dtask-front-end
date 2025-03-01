import '@rainbow-me/rainbowkit/styles.css';

import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { config } from "./config";
import { Home } from "./home";

const queryClient = new QueryClient();
export default function App() {

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <Home />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}