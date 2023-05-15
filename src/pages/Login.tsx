import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useAuthUser, useSignIn } from "react-auth-kit";
import { redirect, useNavigate } from "react-router-dom";


export function Login() {
  const authUser = useAuthUser();
  const navigate = useNavigate();
  // useEffect(() => {
  //   if(authUser()) {
  //     navigate('/home')
  //   }
  // })
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const signIn = useSignIn();
  const updateUsername = (event: any) => {
    setUsername(event.target.value)
  };

  const updatePassword = (event: any) => {
    setPassword(event.target.value);
  }

  const login = async () => {
    // const response = await axios.post('auth/login', { username: username, password: password});
    const response = {
      data: {
        isSuccess: true,
        access_token: "dzadzadza",
        refresh_token: "dzad",
        email: 'bgonzva@juniorisep.com'
      }
    }
    if(response.data.isSuccess) {
      signIn({
        token: response.data.access_token,
        refreshToken: response.data.refresh_token,
        expiresIn: 3600,
        tokenType: "Bearer",
        authState: { email: response.data.email },
        refreshTokenExpireIn: 60
      })
      navigate('/home');
    }
  };
  return (
    <div className="flex items-center justify-center h-screen align-baseline">
      <div className="mx-10">
        <span className="justify-center w-full text-lg">Connexion</span>
        <div className="w-full space-y-2">
          <TextField value={username} onInput={e => updateUsername(e)} className="w-full" label="username" variant="outlined"></TextField>
          <TextField value={password} onInput={e => updatePassword(e)} className="w-full" label="password" type="password" variant="outlined"></TextField>
        </div>
        <div className="flex justify-center w-full p-5">
          <Button onClick={() => login()} variant="outlined" className="flex self-center">Se connecter</Button>
        </div>
      </div>
    </div>
  )
}