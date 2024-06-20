import axios from "axios"

const instance = axios.create({
    baseURL:"https://api-servidor-d8f1.onrender.com/api/v1",
    withCredentials:true

})

// Interceptor para añadir el token en cada solicitud
instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});



export default instance