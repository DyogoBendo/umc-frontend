import axios from 'axios'

export const umcAPI = axios.create({
	baseURL: 'http://localhost:8080',
	headers: {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
		'Access-Control-Expose-Headers': '*',
	},
})
