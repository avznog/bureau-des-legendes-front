import { Alert, Button, Snackbar, TextField } from "@mui/material";
import { useState } from "react";
import { useSignIn } from "react-auth-kit";
import { Link, useNavigate } from "react-router-dom";
import axios from "../axios/axios";


export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState('');
  const [loading, setLoading] = useState(false);
  const signIn = useSignIn();
  const navigate = useNavigate();
  const updateEmail = (event: any) => {
    setEmail(event.target.value)
  };

  const updatePassword = (event: any) => {
    setPassword(event.target.value);
  }
  const login = async () => {
    const user = await axios.post("auth/login", {
      email: email,
      password: password
    });
    if(user.data.authorized) {
      signIn({
        token: user.data.access_token,
        expiresIn: 3600,
        tokenType: "Bearer",
        authState: { person: user.data }
      })
      displayAlert('success');
      navigate("/home");
    } else {
      displayAlert('error')
    }
  };

  const displayAlert = (state: string) => {
    setAlert(state);
    setOpen(true);
    setInterval(() => setOpen(false), 2000);
    setLoading(false);
  };

  
  return (
    <div className="flex items-center justify-center h-screen align-baseline">
      <div className="mx-10">
        <span className="justify-center w-full text-lg">Connexion</span>
        <div className="w-full space-y-2">
          <TextField value={email} onInput={e => updateEmail(e)} className="w-full" label="email" variant="outlined"></TextField>
          <TextField value={password} onInput={e => updatePassword(e)} className="w-full" label="password" type="password" variant="outlined"></TextField>
        </div>
        <div className="p-5 ">
          <div className="justify-center w-full pb-2">
          </div>
          <div className="flex justify-center w-full">
            <Button onClick={() => login()} variant="contained">Se connecter</Button>
          </div>
          <div className="flex justify-center">
            <Link to="/register"><Button>Je n'ai pas de compte</Button></Link>
          </div>
        </div>
      </div>
      <Snackbar open={open} className="w-1/2" autoHideDuration={2000} message={"Test"}>
          <Alert severity={alert == 'success' ? 'success' : alert == 'error' ? 'error' : 'info'}>{alert == 'success' ? 'Authentification réussie' : "L'authentification a échoué"}</Alert>
        </Snackbar>
    </div>
  )
}