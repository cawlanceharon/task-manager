import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import taskService from '../services/taskService';

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const tasks = await taskService.getTasks();
  return tasks;
});

export const addTask = createAsyncThunk('tasks/addTask', async (task) => {
  const newTask = await taskService.createTask(task);
  return newTask;
});

export const updateTask = createAsyncThunk('tasks/updateTask', async (task) => {
  const updatedTask = await taskService.updateTask(task.id, task);
  return updatedTask;
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (taskId) => {
  await taskService.deleteTask(taskId);
  return taskId;
});

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    status: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.status = 'idle';
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex((task) => task.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      });
  },
});

export default taskSlice.reducer;
