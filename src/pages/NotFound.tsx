import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export function NotFound() {
  return(
    <div className="flex justify-center w-full h-screen bg-red-400">
      <Link to="home"><Button variant="contained" color="error">Retour à la page d'accueil</Button></Link>
    </div>
  )
}