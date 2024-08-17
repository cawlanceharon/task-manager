"use client";

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { fetchTasks } from '../redux/taskSlice';
import TaskItem from './TaskItem';
import { Box, Button, Typography } from '@mui/material';
import TaskForm from './TaskForm';
import WeatherModal from './WeatherModal';

const TaskList: React.FC = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const [showForm, setShowForm] = useState(false);
  const [showWeatherModal, setShowWeatherModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleLogout = () => {
    Cookies.remove('authToken');
    router.push('/login');
  };

  const handleShowWeatherModal = () => {
    setShowWeatherModal(true);
  };

  const handleCloseWeatherModal = () => {
    setShowWeatherModal(false);
  };

  return (
    <>
      <Box display="flex" gap={2} mb={4}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleShowForm}
        >
          Add New Task
        </Button>
        <Button
          variant="contained"
          color="info"
          onClick={handleShowWeatherModal} // Show weather modal
        >
          Check Weather
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>
      {showForm && <TaskForm onClose={handleCloseForm} />}
      {showWeatherModal && <WeatherModal open={showWeatherModal} onClose={handleCloseWeatherModal} />}
      <div className="space-y-4">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))
        ) : (
          <Typography className="text-center">No tasks found</Typography>
        )}
      </div>
    </>
  );
};

export default TaskList;
