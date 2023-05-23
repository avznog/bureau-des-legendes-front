import { ExpandMore, GroupAdd } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Button, Divider, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import axios from "../axios/axios";
import CreateTeam from "../components/CreateTeam";
import { Role } from "../constants/role.type";
import { Person } from "../models/person.model";
import { Team } from "../models/team.model";

export default function MyTeam() {
  const user = useAuthUser();
  const [teams, setTeams] = useState<Team[]>([] as Team[]);
  const [open, setOpen] = useState<boolean>(false);
  const [team, setTeam] = useState<Team>({} as Team);

  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  useEffect(() => {
    // ? getting all the teams
    updateMyTeam()

    axios.get<Team[]>(`teams`)
    .then(response => {
      setTeams(response.data);
    })
    .catch(error => console.log(error));
    
    
  }, [setTeams, setTeam, user()]);

  const updateMyTeam = () => {
   // ? getting my team
   axios.get<Team>(`teams/by-member-id/${user()?.person.person.id}`)
   .then(response => {
     setTeam(response.data);
   })
   .catch(error => console.log(error))
  }
  // ? if i join a team
  const handleJoinTeam = (teamId: number) => {
    axios.get<Person>(`persons/set-team`, {
      params: {
        teamId: teamId,
        personId: user()!.person.person.id
      }
    })
      .then(response => {
        const team = teams.find(t => t.id == teamId);
        if (team) {
          team.members.push(user()!.person.person);
          setTeam(team);
        }
      })
      .catch(error => console.log(error))

   

  }
  return (
    <div className="w-full">
      <div className="flex justify-center w-full h-screen mb-[56px]">
        <div className="self-center w-full h-full">
          <div className="flex justify-center w-full">
            <label className="text-3xl">{team ? "Mon équipe" : "Toutes les équipes"}</label>
          </div>
          {
            
  
            // ? displaying teams
            // ? If user has no team, he can join one
            // ? if user is a Manager, then he can create a team
            !team ?
              <div>
                {user()?.person.person.role == Role.MANAGER &&
                <div className="flex justify-center p-5">
                  <Button variant="contained" onClick={handleOpenModal}>Créer une équipe</Button>
                  <Modal open={open} onClose={handleCloseModal} className="flex items-center justify-center ">
                    <div><CreateTeam user={user()?.person.person} handleCloseModal={handleCloseModal} updateMyTeam={updateMyTeam}></CreateTeam></div>
                  </Modal>
                </div>
                }
                <List className="w-full">
                {teams.map(team => {
                  return <ListItem key={team.id}>
                    <Accordion key={team.id} className="w-full">
                      <AccordionSummary key={team.id} expandIcon={<ExpandMore></ExpandMore>}>{team.name}</AccordionSummary>
                      <AccordionDetails key={team.id}>
                        <List key={team.id}>
                          {team.members.map(member => {
                            return (
                              <ListItem key={member.id} alignItems="flex-start">
                                <ListItemAvatar key={member.id}>
                                  <Avatar key={member.id} alt="me" src="https://lh3.googleusercontent.com/a-/AD5-WCk6_ZVTIRZduKM_Q23LIR241emWVKuzxuV6ZgKG=s3000-p"></Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={member.firstname + " " + member.lastname.toUpperCase()} secondary={member.role}>
                                </ListItemText>
                              </ListItem>
                            )
                          })}
                          <ListItem alignItems="flex-start" key={team.id}>
                            <ListItemButton key={team.id} disabled={user()?.person.person.role != Role.MEMBER || team.members.some(m => m.role == Role.RH || m.role == Role.MANAGER)} onClick={() => handleJoinTeam(team.id)}>
                              <ListItemAvatar><GroupAdd color="success"></GroupAdd></ListItemAvatar>
                              <ListItemText>Rejoindre l'équipe</ListItemText>
                            </ListItemButton>
                          </ListItem>
                        </List>
                      </AccordionDetails>
                    </Accordion>
                  </ListItem>
                })}
              </List>
              </div>
              // ? if user has a team, then just display it
              : team.members && team.members.map(member => {
                return (
                  <List key={member.id}>
                    <ListItem alignItems="flex-start" key={member.id}>
                      <ListItemAvatar key={member.id}>
                        <Avatar key={member.id} alt="me" src="https://lh3.googleusercontent.com/a-/AD5-WCk6_ZVTIRZduKM_Q23LIR241emWVKuzxuV6ZgKG=s3000-p"></Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={member.firstname + " " + member.lastname.toUpperCase()} secondary={member.role}>
                      </ListItemText>
                    </ListItem>
                    <Divider></Divider>
                  </List>
                )
              })}
        </div>
      </div>
    </div>
  )
}