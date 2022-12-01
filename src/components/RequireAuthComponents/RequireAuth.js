import { Navigate } from "react-router-dom";
import useAuth from "../../features/Hooks/useAuth";

export default function RequireAuth({ children }) {
  const auth = useAuth();

  return auth.isAuthed ? children : <Navigate replace to="/" />;
}
