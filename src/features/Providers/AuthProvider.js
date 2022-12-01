import {
  getCookie,
  setCookie,
} from "../../services/CookieService/CookieService";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import jwtDecode from "jwt-decode";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { loginRequest } from "../../services/AuthConfig";

function AuthProvider(props) {
  const [isAuthed, setAuthed] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isFridgeAuth, setIsFridgeAuth] = useState(false);
  const isMicrosoftAuth = useIsAuthenticated();
  const { instance, accounts } = useMsal();

  const logOut = useCallback(() => {
    if (isMicrosoftAuth) {
      instance.logoutRedirect({ postLogoutRedirectUri: "/" });
    }

    setCookie("accessToken", "", { "max-age": -1 });
    setAuthed(false);
    setIsAdmin(false);
    setUserData(null);
  }, [isMicrosoftAuth, instance]);

  const loadData = useCallback(() => {
    if (isMicrosoftAuth) {
      instance
        .acquireTokenSilent({
          ...loginRequest,
          account: accounts[0],
        })
        .then((response) => {
          setCookie("accessToken", response.accessToken);
        });
      setAuthed(true);
    } else {
      const token = getCookie("accessToken");
      if (token === null) {
        setAuthed(false);
      } else {
        setData(token);
      }
    }
    setIsLoaded(true);
  }, [isMicrosoftAuth, accounts, instance]);

  const logIn = useCallback(
    (data) => {
      setCookie("accessToken", data.jwtToken);
      loadData();
    },
    [loadData]
  );

  useEffect(() => {
    loadData();
  }, [loadData]);

  const setData = (token) => {
    setIsFridgeAuth(true);
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
      isFridgeAuth,
      logIn,
      logOut,
    }),
    [userData, isAuthed, isLoaded, isAdmin, logIn, logOut, isFridgeAuth]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
