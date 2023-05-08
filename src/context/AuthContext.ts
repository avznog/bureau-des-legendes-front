import { createContext } from "react";

export const AuthContext = createContext({
  logged: false,
  setLogged: (newLogged: boolean) => {}
});