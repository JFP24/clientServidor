import { BrowserRouter ,Routes, Route } from "react-router-dom"

import AgregarHabitacion from "./componentes/agregarHabitacion/agregarHabitacion.jsx";
import Login from './componentes/login/login.jsx';
import Register from './componentes/register/register.jsx';
import PanelAdministrativo from "./componentes/panelAdministrativo/panelAdministrativo.jsx"
import LoginInicio from "./componentes/inicio/inicio.jsx";
import { AuthProvider } from "./context/authContext.jsx"
import { HotelProvider } from "./context/hotelContext.jsx"
import ProtectedRoute from "./ProtectedRoutesd.jsx"
import Pruebas from "./componentes/pruebas/pruebas.jsx"
import PerfilAdministrador from "./componentes/perfil/perfil.jsx";
import DashboardHoteles from "./componentes/DashBoardHoteles/dashboardHoteles.jsx";
import DashboardHabitaciones from "./componentes/DashboarHabitaciones/dashbardHabitaciones.jsx";
import Informes from "./componentes/informes/informes.jsx"

function App() {
  return (
<AuthProvider>
 <HotelProvider>
 <BrowserRouter>
      <Routes>
   {/* RUTAS PROTEGIDAS POR AUTENTICACION */}
       <Route element={<ProtectedRoute/> }>
       <Route path="/pruebas/:id" element={<Pruebas/>}/>
      <Route path="/panelAdministrativo" element={<PanelAdministrativo/>} />
      <Route path="/agregarHabitacion/:id" element={<AgregarHabitacion/>} />
      <Route path="/perfil" element={<PerfilAdministrador/>} />
      <Route path="/dashboard/hoteles" element={<DashboardHoteles/>} />
      <Route path="/dashboard/habitaciones/:id" element={<DashboardHabitaciones/>} />
      <Route path="/informes" element={<Informes/>} />
      </Route>

      <Route path="/" element={<LoginInicio/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
    </Routes>
    </BrowserRouter>
    </HotelProvider>
    </AuthProvider>
  
 
  );
}

export default App