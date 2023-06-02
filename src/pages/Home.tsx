import { Button, Card, CardActions, CardContent, Container, Typography } from "@mui/material";

import { useEffect, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import axios from "../axios/axios";
import ChoseTeam from "../components/ChoseTeam";
import FillForm from "../components/FillForm";
import { FormType } from "../constants/form.type";
import { Form } from "../models/form.model";

export function Home() {
  const [fillForm, setFillForm] = useState(false);
  const [formToFill, setFormToFill] = useState<Form>();
  const auth = useAuthUser();
  const [forms, setForms] = useState([]);

  useEffect(() => {
    auth()?.person.person.team && axios.get(`forms/team/${auth()?.person.person.team.id}`).then((response) => setForms(response.data)).catch((error) => console.log(error));
  }, [setForms])

  const handleFormToFill = (formToFill: Form) => {
    setFillForm(true);
    setFormToFill(formToFill);
  }

  const handleCloseForm = () => {
    setFillForm(false);
  }
  return (
    <div className="w-full h-[calc(100vh-56px)] overflow-scroll">
      {!fillForm ? <Container className="h-fit">
        {auth()?.person.person.team ? forms.map((form: Form) =>
        (<Card key={form.id} className={`mt-5 mb-5 bg-gradient-to-r ${form.type === FormType.HARASSMENT ? `from-blue-300 to-blue-700` : form.type === FormType.TESTIMONY ? `from-indigo-300 to-indigo-700` : form.type === FormType.BURN_OUT ? `from-sky-300 to-sky-700` : form.type === FormType.MOTIVOMETER ? `from-cyan-300 to-cyan-700` : ''}`}>
          <CardContent>
            <Typography variant="h5" className="text-center text-white">
              {form.type === FormType.HARASSMENT ? `Victime d'harcèlement ?` : form.type === FormType.TESTIMONY ? `Témoin d'harcèlement ?` : form.type === FormType.BURN_OUT ? `Fatigué de votre travail ?` : form.type === FormType.MOTIVOMETER ? `Motivomètre` : ''}
            </Typography>
          </CardContent>
          <CardActions className="flex justify-center">
            <Button size="medium" color="primary" variant="contained" className="text-center" onClick={() => handleFormToFill(form)}>Compléter ce formulaire</Button>
          </CardActions>
        </Card>
        ))
          :
          <ChoseTeam></ChoseTeam>
        }
      </Container>

        :
        <Container>
          <FillForm form={formToFill!} handleCloseForm={handleCloseForm}></FillForm>
        </Container>
      }
    </div>
  )
}