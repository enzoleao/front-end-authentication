import './Home.css'
import Agendamento from './Agendamento'
import * as React from 'react';
import brasao from "../public/brasao_pmpa.png"


function Home() {
  
    return(
      <div className='h-screen min-h-full w-screen md:w-full flex flex-col  justify-between items-center'>
          <div className='flex w-screen items-center h-14 justify-center bg-slate-700 text-white text-xl  '></div>
          <img src={brasao} alt="" style={{width:'100px'}}/>
          <Agendamento/>
      </div>
    )
  
}

export default Home
