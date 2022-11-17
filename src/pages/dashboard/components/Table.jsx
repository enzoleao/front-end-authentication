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
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider} from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'dayjs/locale/pt-br'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';


export default function Table(){
  const [locale, setLocale] = React.useState('pt-br');
  const [data, setData] = React.useState('pt-br')
  const [open, setOpen] = React.useState(false);
  const [listAgends, setListAgends] = React.useState();
      const handleOpen = () => {
        setOpen(true);
      };
      const isWeekend = (date) => {
        const day = date.day();
        
        return day === 0 || day === 6;
      };
      const handleClose = () => {
        setOpen(false);
      };
      const [values, setValues] = React.useState({
          id:'',
          horario:'',
          pa:''
      });
      const handleChangeVal = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      };
       

    React.useEffect(()=>{
        Axios.get("https://api-agendamento-pmpa.herokuapp.com/getinfo")
        .then((response)=>{
          setListAgends(response.data)
        }); 
      },[])

    const HandleEdit = () =>{
      const value = `${data.$D}/${data.$M+1}/${data.$y}`
      Axios.put("https://api-agendamento-pmpa.herokuapp.com/atualizaragendamento",{
        values,
        value
      }).then((res)=>{
        alert("REMARCADO COM SUCESSO")
        window.location.replace('/dashboard')
        setOpen(false);
        
      }).catch((err)=>{
        alert(err.response.data.message)
      })
    }
    const handleDelete = () =>{
      Axios.delete(`https://api-agendamento-pmpa.herokuapp.com/apagaragendamento/${values.id}`)
      .then((res)=>{
        alert("DELETADO COM SUCESSO")
        setOpen(false)
        window.location.replace('/dashboard')
      }).catch((err)=>{
        alert(err.response.data.message)
      })
    }
    
      const columns2 = [
        { field: 'id', headerName: 'ID', width: 40},
        { field: 'nome', headerName: 'Nome', width: 280 },
        { field: 'rg',headerName: 'CPF', width: 120},
        { field: 'patente',headerName: 'Patente', width: 120},
        { field: 'telefone',headerName: 'Telefone', width: 120},
        { field: 'modelo',headerName: 'Modelo', width: 80 },
        { field: 'lotacao',headerName: 'Lotacao', width: 90},
        { field: 'polo',headerName: 'Polo', width: 140},
        { field: 'pa',headerName: 'P.A', width: 40},
        { field: 'data',headerName: 'Data', width: 100},
        { field: 'horario',headerName: 'Horario', width: 90},
        { field: 'Acoes', headerName: 'Acoes', width:90,
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
                  <DialogTitle>REMARCAR (PARA EXCLUIR INSIRA APENAS O ID)</DialogTitle>
                  <DialogContent >                                   
                      <div className='flex flex-col space-y-5'>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="id"
                        label="ID"
                        onChange={handleChangeVal('id')}
                        type="number"
                        fullWidth
                        variant="standard"
                      />
                      <FormControl variant="standard">
                      <InputLabel id="pa">PA</InputLabel>       
                          <Select
                                id="pa"
                                labelId="PA"
                                value={values.pa}
                                onChange={handleChangeVal('pa')}
                                sx={{width:'100px'}}

                              >                      
                                <MenuItem value="1">1</MenuItem>
                                <MenuItem value="2">2</MenuItem>                       
                              </Select>
                      </FormControl>
                      <LocalizationProvider       
                          dateAdapter={AdapterDayjs}
                          adapterLocale={locale}
                          >
                            <DatePicker
                            	disablePast
                              shouldDisableDate={isWeekend}
                              openTo="day"
                              inputFormat="DD/MM/YYYY"
                              label="Escolha a Data"
                              value={data}
                              onChange={(newValue) => {
                                setData(newValue);
                              }          
                            }

                              renderInput={(params) => 
                              <TextField
                              variant="standard"                    
                              sx={{width:"180px"}}              
                              {...params}       
                              />}
                            />
                      </LocalizationProvider>
                      <FormControl variant="standard">
                      <InputLabel id="horario">Horario</InputLabel>       
                          <Select
                                id="horario"
                                labelId="Horario"
                                value={values.horario}
                                onChange={handleChangeVal('horario')}
                                sx={{width:'100px'}}

                              >   
                                <MenuItem value="9:15">9:15</MenuItem>
                                <MenuItem value="9:45">9:45</MenuItem>
                                <MenuItem value="10:15">10:15</MenuItem>
                                <MenuItem value="10:45">10:45</MenuItem>
                                <MenuItem value="11:15">11:15</MenuItem>
                                <MenuItem value="11:45">11:45</MenuItem>
                                <MenuItem value="12:15">12:15</MenuItem>
                                <MenuItem value="14:15">14:15</MenuItem>
                                <MenuItem value="14:45">14:45</MenuItem>
                                <MenuItem value="15:15" >15:15</MenuItem>
                                <MenuItem value="15:45">15:45</MenuItem>                          
                              </Select>
                      </FormControl>
                      </div>
                  </DialogContent>
                  <DialogActions>
                    <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                    <Button color="error"  variant="outlined" onClick={handleDelete}>Excluir</Button>
                    <Button color="success" variant="outlined" onClick={HandleEdit}>Salvar</Button>
                  </DialogActions>
                </Dialog>
        
        <DataGrid
            rows={typeof listAgends !== "undefined" && listAgends.map((value)=>{
            return (
                {id:value.id, nome:value.nome, rg:value.rg, patente:value.patente, telefone:value.telefone, modelo:value.modelo, lotacao:value.lotacao,polo:value.polo, pa:value.pa, data:value.data, horario:value.horario}
                )
            })}
            columns={columns}
            pageSize={8}
            rowsPerPageOptions={[5]}
            disableColumnSelector              
        />

        </>

    )
}