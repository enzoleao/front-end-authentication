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

export default function Dashboard(){
  const [agendados, setAgendados] = React.useState(1);
  const [open, setOpen] = React.useState(false);    
  const [novoRg,setNovoRg] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const cadastrarRg =()=>{
      Axios.post("http://localhost:3001/inserirrgnovo",{
        novoRg
      }).then((response)=>{
        alert("RG INSERIDO COM SUCESSO")
        setOpen(false);
      }).catch((err)=>{
        alert(err.response.data.message)
      })
      
  }
    return (
        <div className="h-screen min-h-full w-screen md:w-full flex flex-col ">
            <div className="w-full h-14 bg-slate-700"></div>
              <div className='w-full flex flex-col justify-center items-center space-y-2 mt-36'>
                <div className='flex space-x-2'>
                    <Button variant="outlined" onClick={()=>setAgendados(1)}>AGENDADOS</Button>
                    <Button variant="outlined" onClick={()=>setAgendados(0)}>RG'S CADASTRADOS</Button>
                    {agendados===1 ? <></> : <Button variant="outlined" color="success" onClick={()=>setOpen(true)}>ADICIONAR RG</Button>}
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
                    <DialogTitle>ADICIONAR NOVO RG</DialogTitle>
                    <DialogContent>
                    
                    <TextField
                        autoFocus
                        margin="dense"
                        id="rg"
                        value={novoRg}
                        label="Insira o RG"
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