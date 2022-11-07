import * as React from 'react';
import Table from './components/Table';
import Button from '@mui/material/Button';
import TableRgs from './components/Tablergs'
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Axios from 'axios';
import {useContext} from "react"
import { AuthContext } from '../../contexts/auth';

export default function Dashboard(){
  const [agendados, setAgendados] = React.useState(1);
  const [open, setOpen] = React.useState(false);    
  const [novoRg,setNovoRg] = React.useState('');
  const {logout} = useContext(AuthContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleLogout = ()=>{
    logout();
  }
  const cadastrarRg =()=>{
      Axios.post("https://191.101.78.120:3000/inserirrgnovo",{
        novoRg
      }).then((response)=>{
        alert("CPF INSERIDO COM SUCESSO")
        setOpen(false);
        window.location.replace('/dashboard')
      }).catch((err)=>{
        alert(err.response.data.message)
      })
      
  }
    return (
        <div className="h-screen min-h-full w-screen md:w-full flex flex-col ">
            <div className="w-full flex justify-end items-center px-2 h-14 bg-slate-700 "><Button onClick={handleLogout} variant="contained" color="error">Sair</Button></div>
              <div className='w-full flex flex-col justify-center items-center space-y-2 mt-36'>
                <div className='flex space-x-2'>
                    <Button variant="outlined" onClick={()=>setAgendados(1)}>AGENDADOS</Button>
                    <Button variant="outlined" onClick={()=>setAgendados(0)}>CPF'S CADASTRADOS</Button>
                    {agendados===1 ? <></> : <Button variant="outlined" color="success" onClick={()=>setOpen(true)}>ADICIONAR CPF</Button>}
                </div>
                <div className='flex shadow shadow-2xl text-center h-[34rem] w-full md:w-[84rem]'>
                        {agendados===1? 
                        <Table></Table> 
                        : 
                        <TableRgs/>
                        } 
                  </div>
              </div>            
              <div>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>ADICIONAR NOVO CPF</DialogTitle>
                    <DialogContent>
                    
                    <TextField
                        autoFocus
                        margin="dense"
                        id="rg"
                        value={novoRg}
                        label="Insira o CPF"
                        type="number"
                        fullWidth
                        onChange={(e)=>setNovoRg(e.target.value)}
                        variant="standard"
                    />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} variant="outlined" color="error">Cancelar</Button>
                        <Button onClick={cadastrarRg} variant="outlined" color="success">Adicionar</Button>
                    </DialogActions>
                </Dialog>
                </div>
        </div>
    )
}