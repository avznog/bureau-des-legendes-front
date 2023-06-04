import { Button, Container, Input, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { Message } from "../models/message.model";
import { socket } from "../socket/socket";
import dayjs from "dayjs";

interface Props {
    listMessage: Message[]
    alertId: number
    handleAccessConversation : () => void
}

function OneConversation(props: Props) {
    const user = useAuthUser();
    const [listMessage, setListMessage] = useState<Message[]>(props.listMessage);
    const [content, setContent] = useState<string>("");
   
    const handleSendMessage = () => {
        socket.emit('message', { content: content, alertId: props.alertId, senderId: user()?.person.person.id, date: new Date()});
        setContent("");
    }

    const messageListener = (newMessage: Message) => {
        console.log(newMessage);
        setListMessage([...listMessage, newMessage]);
    }

    socket.on("message", messageListener)

    // Sort listMessage before rendering -> seule solution trouvée
    listMessage.sort(function (a, b) {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
    });

    return (
        <div className="my-5 mx-10">
            <div className="mb-3">
                <Button variant="contained" color="error" onClick={props.handleAccessConversation}>Précédent</Button>
            </div> 
            {listMessage.map((message) => (
                <div className={message.sender.id === user()?.person.person.id ? "flex justify-end" : "flex justify-start"}>
                    <div className={message.sender.id === user()?.person.person.id ? " bg-sky-300 mb-1 rounded p-2" : "bg-emerald-300 mb-1 rounded p-2"}>
                        <Typography className={message.sender.id === user()?.person.person.id ? "text-right text-white" : "text-left text-white"}>{dayjs(message.date).format("DD/MM/YYYY HH:mm:ss")}</Typography>
                        <Typography className={message.sender.id === user()?.person.person.id ? "text-right text-white" : "text-left text-white"}>{message.content}</Typography>
                    </div>
                </div>
            ))}
            <div className="mx-3 my-5">
                <Input type="text" className="mr-2" value={content} onChange={(event) => setContent(event?.target.value)}/>
                <Button variant="contained" onClick={handleSendMessage} className="">Envoyer</Button>
            </div>
        </div>
    )
}

export default OneConversation;