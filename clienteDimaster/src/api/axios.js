import axios from "axios";

const instance = axios.create({
    baseURL: "http://api-servidor-d8f1.onrender.com/api/v1",
    withCredentials: true // Permitir cookies en las solicitudes
});

export default instance;

//cambios
// import axios from "axios"

// const instance = axios.create({
//     baseURL:"http://localhost:3000/api/v1",
//     withCredentials:true

// })

// export default instance