import { Button, FormControlLabel, Switch, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import axios from "../axios/axios";
import { Status } from "../constants/status.type";
import { CreateAlertDto } from "../dto/create-alert.dto";
import { CreateAnswerDto } from "../dto/create-answer.dto";
import { Alert } from "../models/alert.model";
import { Form } from "../models/form.model";
import { Team } from "../models/team.model";

interface Props {
  form: Form;
  handleCloseForm: () => void;
}

export default function FillForm(props: Props) {
  const [questions, setQuestions] = useState<Map<number, string>>(new Map<number, string>());
  const [anonymous, setAnonymous] = useState(false);
  const [sendMail, setSendMail] = useState(false);
  const [myTeam, setMyTeam] = useState<Team>({} as Team);
  const user = useAuthUser();

  const handleFillField = (questionId: number, answer: string) => {
    setQuestions(questions.set(questionId, answer));
  }

  useEffect(() => {
    // ? getting my team
    axios.get(`teams/by-member-id/${user()?.person.person.id}`)
      .then(response => {
        setMyTeam(response.data)
      })
      .catch(error => console.log(error))
  }, [setMyTeam])

  const handleSendForm = () => {
    const createAnswerDto: CreateAnswerDto[] = [];
    questions.forEach((answer, questionId) => {
      createAnswerDto.push({
        answer: answer,
        questionId: questionId,
        formId: props.form.id
      });
    });
    
    // ? creating the alert
    axios.post(`answers/multiple`, createAnswerDto)
      .catch(error => console.log(error))
    const createAlertDto: CreateAlertDto = {
      anonymous: anonymous,
      creationDate: new Date(),
      sendMail: sendMail,
      fillerId: user()?.person.person.id,
      reviewerId: myTeam.rh.id,
      formId: props.form.id,
      status: Status.STARTED
    }

    // TODO -> to remove, only make a request to all alerts
    axios.post<Alert>(`alerts`, createAlertDto)
      .then(response => {
        user()!.person.person.filledAlerts.push(response.data);
      })
      .catch(error => console.log(error))


    props.handleCloseForm();
  }

  return (
    <div className="w-full">
      <label className="flex p-5 text-2xl text-center">Remplir le formulaire de {props.form.type}</label>
      <div className="flex justify-center w-full">
        <Button variant="contained" color="error" onClick={props.handleCloseForm}>Annuler</Button>
      </div>
      <div className="z-0 flex items-center justify-center p-5 overflow-scroll align-baseline">
        <div className="space-y-5">
          {props.form.questions.map(question => {
            return (
              <TextField key={question.id} label={question.question} onChange={(e) => handleFillField(question.id, e.target.value)} className="w-full"></TextField>
            )
          })}
          <div className="inline-flex justify-center w-full">
            <FormControlLabel label="Anonyme ?" control={<Switch onChange={() => setAnonymous(!anonymous)} checked={anonymous}></Switch>}></FormControlLabel>
          </div>
          <div className="inline-flex justify-center w-full">
            <FormControlLabel label="Envoyer un mail ?" control={<Switch onChange={() => setSendMail(!sendMail)} checked={sendMail}></Switch>}></FormControlLabel>
          </div>
          <div className="flex justify-center">
            <Button variant="contained" onClick={handleSendForm}>Envoyer le formulaire</Button>
          </div>
        </div>
      </div>
    </div>
  )
}