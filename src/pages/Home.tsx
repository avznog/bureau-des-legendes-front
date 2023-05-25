import { Button, Card, CardActions, CardContent, Container, Typography } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { useAuthUser, useIsAuthenticated } from "react-auth-kit";

export function Home() {
  useEffect(() => {
    axios.get(`http://localhost:8000/forms/team/1`).then((response) => console.log(response.data)).catch((error) => console.log(error));
  })
    
  return (
  <Container>
        <Card className="mt-5 mb-5 bg-gradient-to-r from-blue-300 to-blue-700">
          <CardContent>
            <Typography variant="h5" className="text-center text-white">
              Victime d'harcèlement ?
            </Typography>
          </CardContent>
          <CardActions className="flex justify-center">
            <Button size="medium" color="primary" variant="contained" className="text-center">Complétez ce formulaire</Button>
          </CardActions>
        </Card>

        <Card className="mt-5 mb-5 bg-gradient-to-r from-indigo-300 to-indigo-700">
          <CardContent>
            <Typography variant="h5" className="text-center text-white">
            Témoin d'harcèlement ?
            </Typography>
          </CardContent>
          <CardActions className="flex justify-center">
            <Button size="medium" color="primary" variant="contained" className="text-center">Complétez ce formulaire</Button>
          </CardActions>
        </Card>

        <Card className="mt-5 mb-5 bg-gradient-to-r from-sky-300 to-sky-700">
          <CardContent>
            <Typography variant="h5" className="text-center text-white">
            Fatigué de votre travail ?
            </Typography>
          </CardContent>
          <CardActions className="flex justify-center">
            <Button size="medium" color="primary" variant="contained" className="text-center">Complétez ce formulaire</Button>
          </CardActions>
        </Card>
  </Container>
  )
}