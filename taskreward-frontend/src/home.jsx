import React, { useState, useEffect } from "react";
import { useAccount, useDisconnect, useConnect } from 'wagmi';
import { injected } from "wagmi/connectors";
import { createNewTask, getTaskCount, getTask } from "./contract";
import { ConnectButton } from '@rainbow-me/rainbowkit';

import './stylesheets/stylesheet.css';

import NewTaskButton from "./new-task-button";
import Task from "./task";

export const Home = () => {
    const { connect } = useConnect({ connector: new injected() });
    const { disconnect } = useDisconnect();
    const { address, isConnected } = useAccount();
    const [taskCount, setTaskCount] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [activeTab, setActiveTab] = useState('all');

    const fetchTaskCount = async () => {
        const taskCount = await getTaskCount();
        setTaskCount(taskCount.toString());
    };

    const handleCreateNewTask = async (description, reward) => {
        await createNewTask(description, reward);
        fetchTasks(); // Refresh tasks after creating a new one
    };

    const fetchTasks = async () => {
        const count = await getTaskCount();
        const tasks = [];
        for (let i = 0; i < count; i++) {
            const task = await getTask(i);
            tasks.push(task);
        }
        setTasks(tasks);
    };

    useEffect(() => {
        if (isConnected) {
            fetchTasks();
        }
    }, [isConnected]);

    const renderTasks = (filter) => {
        return tasks
            .filter(task => filter === 'all' || (filter === 'mine' && task.creator === address))
            .map((task, index) => <Task key={index} task={task} userAddress={address}/>);
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
                    <NewTaskButton onCreateNewTask={handleCreateNewTask} />
                    <div>
                        <button onClick={() => setActiveTab('all')}>All Tasks</button>
                        <button onClick={() => setActiveTab('mine')}>My Tasks</button>
                    </div>
                    <div className="tasks-wrapper">
                        {activeTab === 'all' && renderTasks('all')}
                        {activeTab === 'mine' && renderTasks('mine')}
                    </div>
                </div>
            ) : (
                <ConnectButton />
            )}
        </div>
    );
};