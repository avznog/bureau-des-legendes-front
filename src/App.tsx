import { useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Navbar } from './components/Navbar';
import { AuthContext } from './context/AuthContext';
import { Login } from './pages/Login';
import { NotFound } from './pages/NotFound';

function App() {
  const logged = useContext(AuthContext);
  return (
    <div className="container">
      <AuthContext.Provider value={logged}>
        <Login logged={logged}></Login>
        <BrowserRouter>
          <Routes>
            <Route path='home'></Route>
            <Route path='register'></Route>
            <Route path='*' element={<NotFound></NotFound>}></Route>
          </Routes>
          {logged && <Navbar></Navbar>}
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
