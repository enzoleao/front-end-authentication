import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom' 
import Login from './login'
import Home from './home'
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
      <Router >
        <AuthProvider>
            <Routes>
                <Route path='/login' element={<Login/>}/>
                <Route path='/' element={<Private><Home/></Private>}/>
            </Routes>
        </AuthProvider>
      </Router>
    )
  
}

export default AppRoutes
