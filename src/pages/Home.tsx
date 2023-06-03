import { Avatar, Button, Card, CardActions, CardContent, Container, IconButton, Typography } from "@mui/material";
import axios from "../axios/axios";
import { useEffect, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import ChoseTeam from "../components/ChoseTeam";
import FillForm from "../components/FillForm";
import { FormType } from "../constants/form.type";
import { Form } from "../models/form.model";
import { useNavigate } from "react-router-dom";

export function Home() {
  const [fillForm, setFillForm] = useState(false);
  const [formToFill, setFormToFill] = useState<Form>();
  const auth = useAuthUser();
  const [forms, setForms] = useState([]);
  const navigate = useNavigate();

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
      <div className="flex justify-end w-full h-fit">
        <IconButton onClick={() => navigate('/account')}><Avatar sx={{height: 30, width: 30}} alt="Ma photo" className="transition-all" src={auth()?.person.person.photo}></Avatar></IconButton>
      </div>
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