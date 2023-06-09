import { ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Button, Container, Divider, List, ListItem, ListItemText, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import axios from "../axios/axios";
import ChoseTeam from "../components/ChoseTeam";
import CreateForm from "../components/CreateForm";
import { Role } from "../constants/role.type";
import { Form } from "../models/form.model";
import { FormType } from "../constants/form.type";

export default function Forms() {
  const [forms, setForms] = useState<Form[]>();
  const user = useAuthUser();
  const [open, setOpen] = useState(false);

  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => {
    setOpen(false);
    getForms();
  };

  useEffect(() => {
    getForms();
  }, [setForms])

  const getForms = () => {
    user()?.person.person.team && axios.get<Form[]>(`forms/team/${user()?.person.person.team.id}`)
      .then(response => setForms(response.data))
      .catch(error => console.log(error))
  }



  return (
    <Container className="h-[calc(100vh-56px)] overflow-y-scroll">
      {user()?.person.person.team ?
        <div>
          <div className="flex justify-center w-full">
            <span className="text-2xl">Mes formulaires</span>
          </div>
          <div className="flex justify-center p-5">
            {user()?.person.person.role == Role.MANAGER && <Button variant="contained" onClick={handleOpenModal}>Créer un formulaire</Button>}
            <Modal open={open} onClose={handleCloseModal} className="flex items-center justify-center ">
              <div>
                <CreateForm handleCloseModal={handleCloseModal}></CreateForm>
              </div>
            </Modal>
          </div>
          <List className="w-full">
            {forms?.map(form => {
              return <ListItem key={form.id}>
                <Accordion className="w-full">
                  <AccordionSummary expandIcon={<ExpandMore></ExpandMore>}>{form.type === FormType.HARASSMENT ? `Formulaire d'harcèlement` : form.type === FormType.TESTIMONY ? `Formulaire de témoignage d'harcèlement` : form.type === FormType.BURN_OUT ? `Formulaire de burn-out` : form.type === FormType.MOTIVOMETER ? `Motivomètre` : ''}</AccordionSummary>
                  <AccordionDetails>
                    <Divider></Divider>
                    <List>
                      {form.questions.map((question, index) => {
                        return (
                          <ListItem alignItems="flex-start" key={question.id}>
                            <ListItemText primary={`Question n°${index + 1}`} secondary={question.question}></ListItemText>
                          </ListItem>
                        )
                      })}
                    </List>
                  </AccordionDetails>
                </Accordion>
              </ListItem>
            })}
          </List>
        </div>
        : <ChoseTeam></ChoseTeam>
      }
    </Container>
  )
}