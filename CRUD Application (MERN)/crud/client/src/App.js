
import { Routes, Route } from 'react-router-dom';
import './App.css';
import User from './components/getuser/User';
import Add from './components/adduser/Add';
import Edit from './components/updateuser/Edit';
import React from 'react';

function App() {

  



  return (
    <div className="App">
     
     <Routes>
      <Route path='/' element={<User/>} />
      <Route path='/add' element={<Add/>} />
      <Route path='/edit/:id' element={<Edit/>} />
     </Routes>
    </div>
  );
}

export default App;
