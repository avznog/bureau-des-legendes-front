import { Avatar, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";
import { useEffect, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import axios from "../axios/axios";
import { Alert } from "../models/alert.model";

export default function Conversations() {
  const user = useAuthUser();
  const [alerts, setAlerts] = useState<Alert[]>([]);
  useEffect(() => {
    axios.get<Alert[]>(`alerts/by-filler/${user()?.person.person.id}`)
      .then(response => setAlerts(response.data))
      .catch(error => console.log(error))
  }, [setAlerts]);

  return (
    <div className="w-full h-[calc(100vh-56px)] overflow-scroll flex justify-center">
      <div className="w-full">
        <div className="w-full p-5 text-2xl text-center">Mes conversations</div>
        <div className="justify-center w-full">
          <List>
            {
              alerts.map(alert => {
                return (
                  <ListItem key={alert.id}>
                    <ListItemButton>
                      <ListItemAvatar>
                        <Avatar alt={alert.reviewer.firstname.charAt(0).toUpperCase() + alert.reviewer.lastname.charAt(0).toUpperCase()} src={alert.reviewer.photo}></Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={alert.reviewer.firstname.charAt(0).toUpperCase() + alert.reviewer.firstname.slice(1) + " " + alert.reviewer.lastname.toUpperCase()} secondary={alert.status +  " - " + new Date(alert.creationDate).toLocaleDateString("fr-FR")}>
                      </ListItemText>
                    </ListItemButton>
                  </ListItem>
                )
              })
            }
          </List>
        </div>
      </div>

    </div>
  )
}