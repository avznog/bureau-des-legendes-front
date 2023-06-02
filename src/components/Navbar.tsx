import { Avatar, BottomNavigation, BottomNavigationAction } from "@mui/material";
import { useState } from "react";
import { useAuthUser, useIsAuthenticated } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import { FormsIcon } from "./icons/FormsIcon";
import { HomeIcon } from "./icons/HomeIcon";
import TeamIcon from "./icons/TeamIcon";

export function Navbar() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();
  const user = useAuthUser();
  return (
    <div>
      {isAuthenticated() && <div className="fixed bottom-0 w-full">
        <BottomNavigation className="w-full" showLabels value={value} onChange={(event, newValue) => setValue(newValue)}>
          <BottomNavigationAction value={0} onClick={() => navigate('home')} label="Home" icon={<HomeIcon></HomeIcon>} />
          <BottomNavigationAction value={1} onClick={() => navigate('forms')} label="Formulaires" icon={<FormsIcon></FormsIcon>} />
          <BottomNavigationAction value={2} onClick={() => navigate("team")} label="Équipe" icon={<TeamIcon></TeamIcon>} />
          <BottomNavigationAction value={3} onClick={() => navigate('account')} icon={<Avatar alt="Ma photo" className="transition-all" sx={value == 3 ? { height: 35, width: 35 } : { height: 25, width: 25 }} src={user()?.person.person.photo}></Avatar>} />
        </BottomNavigation>
      </div>}
    </div>
  )
}