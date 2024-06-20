import axios from "axios"

const instance = axios.create({
    baseURL:"https://api-servidor-d8f1.onrender.com/api/v1",
    withCredentials:true

})



export default instance