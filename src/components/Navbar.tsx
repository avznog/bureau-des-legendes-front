import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { useState } from "react";
import { useIsAuthenticated } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import { FormsIcon } from "./icons/FormsIcon";
import { HomeIcon } from "./icons/HomeIcon";
import { LogoutIcon } from "./icons/LogoutIcon";
import TeamIcon from "./icons/TeamIcon";

export function Navbar() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();
  return (
    <div>
    { isAuthenticated() && <div className="fixed bottom-0 w-full">
    <BottomNavigation className="w-full" showLabels value={value} onChange={(event, newValue) => setValue(newValue)}>
      <BottomNavigationAction value={0} onClick={() => navigate('home')} label="Accueil" icon={<HomeIcon></HomeIcon>}/>
      <BottomNavigationAction value={1} onClick={() => navigate('alert')} label="Alertes" icon={<FormsIcon></FormsIcon>}/>
      <BottomNavigationAction value={2} onClick={() => navigate("team")} label="Équipe" icon={<TeamIcon></TeamIcon>}/>
      <BottomNavigationAction value={3} onClick={() => navigate('logout')} label="Logout" icon={<LogoutIcon></LogoutIcon>}/>
    </BottomNavigation>
    </div>}
    </div>
  )
}