import axios from "axios"

const instance = axios.create({
    baseURL:"https://api-servidor-d8f1.onrender.com/api/v1",
    withCredentials:true

})

// Configura Socket.io
const socket = io('https://api-servidor-d8f1.onrender.com', {
  withCredentials: true,
  extraHeaders: {
    "Access-Control-Allow-Origin": "https://clientservidor.onrender.com"
  }
});

export default instance;
export { socket };

