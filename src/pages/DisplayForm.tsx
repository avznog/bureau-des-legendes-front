import { useEffect, useState } from "react"
import { Form } from "../models/form.model"
import axios from "../axios/axios";
import { Container, TextField } from "@mui/material";
import { FormType } from "../constants/form.type";

interface Props {
  formId: number,
}

export default function DisplayForm(props: Props) {
  const [form, setForm] = useState<Form>();
  useEffect(() => {
    axios.get<Form>(`forms/find-one/${props.formId}`)
      .then(response => {
        setForm(response.data)
      })
      .catch(error => console.log(error))
  }, [setForm])
  return (
    <>
    <Container>
      
        <label className="text-2xl">Formulaire de {form && (form.type === FormType.HARASSMENT ? `Victime d'harcèlement` : form.type === FormType.TESTIMONY ? `Témoin d'harcèlement` : form.type === FormType.BURN_OUT ? `Fatigue au travail` : form.type === FormType.MOTIVOMETER ? `Motivomètre` : '')}</label>
      
      {form && form.answers.map(answer => {
            return (
              <div key={answer.id} >
                <label className="bold">{answer.question.question}</label>
                <TextField disabled={true} label={answer.answer} className="w-full"></TextField>
              </div>
            )
          })}
    </Container>
    </>
  )
}