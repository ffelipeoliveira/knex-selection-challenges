import axios from 'axios';

const api = axios.create({
	baseURL: 'https://jsonplaceholder.typicode.com'
})

export const randomUserApi = axios.create({
	baseURL: 'https://randomuser.me/api/'
})

export default api;