import { Accordion, AccordionDetails, AccordionSummary, Avatar, Button, Container, Divider, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";
import { useEffect, useState } from "react";
import { useAuthUser, useSignOut } from "react-auth-kit"
import { Person } from "../models/person.model";
import axios from "../axios/axios";
import { useNavigate } from "react-router-dom";
import { ExpandMore, GroupAdd } from "@mui/icons-material";
import { Role } from "../constants/role.type";

export default function Account() {
  const user = useAuthUser();
  const [me, setMe] = useState<Person>();
  useEffect(() => {
    axios.get<Person>(`persons/me/${user()?.person.person.id}`)
      .then(response => {
        console.log(response.data)
        setMe(response.data)
      })
      .catch(error => console.log(error))
  }, [setMe])


  const signOut = useSignOut(); 
  const navigate = useNavigate();
  function logout() {
    localStorage.removeItem("_auth");
    localStorage.removeItem("_auth_state");
    localStorage.removeItem("_auth_storage");
    localStorage.removeItem("_auth_type");
    navigate("/login");
    signOut();
    
  }
  return (
    <Container>
      <div className="w-full">
      <div className="flex justify-center w-full h-screen mb-[56px]">
        <div className="self-center w-full h-full">
          <div className="justify-center w-full">
            <label className="flex justify-center w-full p-5 text-3xl">{me?.firstname + " " + me?.lastname.toUpperCase()}</label>
            <div className="flex justify-center w-full">
              <Avatar alt="Ma photo" sx={{ height: 200, width: 200 }} src={user()!.person.person.photo}></Avatar>
            </div>
            <Divider className="pt-5"/>
            <div className="flex justify-center w-full pt-5">
              <span className="text-2xl">Mon équipe</span>
            </div>
            <div className="flex justify-center w-full p-5">
              {me?.team && <Accordion key={me?.team.id} className="w-full">
                <AccordionSummary key={me?.team.id} expandIcon={<ExpandMore></ExpandMore>}>{me?.team.name}</AccordionSummary>
                <AccordionDetails key={me?.team.id}>
                  <List key={me?.team.id}>
                    {me?.team.members != undefined && me?.team.members.map(member => {
                      if(member && member != undefined && typeof(member) != 'number') {
                        return (
                          <ListItem key={member.id} alignItems="flex-start">
                            <ListItemAvatar key={member.id}>
                              <Avatar key={member.id} alt="me" src="https://lh3.googleusercontent.com/a-/AD5-WCk6_ZVTIRZduKM_Q23LIR241emWVKuzxuV6ZgKG=s3000-p"></Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={member.firstname + " " + member.lastname.toUpperCase()} secondary={member.role}>
                            </ListItemText>
                          </ListItem>
                        )
                      }
                    })}
                  </List>
                </AccordionDetails>
              </Accordion>}
            </div>
            <Divider/>
            <div className="flex justify-center w-full pt-5">
              <Button onClick={() => logout()} variant="contained" color="error">Se déconnecter</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Container>
  )
}