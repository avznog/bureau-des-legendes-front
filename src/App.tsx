import { AuthProvider, RequireAuth } from 'react-auth-kit';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Logout } from './pages/Logout';
import { NotFound } from './pages/NotFound';
import refreshApi from './services/refreshApi';

function App() {
  return (
    <div className="container">
       <AuthProvider
       authType='localstorage'
       authName='_auth'
       refresh={refreshApi}
       >
         <BrowserRouter>
          <Routes>
            <Route path='login' element={<Login></Login>}></Route>
            <Route path='home' element={<RequireAuth loginPath='/login'><Home></Home></RequireAuth>}></Route>
            <Route path='logout' element={<RequireAuth loginPath='/login'><Logout></Logout></RequireAuth>}></Route>
            <Route path='*' element={<RequireAuth loginPath='/login'><NotFound></NotFound></RequireAuth>}></Route>
          </Routes>
            <Navbar></Navbar>
        </BrowserRouter>
       </AuthProvider>
    </div>
  );
}

export default App;
