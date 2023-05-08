import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export function NotFound() {
  return(
    <div className="w-full justify-center bg-red-400 flex h-screen">
      <Link to="/home"><Button variant="contained" color="error">Retour à la page d'accueil</Button></Link>
    </div>
  )
}