import { AuthProvider, RequireAuth } from 'react-auth-kit';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Navbar } from './components/Navbar';
import Account from './pages/Account';
import Conversations from './pages/Conversations';
import Forms from './pages/Forms';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import MyTeam from './pages/MyTeam';
import Register from './pages/Register';

function App() {
  return (
    <div>
      <AuthProvider
        authType='localstorage'
        authName='_auth'
      >
        <BrowserRouter>
          <div className='App'>
            <Routes>
              <Route path='login' element={<Login></Login>}></Route>
              <Route path='register' element={<Register></Register>}></Route>
              <Route path='home' element={<RequireAuth loginPath='/login'><Home></Home></RequireAuth>}></Route>
              <Route path='team' element={<RequireAuth loginPath='/login'><MyTeam></MyTeam></RequireAuth>}></Route>
              <Route path='account' element={<RequireAuth loginPath='/login'><Account></Account></RequireAuth>}></Route>
              <Route path='forms' element={<RequireAuth loginPath='/login'><Forms></Forms></RequireAuth>}></Route>
              <Route path='conversations' element={<RequireAuth loginPath='/login'><Conversations></Conversations></RequireAuth>}></Route>
              <Route path='alerts' element={<RequireAuth loginPath='/login'><div></div></RequireAuth>}></Route>
              <Route path='*' element={<RequireAuth loginPath='/login'><Home></Home></RequireAuth>}></Route>
            </Routes>
            <Navbar></Navbar>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
