import { createContext , useState, useContext, useEffect} from "react";
import {informacionHabitacion, 
    actualizarHabitacion, 
    agregarHabitacion, 
    eliminarHabitacion,
     conectarDimaster, 
     desconectarDimaster,
     mensajeMQTT, 
     actualizarHotel,
    hoteles,
    hotelID,
    elimiarHotel,
    crearHoteles,
    datosInformes
} from "../api/request.js"


export const HotelContext = createContext();

export const useHotel = ()=> {
    const context = useContext(HotelContext)
    if(!context){
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}

export const HotelProvider = ({children})=> {

const [habitaciones , setHabitaciones]=useState([])
const [mensajeError , setMensajeError] = useState()
const [hotel, setHotel] = useState()
const [hotelid , setHotelid] = useState()
const [datoshoteles, setDatosHoteles] = useState()


const getHabitaciones = async (id)=> {
        const res = await informacionHabitacion(id)
        setHabitaciones(res.data)
      // console.log(res.data)
}

const getHoteles = async ()=>{
try {
    const res = await hoteles()
   setHotel(res.data)
} catch (error) {
    console.log(error)
}
}
 

const hotelIDs = async (id)=>{
    try {
        const res = await hotelID(id)
        setHotelid(res.data)
       
    } catch (error) {
        console.log(error)
    }
}
   
const actualizarHabitaciones = async (id, update)=>{
    try {
        await actualizarHabitacion(id, update)
   } catch (error) {
       console.log(error)
   }

}



const crearHabitaciones = async (id, body)=>{
    try {
        await agregarHabitacion(id, body)
   } catch (error) {
       console.log(error)
   }

}

const crearHuesped = async (id , body)=>{
    try {
        console.log(id, body)
        await agregarHuesped(id,body)
    }catch(error){
        console.log(error)
    }
}
  

const eliminarHabitaciones = async (id)=>{
    try {
        await eliminarHabitacion(id)
   } catch (error) {
       console.log(error)
   }

}
  


// const eliminarHuespedes = async (id)=>{
//     try {
//         await eliminarHuesped(id)
//    } catch (error) {
//        console.log(error)
//    }

// }
  


const conectarMqtt = async (id)=>{
    try {
        const conexion = await conectarDimaster(id)
        setMensajeError(conexion.data)
   } catch (error) {
       console.log(error)
   }

}
const desconectarMqtt = async (id)=>{
    try {
       const conct = await desconectarDimaster(id)
     //  console.log(conct)
       setMensajeError(conct.data)
   } catch (error) {
       console.log(error)
   }

}

const mensajes = async (id, body)=>{
    try {
       // console.log(body)
    const prueba = await mensajeMQTT(id, body)
     console.log(body)
   } catch (error) {
       console.log(error)
   }

}

const actualizarHoteles = async (id, body)=>{
    try {
       // console.log(body)
   await actualizarHotel(id, body)
     console.log(id)
   } catch (error) {
       console.log(error)
   }

}


const eliminarHoteles = async (id)=>{
    try {
        await elimiarHotel(id)
    } catch (error) {
        console.log(error)
    }
}


const crearhotel = async (body)=>{
    try {
       console.log(body)
       await crearHoteles(body)
        
    } catch (error) {
        console.log(error)
    }
}



const datosInformacion = async ()=>{
    try {
       const data =  await datosInformes()
      
        setDatosHoteles(data.data)
    } catch (error) {
        console.log(error)
    }
}

    

    return (
        <HotelContext.Provider value={{crearhotel,datoshoteles,datosInformacion, eliminarHoteles, actualizarHoteles,hotelid, hotelIDs,hotel,getHoteles, crearHuesped, mensajeError , desconectarMqtt,mensajes,conectarMqtt,crearHabitaciones,eliminarHabitaciones,getHabitaciones, habitaciones, actualizarHabitaciones}}>
            {children}
        </HotelContext.Provider>
    )
}