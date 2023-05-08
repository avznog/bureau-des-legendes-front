import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { HomeIcon } from "./icons/HomeIcon";
import { useState } from "react";
import { AccountIcon } from "./icons/AccountIcon";

export function Navbar() {
  const [value, setValue] = useState(0);
  return (
    <div className="fixed bottom-0 w-full">

    <BottomNavigation className="w-full" showLabels value={value} onChange={(event, newValue) => setValue(newValue)}>
      <BottomNavigationAction label="Home" icon={<HomeIcon></HomeIcon>}></BottomNavigationAction>
      <BottomNavigationAction>B</BottomNavigationAction>
      <BottomNavigationAction>C</BottomNavigationAction>
      <BottomNavigationAction label="Account" icon={<AccountIcon></AccountIcon>}></BottomNavigationAction>
    </BottomNavigation>
    </div>
  )
}