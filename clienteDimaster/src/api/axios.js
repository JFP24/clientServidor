import axios from "axios";
import io from 'socket.io-client';

// Configura Axios
const instance = axios.create({
  baseURL: "https://api-servidor-d8f1.onrender.com/api/v1",
  withCredentials: true // Permitir cookies en las solicitudes
});

// Configura Socket.io
const socket = io('https://api-servidor-d8f1.onrender.com', {
  withCredentials: true,
  extraHeaders: {
    "Access-Control-Allow-Origin": "https://clientservidor.onrender.com"
  }
});

export default instance;
export { socket };

//cambios
// import axios from "axios"

// const instance = axios.create({
//     baseURL:"http://localhost:3000/api/v1",
//     withCredentials:true

// })

// export default instance