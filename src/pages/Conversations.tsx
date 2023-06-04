import { Avatar, Link, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";
import { useEffect, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import axios from "../axios/axios";
import { Alert } from "../models/alert.model";
import { Message } from "../models/message.model";
import OneConversation from "../components/OneConversation";
import { Role } from "../constants/role.type";

export default function Conversations() {
  const user = useAuthUser();
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [alertId, setAlertId] = useState<number>();
  const [accessConversation, setAccessConversation] = useState(false);
  const [listMessage, setListMessage] = useState<Message[]>([]);

  useEffect(() => {
  if (user()?.person.person.role === Role.RH) {
      axios.get<Alert[]>(`alerts/by-reviewer/${user()?.person.person.id}`).then((response) => {
        setAlerts(response.data)
      }).catch((error) => console.log(error))
  } else {
      axios.get<Alert[]>(`alerts/by-filler/${user()?.person.person.id}`).then((response) => {
        setAlerts(response.data)
      }).catch((error) => console.log(error))
  }
  }, [setAlerts]);

  const handleClickConversation = (listMessage: Message[], alertId: number) => {
    setAccessConversation(true);
    console.log(listMessage);
    setListMessage(listMessage);
    setAlertId(alertId);
  }

  const handleAccessConversation = () => {
    setAccessConversation(false);
  }

  return (
    <div className="w-full h-[calc(100vh-56px)] overflow-scroll flex justify-center">
      {!accessConversation ? <div className="w-full">
        <div className="w-full p-5 text-2xl text-center">Mes conversations</div>
        <div className="justify-center w-full">
          <List>
            {
              alerts.map(alert => {
                return (
                  <Link component="button" variant="body2" onClick={() => handleClickConversation(alert.messages, alert.id)}>
                    <ListItem key={alert.id}>
                      <ListItemButton>
                        <ListItemAvatar>
                          <Avatar alt={alert.reviewer.firstname.charAt(0).toUpperCase() + alert.reviewer.lastname.charAt(0).toUpperCase()} src={alert.reviewer.photo}></Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={alert.reviewer.firstname.charAt(0).toUpperCase() + alert.reviewer.firstname.slice(1) + " " + alert.reviewer.lastname.toUpperCase()} secondary={alert.status +  " - " + new Date(alert.creationDate).toLocaleDateString("fr-FR")}>
                        </ListItemText>
                      </ListItemButton>
                    </ListItem>
                  </Link>
                )
              })
            }
          </List>
        </div>
      </div>
      : <OneConversation listMessage={listMessage} alertId={alertId!} handleAccessConversation={handleAccessConversation}/>
      }
    </div>
  )
}