import axios from 'axios';

const api = axios.create({
    baseURL: 'http://18.220.240.241:3334'
});

export default api;