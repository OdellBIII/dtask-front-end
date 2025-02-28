import React, { useState } from "react";
import { useAccount, useDisconnect, useConnect } from 'wagmi'
import { injected } from "wagmi/connectors";
import { getTaskCount } from "./contract";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import NewTaskButton from "./new-task-button";

export const Home = () => {
    const { connect } = useConnect({connector: new injected()});
    const { disconnect } = useDisconnect();
    const { address, isConnected } = useAccount();
    const [taskCount, setTaskCount] = useState(null);

    const fetchTaskCount = async () => {
        const taskCount = await getTaskCount();
        setTaskCount(taskCount.toString());
    };

    return (
        <div>
            <h1>Task Reward</h1>
            {isConnected ? (
                <div>
                <p>Connected as: {address}</p>
                <button onClick={disconnect}>Disconnect</button>
                <button onClick={fetchTaskCount}>Get Task Count</button>
                {taskCount && <p>Number of Tasks: {taskCount}</p>}
                <NewTaskButton/>
                </div>
            ) : (
                <ConnectButton/>
            )}
        </div>
    )
}