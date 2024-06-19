import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/authContext.jsx";

const RolRoute = () => {
  const { loading, isAuthenticated, profile } = useAuth();

  if (loading) return <h1>Loading...</h1>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (profile?.userProfile?.rol !== "Admin") return <Navigate to="/panelAdministrativo" replace />;
console.log(profile)
  return <Outlet />;
};

export default RolRoute;
