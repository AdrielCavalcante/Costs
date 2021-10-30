import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8000' || 'https://my-json-server.typicode.com/AdrielCavalcante/costs'
});

export default api;
