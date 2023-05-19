import { AuthProvider, RequireAuth } from 'react-auth-kit';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Logout } from './pages/Logout';
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
              <Route path='logout' element={<RequireAuth loginPath='/login'><Logout></Logout></RequireAuth>}></Route>
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
