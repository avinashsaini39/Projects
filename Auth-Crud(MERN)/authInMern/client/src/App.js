import { Route, Routes, Navigate } from 'react-router-dom';
import Signup from './components/Signup/index';
import Main from './components/Main/index';
import  Login from './components/Login/index';
import Crud from './components/Crud';
import CreateUser from './components/CreateUser';
import UpdateUser from './components/UpdateUser';



function App() {
  const user = localStorage.getItem("token");

  
  return (
    <Routes>
     {user && <Route path="/" exact element={<Main/>} /> }
     <Route path="/signup" exact element={<Signup/>} />
     <Route path="/login" exact element={<Login/>} />
     <Route path="/crud" exact element={<Crud/>} />
     <Route path="/create" exact element={<CreateUser/>} />
     <Route path="/update/:id" exact element={<UpdateUser/>} />
     
     { <Route path="/" exact element={<Navigate replace to="/login"/>} /> }
    </Routes>
  );
}

export default App;
