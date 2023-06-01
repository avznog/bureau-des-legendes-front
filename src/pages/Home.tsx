import { Button, Card, CardActions, CardContent, Container, Typography } from "@mui/material";

import { useEffect, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { FormType } from "../constants/form.type";
import { Form } from "../models/form.model";
import axios from "../axios/axios";
import { useNavigate } from "react-router-dom";

export function Home() {
  const auth = useAuthUser();
  const [forms, setForms] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    auth()?.person.person.team && axios.get(`forms/team/${auth()?.person.person.team.id}`).then((response) => setForms(response.data)).catch((error) => console.log(error));
  }, [setForms])
    
  return (
  <div className="w-full">
    {auth()?.person.person.team ? forms.map((form: Form) =>
    ( <Card className={`mt-5 mb-5 bg-gradient-to-r ${form.type === FormType.HARASSMENT ? `from-blue-300 to-blue-700` : form.type === FormType.TESTIMONY ? `from-indigo-300 to-indigo-700` : form.type === FormType.BURN_OUT ? `from-sky-300 to-sky-700` : form.type === FormType.MOTIVOMETER ? `from-cyan-300 to-cyan-700` : ''}`}>
        <CardContent>
          <Typography variant="h5" className="text-center text-white">
            {form.type === FormType.HARASSMENT ? `Victime d'harcèlement ?` : form.type === FormType.TESTIMONY ? `Témoin d'harcèlement ?` : form.type === FormType.BURN_OUT ? `Fatigué de votre travail ?` : form.type === FormType.MOTIVOMETER ? `Motivomètre` : ''}
          </Typography>
        </CardContent>
        <CardActions className="flex justify-center">
          <Button size="medium" color="primary" variant="contained" className="text-center">Complétez ce formulaire</Button>
        </CardActions>
      </Card>
  )) 
  :
  <div className="w-full">
    <div className="flex justify-center w-full p-5">Vous devez d'abord chosir une équipe :</div>
    <div className="flex justify-center w-full">
      <Button className="justify-center" variant="contained" onClick={() => navigate('/team')}>Choisir une équipe</Button>
    </div>
  </div> 
  }
  </div>
  )
}