import axios from 'axios'

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
    window.location.href = '/';
  }

  if (error.response && error.response.status === 403) {
    window.location.href = '/';
  }

  return Promise.reject(error)
}

instance.interceptors.response.use(successfulResponse, errorResponse)

export default instance;

