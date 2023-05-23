import { Avatar, Box, Button, Card, CardContent, CardHeader, FormControl, InputLabel, ListItemAvatar, ListItemText, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "../axios/axios";
import { CreateTeamDto } from "../dto/create-team.dto";
import { Person } from "../models/person.model";

interface Props {
  user: Person;
  handleCloseModal: () => void
  updateMyTeam: () => void
}

export default function CreateTeam(props: Props) {
  const [freeRHs, setFreeRH] = useState<Person[]>([]);
  const [chosenRHId, setChosenRhId] = useState<Person>({} as Person);
  const [teamName, setTeamName] = useState<string>("");


  useEffect(() => {
    // ? getting all free RH (that have no team)
    axios.get<Person[]>(`persons/all-free-rh`)
      .then(response => {
        setFreeRH(response.data);
      })
      .catch(error => console.log(error));
      
  }, [setFreeRH])

  const handleChangeRH = (event: SelectChangeEvent) => {
    setChosenRhId(JSON.parse(event.target.value));
  }

  const handleCreateTeam = () => {
    const createTeamDto: CreateTeamDto = {
      name: teamName,
      manager: props.user.id,
      rh: Number(chosenRHId)
    }
    axios.post(`teams`, createTeamDto)
      .then(response => {
        props.handleCloseModal();
        props.updateMyTeam();
      })
      .catch(error => console.log(error))
  }

  const updateTeamName = (event: any) => {
    setTeamName(event.target?.value);
  }
 
  return (
    <Box className="w-full p-5">
    <Card variant="outlined">
      <CardHeader title="Créer une équipe"></CardHeader>
      <CardContent className="space-y-5">
        <TextField type="text" value={teamName} onChange={(e) => updateTeamName(e)} variant="outlined" label="Nom d'équipe" className="w-full"></TextField>
        <FormControl fullWidth>
          <InputLabel id="choose-a-rh">Choisir un RH</InputLabel>
          <Select onChange={handleChangeRH} labelId="choose-a-rh" label="Choisir un RH" value={JSON.stringify(chosenRHId)}>
            {freeRHs.map(rh => {
              return (
                <MenuItem value={rh.id.toString()} key={rh.id.toString()}>
                  <ListItemAvatar>
                    <Avatar alt="me" src="https://lh3.googleusercontent.com/a-/AD5-WCk6_ZVTIRZduKM_Q23LIR241emWVKuzxuV6ZgKG=s3000-p"></Avatar>
                  </ListItemAvatar>
                  <ListItemText>{rh.firstname + " " + rh.lastname.toUpperCase()}</ListItemText>
                </MenuItem>
              )
            })}
          </Select>
        </FormControl>
        <div className="flex justify-center">
        <Button onClick={() => handleCreateTeam()} disabled={teamName == '' || typeof(chosenRHId) !== 'number'} variant="contained">Créer l'équipe</Button>
        </div>
      </CardContent>
    </Card>
  </Box>
  )
}