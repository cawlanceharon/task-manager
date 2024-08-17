import Cookies from 'js-cookie';
import axios from 'axios';

const API_URL = 'http://localhost:3333/tasks';

const getAuthToken = () => {
  return Cookies.get('authToken');
};

const getTasks = async () => {
  const token = getAuthToken();
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const createTask = async (task: any) => {
    const token = getAuthToken();
    const response = await axios.post(API_URL, task, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };
  
const updateTask = async (id: string, task: any) => {
    const token = getAuthToken();
    const response = await axios.put(`${API_URL}/${id}`, task, {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};
  
const deleteTask = async (id: string) => {
    const token = getAuthToken();
    await axios.delete(`${API_URL}/${id}`, {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    });
};

export default {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
