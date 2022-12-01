import { createContext } from "react";

export const AuthContext = createContext({
  isLoaded: false,
  isAuthed: false,
  isAdmin: false,
  isFridgeAuth: false,
  userData: null,
  logIn: () => {},
  logOut: () => {},
});
