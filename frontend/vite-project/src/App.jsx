import { useState } from 'react'
import { BrowserRouter,Route,Routes,Navigate, Router } from 'react-router-dom'
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import ProtectedRoutes from './components/ProtectedRoutes';
import Home from './pages/Home';
function Logout(){
  localStorage.clear();
  return <Navigate to='/login'></Navigate>
}

function RegisterAndLogout(){
  localStorage.clear();
  return <Register></Register>
}


function App() {
 

  return (
    <BrowserRouter>
      <Routes>
        <Route path ='/' element = {<ProtectedRoutes><Home></Home></ProtectedRoutes>}></Route>
        <Route path ='/login' element = {<Login></Login>}></Route>
        <Route path ='/logout' element = {<Logout></Logout>}></Route>
        <Route path ='/register' element = {<RegisterAndLogout></RegisterAndLogout>}></Route>
        <Route path ='*' element ={<NotFound></NotFound>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
