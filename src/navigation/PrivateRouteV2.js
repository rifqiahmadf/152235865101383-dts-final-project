import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function PrivateRouteV2() {
  const { currentUser } = useAuth();

  return currentUser ? <Outlet /> : <Navigate to="/signin" />;
}
