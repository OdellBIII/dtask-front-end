import React, { useState } from "react";
import { useAccount, useDisconnect, useConnect } from 'wagmi'
import { injected } from "wagmi/connectors";
import { getTaskRewardBalance } from "./contract";

export const Home = () => {
    const { connect } = useConnect({connector: new injected()});
    const { disconnect } = useDisconnect();
    const { address, isConnected } = useAccount();
    const [balance, setBalance] = useState(null);

    const fetchBalance = async () => {
        if (address) {
        const balance = await getTaskRewardBalance(address);
        setBalance(balance.toString());
        }
    };

    return (
        <div>
            <h1>Task Reward</h1>
            {isConnected ? (
                <div>
                <p>Connected as: {address}</p>
                <button onClick={disconnect}>Disconnect</button>
                <button onClick={fetchBalance}>Get Balance</button>
                {balance && <p>Your Balance: {balance}</p>}
                </div>
            ) : (
                <button onClick={connect}>Connect Wallet</button>
            )}
        </div>
    )
}