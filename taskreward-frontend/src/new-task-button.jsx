import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

const NewTaskButton = ({ onCreateNewTask }) => {
    const [open, setOpen] = useState(false);
    const [description, setDescription] = useState('');
    const [reward, setReward] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        onCreateNewTask(description, reward);
    };

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                New Task +
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Task</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Description"
                        type="text"
                        fullWidth
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Reward"
                        type="number"
                        fullWidth
                        value={reward}
                        onChange={(e) => setReward(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default NewTaskButton;