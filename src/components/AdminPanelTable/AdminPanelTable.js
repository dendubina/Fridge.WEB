import { useEffect, useState } from "react";
import { getAllUsers } from "../../services/Http/FridgeApi/FridgeApiService";
import useAuth from "../../features/Hooks/useAuth";
import "./AdminPanelTable.css";
import { useNavigate } from "react-router-dom";

export default function AdminPanelTable() {
  const [users, setUsers] = useState([]);
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    getAllUsers()
      .then((response) => {
        if (response.status === 401) {
         auth.logOut();
         navigate("/signin");
        }
      })
      .then((result) => {
        setUsers(result);
      });
  }, [auth, navigate]);
  
  return (
    <>
      <div>this is admin table</div>
    </>
  );
}
