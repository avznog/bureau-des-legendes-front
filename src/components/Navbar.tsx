import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { useState } from "react";
import { useIsAuthenticated } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import { AccountIcon } from "./icons/AccountIcon";
import { FormsIcon } from "./icons/FormsIcon";
import { HomeIcon } from "./icons/HomeIcon";
import { LogoutIcon } from "./icons/LogoutIcon";

export function Navbar() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();
  return (
    <div>
    { isAuthenticated() && <div className="fixed bottom-0 w-full">
    <BottomNavigation className="w-full" showLabels value={value} onChange={(event, newValue) => setValue(newValue)}>
      <BottomNavigationAction onClick={() => navigate('home')} label="Home" icon={<HomeIcon></HomeIcon>}></BottomNavigationAction>
      <BottomNavigationAction label="Formulaires" icon={<FormsIcon></FormsIcon>}></BottomNavigationAction>
      <BottomNavigationAction label="Account" icon={<AccountIcon></AccountIcon>}></BottomNavigationAction>
      <BottomNavigationAction onClick={() => navigate('logout')} label="Logout" icon={<LogoutIcon></LogoutIcon>}></BottomNavigationAction>
    </BottomNavigation>
    </div>}
    </div>
  )
}