import { useAuthUser, useIsAuthenticated } from "react-auth-kit";

export function Home() {
  const auth = useAuthUser();
  const isAuthenticated = useIsAuthenticated();
  
  return (<div>
    <p>{isAuthenticated() ? 
    'Logged' : 'Not logged'}</p>
    <p>Bienvenue {auth()?.user}</p>
  </div>)
}