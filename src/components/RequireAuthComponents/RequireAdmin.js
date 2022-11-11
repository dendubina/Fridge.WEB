import { Navigate } from "react-router-dom";
import useAuth from "../../features/Hooks/useAuth";

export default function RequireAdmin({ children }) {
  const auth = useAuth();

  return auth.isAdmin ? children : <Navigate replace to="/" />;
}
