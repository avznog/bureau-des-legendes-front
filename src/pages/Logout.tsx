import { Button } from "@mui/material";
import { useSignOut } from "react-auth-kit";

export function Logout() {
  const signOut = useSignOut();
  const onLogout = () => {
    signOut();
  };
  return(
    <div>
      <Button variant="contained" onClick={() => onLogout()}>Se déconnecter</Button>
    </div>
  )
}