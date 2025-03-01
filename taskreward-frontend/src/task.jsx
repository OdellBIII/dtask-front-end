const Task = ({ task }) => {
    //const { creator, description, reward, completed, approved } = task;
    return (
        <div>
            <p>Creator: {task.creator}</p>
            <p>Description: {task.description}</p>
            <p>Reward: {task.reward}</p>
            <p>Completed: {task.completed ? 'Yes' : 'No'}</p>
            <p>Approved: {task.approved ? 'Yes' : 'No'}</p>
        </div>
    );
}

export default Task;