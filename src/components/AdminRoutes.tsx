
import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoutes = () => {
  const { isAuthenticated, user } = useAuth();
  if (!isAuthenticated && !user?.roles.includes("ADMIN")) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet/>
};

export default AdminRoutes;
