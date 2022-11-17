import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import {settingsIcon} from '../../icons'
import Axios from 'axios'
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
export default function Tablergs(){
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState({
    id: '',
    rg: '',
    
  });
  const [listRgs, setListRgs] = React.useState();
  
      const handleEditSubmit = () => {
        Axios.put("https://api-agendamento-pmpa.herokuapp.com/atualizarrg",{
          values
        }).then((response)=>{
          alert("Alterado com sucesso!")
          setOpen(false);
          window.location.replace('/dashboard')
        }).catch((err)=>{
          alert(err.response.data.message)
        })
      };
      const deletarRg = ()=>{
        Axios.delete(`https://api-agendamento-pmpa.herokuapp.com/apagaridregistrado/${values.id}`)
        .then((res)=>{
          alert("Deletado com sucesso")        
          setOpen(false)
          window.location.replace('/dashboard')
        }).catch((err)=>{
          alert(err.response.data.message)
        })
      }
      const handleChangeVal = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      };
      const handleOpen = ()=>{
        setOpen(true)
      }
      const handleClose = () => {
        setOpen(false);
      };

    React.useEffect(()=>{
        Axios.get("https://api-agendamento-pmpa.herokuapp.com/getallcpf")
        .then((response)=>{
            setListRgs(response.data)
        }); 
      },[])
    
      const columns2 = [
        { field: 'id', headerName: 'ID', width: 140},
        { field: 'rg',headerName: 'CPF', width: 140},     
        { field: 'Acoes', headerName: 'Acoes', width:140,
        renderCell: () => (
          <strong>
            
            <Button
              variant="outlined"
              size="small"
              style={{ textAlign:'center'}}
              onClick={handleOpen}
            >
              {settingsIcon}
            </Button>
          </strong>
        ),
      },
        
      ];
      const columns = React.useMemo(
        ()=>
        columns2.map((col)=>
        col.field == col.field ? {...col, sortable:false} : col,
        ),
        [columns2]
      )
    return (
        <>
        <Dialog open={open} onClose={handleClose} >
                  <DialogTitle>Editar</DialogTitle>
                  <DialogContent sx={{display:'flex', flexDirection:'column'}}>                  
                      <TextField
                        autoFocus
                        margin="dense"
                        id="id"
                        onChange={handleChangeVal("id")}
                        label="INSIRA O ID"
                        type="number"
                        fullWidth
                        variant="standard"
                      />
                      <TextField
                        autoFocus
                        margin="dense"
                        id="rg"
                        label="INSIRA O CPF"
                        onChange={handleChangeVal("rg")}
                        type="number"                   
                        variant="standard"
                      />
                      
                  </DialogContent>
                  <DialogActions>
                    <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                    <Button color="error"  variant="outlined" onClick={deletarRg}>Excluir</Button>
                    <Button color="success" variant="outlined" onClick={handleEditSubmit}>Salvar</Button>
                  </DialogActions>
                </Dialog>
        <div className='flex flex-row w-full h-full justify-center items-center'>
            <div className='h-full w-3/4'>
                <DataGrid 
                    sx={{display:'flex'}}
                    rows={typeof listRgs !== "undefined" && listRgs.map((value)=>{
                    return (
                        {id:value.id, rg:value.cpf
                        }
                        )
                    })}
                    columns={columns}
                    pageSize={8}
                    rowsPerPageOptions={[5]}
                    disableColumnSelector              
                />
            </div>
        </div>

        </>

    )
}