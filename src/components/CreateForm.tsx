import { Add, Send } from "@mui/icons-material";
import { Box, Button, Card, CardContent, CardHeader, Container, InputLabel, TextField, Select, SelectChangeEvent, MenuItem, FormControl } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { Question } from "../models/question.model";
import { FormType } from "../constants/form.type";
import axios from "../axios/axios";
import { Form } from "../models/form.model";
import { CreateFormDto } from "../dto/create-form.dto";
import { useAuthUser } from "react-auth-kit";
import { CreateQuestionDto } from "../dto/create-question.dto";

interface Props {
  handleCloseModal: () => void;
}

export default function CreateForm(props: Props) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [typeForm, setTypeForm] = useState<string>();
  const user = useAuthUser();
  
  const handleChangeQuestion = (index: number, e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    questions[index].question = e.target.value;
    setQuestions(questions)
  }

  const handleOnAddQuestion = () => {
    setQuestions(questions.concat([{} as Question]))
  }

  const handleCreateForm = async () => {
    const createFormDto: CreateFormDto = {
      creationDate: new Date(),
      creatorId: user()?.person.person.id,
      teamId: user()?.person.person.team.id,
      type: typeForm as FormType
    }
    try {
      const form = (await axios.post<Form>(`forms`, createFormDto)).data;
      const createQuestionsDto : CreateQuestionDto[] = questions.map(question => {
        return {
          question: question.question,
          form: form
        }
      });
      axios.post(`questions/multiple`, createQuestionsDto)
        .then(response => props.handleCloseModal())
        .catch(error => console.log(error))
      
      
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Container>
      <Box>
      <Card variant="outlined">
        <CardHeader className="w-full text-center" title="Créer un formulaire"></CardHeader>
        <CardContent className="space-y-5">
        <div className="flex justify-center">
          <FormControl fullWidth>
          <InputLabel id="type-form">Type de formulaire</InputLabel>
          <Select labelId="type-form" value={typeForm} label="Type de formulaire" onChange={(e: SelectChangeEvent) => setTypeForm(e.target.value)}>
            {Object.keys(FormType).map((type, index) => {
              return (
                <MenuItem key={index} value={type}>{type === FormType.HARASSMENT ? `Victime d'harcèlement` : type === FormType.TESTIMONY ? `Témoin d'harcèlement` : type === FormType.BURN_OUT ? `Fatigué de votre travail ?` : type === FormType.MOTIVOMETER ? `Motivomètre` : ''}</MenuItem>
                )
              })}
          </Select>
          </FormControl>
        </div>
          {questions.map((question, index) => {
            return (
              <TextField key={index} type="text" value={questions[index].question} onChange={(e) => handleChangeQuestion(index, e)} variant="outlined" label={`Question n° ${index + 1}`} className="w-full"></TextField>
            )
          })}
          <div className="inline-flex justify-between w-full">
            <Button variant="contained" className="left-0 w-1/4" onClick={handleOnAddQuestion}><Add></Add></Button>
            <Button variant="contained" disabled={!typeForm || questions.length <= 0} className="right-0 w-1/4" color="success" onClick={handleCreateForm}><Send></Send></Button>
          </div>
        </CardContent>
      </Card>
    </Box>
    </Container>
  )
}