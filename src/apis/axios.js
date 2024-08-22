import axios from 'axios'
import toast from 'react-hot-toast';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
});

instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

const successfulResponse = (response) => {
  return response;
}

const errorResponse = (error) => {
  if (error.response && error.response.status === 401) {
    window.location.href = '/login';
  }

  if (error.response && error.response.status === 403) {
    window.location.href = '/login';
  }

  return Promise.reject(error)
}

instance.interceptors.response.use(successfulResponse, errorResponse)

export const handleError = (err) => {
  if (err.response && err.response.data) {
    return err.response.data
  }

  if (!err.response && err.code === 'ERR_NETWORK') {
    toast.error(err.message)
    return {
      message: err.message
    }
  }
}

export default instance;

