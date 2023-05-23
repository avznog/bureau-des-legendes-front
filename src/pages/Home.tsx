import { useAuthUser, useIsAuthenticated } from "react-auth-kit";

export function Home() {
  const auth = useAuthUser();
  const isAuthenticated = useIsAuthenticated();
  return (<div>
    <p>{isAuthenticated() ? 'logged' : 'not logged'}</p>
    <p>User : {auth()?.user }</p>
  </div>)
}