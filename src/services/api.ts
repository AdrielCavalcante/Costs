import axios from 'axios'

const api = axios.create({
    baseURL: 'https://my-json-server.typicode.com/AdrielCavalcante/costs' || 'http://localhost:8000'
});

export default api;