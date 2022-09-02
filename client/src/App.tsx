import React, { useContext } from 'react';

import {BrowserRouter , Routes ,Route, Navigate} from "react-router-dom" ;
import { AuthContext } from './context/AuthContext';
import { userInputs } from './formSource';

import Home from './pages/home/Home';
import Hotel from './pages/hotel/Hotel';
import List from './pages/list/List';
import Login from './pages/login/Login';
import Register from './pages/register/Register';








function App() {
  const {user}=useContext(AuthContext)

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/hotels" element={<List/>}/>
      <Route path="/hotels/:id" element={<Hotel/>}/>
      <Route path="/login" element={!user?<Login/>:<Navigate to="/"></Navigate>}/>
      <Route path="/register" element={<Register inputs={userInputs} title="Add New User" />}/>
 
    </Routes>
    </BrowserRouter>
  );
}

export default App;
