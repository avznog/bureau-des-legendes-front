import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { Alert, Button, FormControl, InputLabel, MenuItem, Select, Snackbar, TextField } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "../axios/axios";
import { Role } from "../constants/role.type";
import { validEmail, validPassword } from '../regex/regex';

export default function Register() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [open, setOpen] = useState(false);
  const [role , setRole] = useState<Role | string>('');
  const [alert, setAlert] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const handleSubmit = async () => {
    
    setLoading(true);
    if(password !== confirmPassword) {
      displayAlert('missmatch');
    } 
    else if (emailErr === true) {
      displayAlert('errEmail');
    }
    else if (passwordError === true) {
      displayAlert('errPassword');
    }
    else {
      axios.post("/auth/register", {
        firstname: firstname,
        lastname: lastname,
        password: password,
        email: email,
        phone: phone,
        role: role
      })
        .then(response => {
          displayAlert("success");
        })
        .catch(error => {
          displayAlert("error");
        })
    }
  }

  const handleChangeEmail = (e:any) => {
    if (!validEmail.test(e.target?.value)) {
      setEmailErr(true);
    }
    else {
      setEmailErr(false);
    }
    setEmail(e.target?.value);
  }

  const handleChangePassword = (e:any) => {
    if (!validPassword.test(e.target?.value)) {
      setPasswordError(true);
    }
    else {
      setPasswordError(false);
    }
    setPassword(e.target?.value);
  }

  const displayAlert = (state: string) => {
    setAlert(state);
    setOpen(true);
    setInterval(() => setOpen(false), 2000);
    setLoading(false);
  }

  return(
    <div className="h-screen">
      <Link to={"/login"}><Button><KeyboardArrowLeftIcon></KeyboardArrowLeftIcon></Button></Link>
      <div className="flex items-center justify-center pt-0 mt-0 align-baseline">
        <div className="max-h-screen pt-0 mx-10 my-0 mt-0">
          <div className="flex justify-center w-full pb-10">
            <span className="text-lg ">S'inscrire</span>
          </div>
          <div className="w-full max-h-screen space-y-2 overflow-scroll">
            <TextField className="w-full" type="text" label="Prénom" onChange={(e) => setFirstname(e.target?.value)}></TextField>
            <TextField className="w-full" type="text" label="Nom" onChange={(e) => setLastname(e.target?.value)}></TextField>
            <TextField className="w-full" type="email" label="Email" onChange={(e) => handleChangeEmail(e)}></TextField>
            <TextField className="w-full" type="tel" label="Téléphone" onChange={(e) => setPhone(e.target?.value)}></TextField>
            <TextField className="w-full" type="password" label="Mot de passe" onChange={(e) => handleChangePassword(e)}></TextField>
            <TextField className="w-full" type="password" label="Répéter le mot de passe" onChange={(e) => setConfirmPassword(e.target?.value)}></TextField>
            <FormControl className="w-full" fullWidth variant="outlined">
              <InputLabel id="role">Je suis</InputLabel>
              <Select labelId="role" id="role" value={role} onChange={(e) => setRole(e.target?.value)}>
                <MenuItem value={Role.MEMBER}>Membre</MenuItem>
                <MenuItem value={Role.RH}>RH</MenuItem>
                <MenuItem value={Role.MANAGER}>Manager</MenuItem>
              </Select>
            </FormControl>
            <div className="flex justify-center">
              <Button onClick={() => handleSubmit()} variant="contained" disabled={(firstname === '' || lastname === '' || email === '' || phone === '' || role === '' || !email.includes('@') || loading)}>S'inscrire</Button>
            </div>
          </div>
        </div>
        <Snackbar open={open} className="w-1/2" autoHideDuration={2000} message={"Test"}>
          <Alert severity={alert === 'success' ? 'success' : alert === 'error' ? 'error' : alert === 'missmatch' ? 'error' : alert === 'errValidation' ? 'error' : alert === 'errPassword' ? 'error' : 'info'}>{alert === 'success' ? 'Inscription réussie' : alert === 'missmatch' ? "Les mots de passe sont différents" : alert === 'errValidation' ? "Le mail n'est pas valide" : alert === 'errPassword' ? "Le mot de passe doit contenir au minimum 1 majuscule, 1 minuscule et 8 caracètres" : "L'inscription a échoué"}</Alert>
        </Snackbar>
      </div>
    </div>
  )
}