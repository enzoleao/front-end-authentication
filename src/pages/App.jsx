import './Home.css'
import Agendamento from './Agendamento'
import Login from '../pages/login'
import Dashboard from '../pages/dashboard'
import * as React from 'react';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom' 

function App() {
  
    return(

      <Router>
          <Routes>
              <Route path='/' element={<Agendamento/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/dashboard' element={<Dashboard/>}/>
          </Routes>
      </Router>
      // <div className='h-screen min-h-full w-screen md:w-full flex flex-col  justify-between items-center'>
      //     <div className='flex w-screen items-center h-14 justify-center bg-slate-700 text-white text-xl  '></div>
      //     <img src={brasao} alt="" style={{width:'100px'}}/>
      //     <Agendamento/>
      // </div>
    )
  
}

export default App
