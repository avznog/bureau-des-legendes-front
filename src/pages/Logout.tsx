import { Button } from "@mui/material";
import { useSignOut } from "react-auth-kit";
import { useNavigate } from "react-router-dom";

export function Logout() {
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
  return(
    <div>
      <Button onClick={() => logout()} variant="contained">Se déconnecter</Button>
    </div>
  )
}