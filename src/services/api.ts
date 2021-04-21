import axios from 'axios';

const api = axios.create({
  baseURL: 'http://172.25.204.65:3333'
})

export default api;