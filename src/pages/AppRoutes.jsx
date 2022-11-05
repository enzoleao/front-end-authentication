import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom' 
import Agendamento from './Agendamento'
import Login from './login'
import Dashboard from './dashboard'
import * as React from 'react';
import {useContext} from "react";
import { AuthProvider, AuthContext} from '../contexts/auth';


function AppRoutes() {
    const Private = ({children}) =>{
        const {authenticated, loading} = useContext(AuthContext);
        
        if (loading){
          return <div className='loading'>Carregando...</div>
        }
        if (!authenticated){
          return <Navigate to="/login"/>
        }
        return children;
      }
    return(
      <Router>
        <AuthProvider>
            <Routes>
                <Route path='/' element={<Agendamento/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/dashboard' element={<Private><Dashboard/></Private>}/>
            </Routes>
        </AuthProvider>
      </Router>
    )
  
}

export default AppRoutes
