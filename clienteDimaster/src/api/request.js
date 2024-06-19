import axios from "./axios"


//para hacer el registero debe de llegar informacion para poder pasar a la base de datos 
export const registerRequest = async (user) => axios.post("/registroUser", user)

//para hacer el logueo a la pagina y saber que usuairo esa logueado
export const loginRequest = async (user) =>  axios.post(`/loginUser`, user )

//obtenemos la infomracion de cada perfil que este online
export const informacionPerfil = async (id) =>  axios.get(`/profile/${id}`)

//obtenemos la informacion de la habitacion por medio del id
export const informacionHabitacion = async (id) =>  axios.get(`/habitacion/${id}`)

//actualizar habitacion
export const actualizarHabitacion = async (id, update) =>  axios.put(`/actualizarHabitacion/${id}`, update)

//elimina habitacion 
export const eliminarHabitacion = async (id) =>  axios.delete(`/eliminarHabitacion/${id}`)

//agrega una nueva habitacion
export const agregarHabitacion = async (id, body) =>  axios.post(`/crearHabitacion/${id}`, body)

//ruta para enviale mensajes a el mqtt
export const mensajeMQTT = async (id, body) =>  axios.post(`/mensajeMQTT/${id}`, body)

//ruta para conectarse con el servidor y el dimaster
export const conectarDimaster= async (id)=> axios.post(`/conectarMqtt/${id}`)

//ruta para desconectarse del dimaster
export const desconectarDimaster= async (id)=> axios.post(`/desconectarMqtt/${id}`)

//Ruta para traer los hoteles
export const hoteles = async () =>  axios.get(`/getHotel`)

export const hotelID = async (id) =>  axios.get(`/hotel/${id}`)

//Ruta para actualizar el hotel
export const actualizarHotel = async (id, body) =>  axios.put(`/updateHotel/${id}`, body)

//ruta para crear hoteles
export const crearHoteles = async (body)=> axios.post(`/crearHotel`, body)

//ruta para actualizar usuarios
export const actualizarUsuario = async (id, body) =>  axios.put(`/actualizarUser/${id}`, body)

//Ruta para eliminar el hotel
export const elimiarHotel = async (id) =>  axios.delete(`/deleteHotel/${id}`)

//traer todo los usuarios
export const usuarios = async ()=> axios.get("/usuarios")
//Ruta para conectar todos los dimaster
//export const conectarTodosDimaster = async (id)=>axios.post(`/conectar-dimasters/${id}`)

//ruta para obtener los datos de la ocupacion
export const datosInformes = async ()=>axios.get(`/datos`)

//verificamos el cdigio
export const verifyTokenRequet = () => axios.get(`/verify`)