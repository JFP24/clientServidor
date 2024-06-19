import { createContext , useState, useContext, useEffect} from "react";
import { usuarios,registerRequest, loginRequest, verifyTokenRequet, informacionPerfil,actualizarUsuario } from "../api/request.js"
import Cookies from "js-cookie"

export const AuthContext = createContext();

export const useAuth = ()=> {
    const context = useContext(AuthContext)
    if(!context){
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}

export const AuthProvider = ({children})=> {
const [user, setUser]=useState(null)
const [isAuthenticated, setIAuthenticated] = useState(false)
const [error , setErrors] = useState([])
//console.log(error)
const [loading, setLoading]= useState(true)


const signup = async (user)=> {
  try {
    
    const res =  await registerRequest(user)
    console.log(res)
    setUser(res.data)
    setIAuthenticated(true)
  } catch (error) {
    console.log(error.response.data)
    setErrors(error.response.data)
  }
}

const signin = async (user)=>{
try {
  
  const res =await loginRequest(user)
  console.log(res)
  setUser(res.data)
  setIAuthenticated(true)
} catch (error) {
  console.log(error)
  if(Array.isArray(error.response.data)){
    return setErrors(error.response.data)
  }
  setErrors([error.response.data.message])
}
}

useEffect(()=>{
if(error.length > 0){
  //hacemos un timer para borrar las validaciones de los errores
  const timer = setTimeout(()=> {
    setErrors([])
  }, 5000)
  //se limpia el timer cuando ya no renderiza el componente
  return ()=> clearTimeout(timer)
}
},[error])

const logout = async ()=> {
  Cookies.remove("token");
  setIAuthenticated(false);
  setUser(null)
}

useEffect(()=>{
  async function checkLogin(){
  const cookies = Cookies.get()
  
if(!cookies.token) {
  setIAuthenticated(false)
  setLoading(false)
  return //setUser(null)

}
try {
  //console.log(cookies.token)
  const res = await verifyTokenRequet(cookies.token)
  //console.log(res.data)
  if(!res.data) { 
    setIAuthenticated(false)
    setLoading(false)
    return
  }
  setIAuthenticated(true)
  setUser(res.data)
  setLoading(false)
  //console.log(cookies.token)
} catch (error) {
  setIAuthenticated(false)
  setUser(null)
  setLoading(false)
  console.log(error)
}
}
checkLogin()
},[])


const [profile , setProfile]=useState([])

    const getProfile = async (id)=> {
      console.log(id)
        const res = await informacionPerfil(id)
        setProfile(res.data)
      // console.log(res.data)
    }


const actualizarUser = async (id , body)=>{
  try {
    actualizarUsuario(id, body)
  } catch (error) {
    console.log(error)
  }
}



const [users , setUsers]=useState()

const usuarioTodos = async (id , body)=>{
  try {
    const re = await usuarios()
    setUsers(re.data)
  } catch (error) {
    console.log(error)
  }
}



    return (
        <AuthContext.Provider value={{users , usuarioTodos,signup ,signin, user, isAuthenticated, error, loading , logout, getProfile, profile,actualizarUser}}>
            {children}
        </AuthContext.Provider>
    )
}