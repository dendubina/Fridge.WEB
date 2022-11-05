import {
  getCookie,
  setCookie,
} from "../../services/CookieService/CookieService";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AuthContext } from "../Contexts/AuthContext";

function AuthProvider(props) {
  const [isAuthed, setAuthed] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [userData, setUserData] = useState(null);

  const logOut = useCallback(() => {
    setCookie("jwttoken", "", { "max-age": -1 });
    setAuthed(false);
    setUserData(null);
  }, []);

  const logIn = useCallback((data) => {
    setCookie("jwttoken", data.jwtToken);
    setUserData(data);
    setAuthed(true);
  }, []);

  const loadData = useCallback(() => {
    const token = getCookie("jwttoken");

    if (token === null) {
      setAuthed(false);
    } else {
      setAuthed(true);
    }
    
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const contextValue = useMemo(
    () => ({
      isLoaded,
      isAuthed,
      userData,
      logIn,
      logOut,
    }),
    [userData, isAuthed, isLoaded, logIn, logOut]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
