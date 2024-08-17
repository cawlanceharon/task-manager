import React from 'react';
import { Button, Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useDispatch } from 'react-redux';
import { deleteTask, updateTask } from '../redux/taskSlice';
import { Task } from '../types/taskTypes';
import TaskForm from './TaskForm';

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = React.useState(false);

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
  };

  const handleToggleComplete = () => {
    dispatch(updateTask({ ...task, completed: !task.completed }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCloseForm = () => {
    setIsEditing(false);
  };
  
  return (
    <>
      <TableRow>
        <TableCell>{task.title}</TableCell>
        <TableCell>{task.description}</TableCell>
        <TableCell>
          <Checkbox
            checked={task.completed}
            onChange={handleToggleComplete}
            color="primary"
          />
        </TableCell>
        <TableCell>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleEdit}
            className="mr-2"
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </TableCell>
      </TableRow>
      {isEditing && <TaskForm task={task} onClose={handleCloseForm} />}
    </>
  );
};

export default TaskItem;
