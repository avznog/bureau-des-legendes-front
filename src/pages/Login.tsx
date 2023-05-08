import { Button, TextField } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


export function Login(props: any) {
  const setLogged = useContext(AuthContext);
  
  return (
    <div className="flex items-center justify-center h-screen align-baseline">
      <p>context : {`${props.logged}`}</p>
      <Button>update connected</Button>
      <div className="mx-10">
        <span className="justify-center w-full text-lg">Connexion</span>
        <div className="w-full space-y-2">
          <TextField className="w-full" label="username" variant="outlined"></TextField>
          <TextField className="w-full" label="password" type="password" variant="outlined"></TextField>
        </div>
        <div className="flex justify-center w-full p-5">
          <Button variant="outlined" className="flex self-center">Se connecter</Button>
        </div>
      </div>
    </div>
  )
}