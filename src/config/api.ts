import axios from 'axios'

export const umcAPI = axios.create({
	baseURL: 'http://localhost:8080',
	headers: {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
		'Access-Control-Expose-Headers': '*',
	},
});

umcAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});

