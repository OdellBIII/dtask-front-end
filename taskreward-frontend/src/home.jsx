import React, { useState, useEffect } from "react";
import { useAccount, useDisconnect, useConnect } from 'wagmi'
import { injected } from "wagmi/connectors";
import { createNewTask, getTaskCount, getTask } from "./contract";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import NewTaskButton from "./new-task-button";
import Task from "./task";

export const Home = () => {
    const { connect } = useConnect({connector: new injected()});
    const { disconnect } = useDisconnect();
    const { address, isConnected } = useAccount();
    const [taskCount, setTaskCount] = useState(null);
    const [task, setTask] = useState(null);

    const fetchTaskCount = async () => {
        const taskCount = await getTaskCount();
        setTaskCount(taskCount.toString());
    };

    const handleCreateNewTask = async (description, reward) => {
        await createNewTask(description, reward);
    };

    const fetchTask = async (index) => {
        const task = await getTask(index);
        setTask(task);
    };

    useEffect(() => {
        if (isConnected) {
            fetchTask(2); // Fetch task with index 2 as an example
        }
    }, [isConnected]);

    return (
        <div>
            <h1>Task Reward</h1>
            {isConnected ? (
                <div>
                <p>Connected as: {address}</p>
                <button onClick={disconnect}>Disconnect</button>
                <button onClick={fetchTaskCount}>Get Task Count</button>
                {taskCount && <p>Number of Tasks: {taskCount}</p>}
                <NewTaskButton onCreateNewTask={handleCreateNewTask}/>
                {task && <Task task={task} />}
                </div>
            ) : (
                <ConnectButton/>
            )}
        </div>
    )
}