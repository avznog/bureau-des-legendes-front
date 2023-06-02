import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ChoseTeam() {
  const navigate = useNavigate();
  return (
    <div className="w-full">
      <div className="flex justify-center w-full p-5">Vous devez d'abord chosir une équipe :</div>
      <div className="flex justify-center w-full">
        <Button className="justify-center" variant="contained" onClick={() => navigate('/team')}>Choisir une équipe</Button>
      </div>
    </div>
  )
}