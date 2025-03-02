import React from 'react';
import './stylesheets/stylesheet.css';

const Task = ({ task, userAddress}) => {
    console.log(task);
    return (
        <div className="task-container">
            <p>Creator: {task.creator}</p>
            <p>Description: {task.description}</p>
            <p>Reward: {task.reward}</p>
            <p>Completed: {task.completed ? 'Yes' : 'No'}</p>
            <p>Approved: {task.approved ? 'Yes' : 'No'}</p>
            {task.creator == userAddress && task.completed && (
                <div>
                    <button>Approve</button>
                    <button>Reject</button>
                </div>
            )}
        </div>
    );
}

export default Task;