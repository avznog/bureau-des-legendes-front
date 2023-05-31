import { Button, Card, CardActions, CardContent, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { Alert } from "../models/alert.model";
import axios from "../axios/axios";
import { FormType } from "../constants/form.type";
import dayjs from "dayjs";
import { constants } from "buffer";
import { Role } from "../constants/role.type";

function AlertPage() {
    const auth = useAuthUser();
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        if (auth()?.person.person.role === Role.RH) {
            axios.get(`alerts/reviewer/${auth()?.person.person.id}`).then((response) => setAlerts(response.data)).catch((error) => console.log(error))
        }
        else if (auth()?.person.person.role === Role.MEMBER || auth()?.person.person.role === Role.MANAGER) {
            axios.get(`alerts/filler/${auth()?.person.person.id}`).then((response) => setAlerts(response.data)).catch((error) => console.log(error))
        }
    }, [setAlerts])
    
    return (
        <Container>
            {alerts.map((alert: Alert) => 
                (
                <Card className={`mt-5 mb-5 bg-gradient-to-r ${alert.form.type === FormType.HARASSMENT ? `from-blue-300 to-blue-700` : alert.form.type === FormType.TESTIMONY ? `from-indigo-300 to-indigo-700` : alert.form.type === FormType.BURN_OUT ? `from-sky-300 to-sky-700` : alert.form.type === FormType.MOTIVOMETER ? `from-cyan-300 to-cyan-700` : ''}`}>
                    <CardContent>
                      <Typography variant="h4" className="text-center text-white">
                        {alert.form.type === FormType.HARASSMENT ? `Victime d'harcèlement ?` : alert.form.type === FormType.TESTIMONY ? `Témoin d'harcèlement ?` : alert.form.type === FormType.BURN_OUT ? `Fatigué de votre travail ?` : alert.form.type === FormType.MOTIVOMETER ? `Motivomètre` : ''}
                      </Typography>
                      <Typography variant="h5" className="text-center text-white">
                        {alert.anonymous && auth()?.person.person.role === Role.RH ? `Attention cette alerte est anonyme` : `Rempli par ${alert.filler.firstname} ${alert.filler.lastname} le ${dayjs(alert.creationDate).format("DD/MM/YYYY")}`}
                      </Typography>
                    </CardContent>
                    <CardActions className="flex justify-center">
                      <Button size="medium" color="primary" variant="contained" className="text-center">Accéder à ce formulaire</Button>
                    </CardActions>
                </Card>
                )  
            )}
        </Container>
    )
}

export default AlertPage;