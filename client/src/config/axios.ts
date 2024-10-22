import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL //variable de entorno que apunta a la ulr del backend
})

api.interceptors.request.use( config => {
    const token = localStorage.getItem('AUTH_TOKEN');
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

export default api;