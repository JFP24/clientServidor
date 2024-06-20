import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext.jsx";
import { HotelProvider } from "./context/hotelContext.jsx";
import ProtectedRoute from "./ProtectedRoutesd.jsx";
import RolRoute from "./rolRoute.jsx";
import Usuarios from "./componentes/usuarios/usuarios.jsx";
import AgregarHabitacion from "./componentes/agregarHabitacion/agregarHabitacion.jsx";
import Login from "./componentes/login/login.jsx";
import Register from "./componentes/register/register.jsx";
import PanelAdministrativo from "./componentes/panelAdministrativo/panelAdministrativo.jsx";
import LoginInicio from "./componentes/inicio/inicio.jsx";
import Pruebas from "./componentes/pruebas/pruebas.jsx";
import PerfilAdministrador from "./componentes/perfil/perfil.jsx";
import DashboardHoteles from "./componentes/DashBoardHoteles/dashboardHoteles.jsx";
import DashboardHabitaciones from "./componentes/DashboarHabitaciones/dashbardHabitaciones.jsx";
import Informes from "./componentes/informes/informes.jsx";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirigir a una ruta específica al recargar la página
    navigate("/");
  }, [navigate]);

  return (
    <AuthProvider>
      <HotelProvider>
        <BrowserRouter>
          <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={<LoginInicio />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Rutas protegidas por autenticación */}
            <Route element={<ProtectedRoute />}>
              <Route path="/panelAdministrativo" element={<PanelAdministrativo />} />
              <Route path="/perfil" element={<PerfilAdministrador />} />
              
              {/* Rutas protegidas por rol (admin) */}
              <Route element={<RolRoute />}>
                <Route path="/pruebas/:id" element={<Pruebas />} />
                <Route path="/agregarHabitacion/:id" element={<AgregarHabitacion />} />
                <Route path="/dashboard/habitaciones/:id" element={<DashboardHabitaciones />} />
                <Route path="/dashboard/hoteles" element={<DashboardHoteles />} />
                <Route path="/informes" element={<Informes />} />
                <Route path="/dashboard/usuarios" element={<Usuarios />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </HotelProvider>
    </AuthProvider>
  );
}

export default App;
