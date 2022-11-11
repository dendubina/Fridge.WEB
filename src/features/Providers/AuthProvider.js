import {
  getCookie,
  setCookie,
} from "../../services/CookieService/CookieService";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import jwtDecode from "jwt-decode";

function AuthProvider(props) {
  const [isAuthed, setAuthed] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userData, setUserData] = useState(null);

  const logOut = useCallback(() => {
    setCookie("jwttoken", "", { "max-age": -1 });
    setAuthed(false);
    setIsAdmin(false);
    setUserData(null);
  }, []);

  const loadData = useCallback(() => {
    const token = getCookie("jwttoken");

    if (token === null) {
      setAuthed(false);
    } else {
      setData(token);
    }
    setIsLoaded(true);
  }, []);

  const logIn = useCallback(
    (data) => {
      setCookie("jwttoken", data.jwtToken);
      loadData();
    },
    [loadData]
  );

  useEffect(() => {
    loadData();
  }, [loadData]);

  const setData = (token) => {
    setAuthed(true);
    const decoded = jwtDecode(token);
    setUserData(decoded);

    if (decoded.role.includes("Admin")) {
      setIsAdmin(true);
    }
  };

  const contextValue = useMemo(
    () => ({
      isLoaded,
      isAuthed,
      userData,
      isAdmin,
      logIn,
      logOut,
    }),
    [userData, isAuthed, isLoaded, isAdmin, logIn, logOut]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
