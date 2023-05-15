import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { HomeIcon } from "./icons/HomeIcon";
import { useState } from "react";
import { AccountIcon } from "./icons/AccountIcon";
import { LogoutIcon } from "./icons/LogoutIcon";
import { useNavigate } from "react-router-dom";
import { useAuthUser } from "react-auth-kit";

export function Navbar() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const userAuth = useAuthUser();
  return (
    userAuth() && <div className="fixed bottom-0 w-full">

    <BottomNavigation className="w-full" showLabels value={value} onChange={(event, newValue) => setValue(newValue)}>
      <BottomNavigationAction onClick={() => navigate('home')} label="Home" icon={<HomeIcon></HomeIcon>}></BottomNavigationAction>
      <BottomNavigationAction>B</BottomNavigationAction>
      <BottomNavigationAction label="Account" icon={<AccountIcon></AccountIcon>}></BottomNavigationAction>
      <BottomNavigationAction onClick={() => navigate('logout')} label="Logout" icon={<LogoutIcon></LogoutIcon>}></BottomNavigationAction>
    </BottomNavigation>
    </div>
  )
}