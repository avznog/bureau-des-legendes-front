import { Button, Card, CardActions, CardContent, Container, Typography } from "@mui/material";
import axios from "../axios/axios";
import { useEffect, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { FormType } from "../constants/form.type";
import { Form } from "../models/form.model";

export function Home() {
  const auth = useAuthUser();
  const [forms, setForms] = useState([]);

  useEffect(() => {
    axios.get(`forms/team/${auth()?.person.person.team.id}`).then((response) => setForms(response.data)).catch((error) => console.log(error));
  }, [setForms])
    
  return (
  <Container>
    {forms.map((form: Form) =>
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
  ))}
  </Container>
  )
}