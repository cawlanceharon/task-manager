import React, { useState, useEffect } from 'react';
import { Button, TextField, Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, updateTask } from '../redux/taskSlice';
import { Task } from '../types/taskTypes';

interface TaskFormProps {
  task?: Task;
  onClose: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ task, onClose }) => {
  const [title, setTitle] = useState(task ? task.title : '');
  const [description, setDescription] = useState(task ? task.description : '');
  const dispatch = useDispatch();

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
    }
  }, [task]);

  const handleSubmit = () => {
    if (task) {
      dispatch(updateTask({ ...task, title, description }));
    } else {
      dispatch(addTask({ title, description, completed: false }));
    }
    onClose();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <Typography variant="h6" className="text-xl font-semibold mb-4 text-center">
          {task ? 'Edit Task' : 'Add Task'}
        </Typography>
        <div className="space-y-4">
          <TextField
            label="Title"
            fullWidth
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block"
          />
          <TextField
            label="Description"
            fullWidth
            margin="normal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block"
          />
          <div className="flex justify-between mt-4">
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              className="w-full py-2 px-4"
            >
              {task ? 'Update Task' : 'Add Task'}
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={onClose}
              className="ml-2 w-full py-2 px-4"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
