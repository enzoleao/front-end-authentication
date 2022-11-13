import {listCargos} from "./cargos"
import {batalhoes} from "./batalhoes"
import * as React from 'react';
import TextField from "@mui/material/TextField";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider} from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Axios from "axios"
import Brasao from '../../public/brasao_pmpa.png'
import 'dayjs/locale/pt-br'
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';



const locales = ['pt-br']
function Agendamento() {
  const [locale, setLocale] = React.useState('pt-br');
  const [open, setOpen] = React.useState(false);
  const [erro, setErro] = React.useState(null)
  const [erroNome, setErroNome] = React.useState(null)
  const isWeekend = (date) => {
    const day = date.day();
    
    return day === 0 || day === 6;
  };
  function disablePrevDates() {
    return date.getDay() === 0;
  }
  const [newData, setNewData] = React.useState(null);
  const [values, setValues] = React.useState({
    nome: '',
    rg: '',
    telefone: '',
    patente:'',
    lotacao:'',
    modelo:'',
    pa:'',
    data:'',
    horario:'',
 
  });
  const enviarAgend=()=>{
      const value = `${newData.$D}/${newData.$M}/${newData.$y}`
      Axios.post("https://191.101.78.120:3000/agend", {
        values,
        value
      }).then((res)=>{
        alert("AGENDADO COM SUCESSO")
        window.location.replace('/')
        setErro(2)
      }).catch((err)=>{
        setErroNome(err.response.data.message)
        setErro(1)
        setOpen(true)
      })
  }

  const handleChangeVal = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  

  return (
      <div className='h-screen min-h-full w-screen md:w-full flex flex-col  justify-between items-center'>
        <img src={Brasao} style={{width:'100px'}}></img>
        <div>
                  { erro == 1? 
                    <Box sx={{ width: '100%', position:'block' }}>
                    <Collapse in={open}>
                      <Alert
                      severity="error"
                        action={
                          <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                              setOpen(false);
                            }}
                          >
                            x
                          </IconButton>
                        }
                        sx={{ mb: 2 }}
                        >
                        {erroNome}                     
                      </Alert>
                    </Collapse>
                    
                  </Box>
                    :
                    <div></div>          
                }
                {
                  erro == 2 ? 
                  <Box sx={{ width: '100%', display:'fixed' }}>
                    <Collapse in={open}>
                      <Alert
                      severity="error"
                        action={
                          <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                              setOpen(false);
                            }}
                          >
                            x
                          </IconButton>
                        }
                        sx={{ mb: 2 }}
                        >
                        Agendado com sucesso!                     
                      </Alert>
                    </Collapse>
                    
                  </Box>
                  :
                  <div></div> 
                }
        </div>
        <div className="flex flex-col w-screen  md:w-[55rem] h-[44rem] space-y-4 mb-20 items-center  rounded-md shadow-2xl min-h-[43rem]">
          
            <div className="flex flex-col flex-grow w-full items-center space-y-5 ">
                <div className="flex flex-col w-5/6 text-white mt-10">
                  <TextField
                    id="nome"
                    label="Nome"
                    type="text"
                    variant="standard"
                    onChange={handleChangeVal('nome')}
                  />
                </div>
                <div className="flex flex-col w-5/6 text-white">
                  <TextField
                    id="rg"
                    label="CPF"
                    type="number"
                    variant="standard"
                    onChange={handleChangeVal('rg')}
                    sx={{width:'140px'}}
                  />
                </div>
                <div className="flex flex-col w-5/6 text-white">
                  <TextField
                    id="telefone"
                    label="Telefone (DD) + TEL"
                    type="number"
                    variant="standard"
                    onChange={handleChangeVal('telefone')}
                    sx={{width:"200px"}}
                  />
                </div>
                <div className="flex flex-col w-5/6 text-white">
                  <FormControl variant="standard">
                      <InputLabel id="graduacao">Posto / Graduação</InputLabel>
                      <Select
                        labelId="graduacao"
                        id="graduacao"
                        value={values.patente}
                        onChange={handleChangeVal('patente')}
                        sx={{width:'160px'}}
                      >
                        {listCargos.map((item,index)=><MenuItem key={item.id} value={item.name}>{item.name}</MenuItem>
                        )}
                      </Select>
                  </FormControl>
                </div>
                <div className="flex flex-col w-5/6 text-white">
                  <FormControl variant="standard">
                      <InputLabel id="lotacao">Lotação</InputLabel>
                      <Select
                        labelId="lotacao"
                        id="lotacao"
                        value={values.lotacao}
                        onChange={handleChangeVal('lotacao')}
                        sx={{width:'140px'}}
                      >
                        {batalhoes.map((item,index)=><MenuItem key={item.id}  value={item.name}>{item.name}</MenuItem>
                        )}
                      </Select>
                  </FormControl>
                </div>
                <div className="flex flex-col w-5/6 text-white">
                  <FormControl variant="standard">
                      <InputLabel id="modelo">Modelo</InputLabel>
                      <Select
                        labelId="modelo"
                        id="modelo"
                        value={values.modelo}
                        onChange={handleChangeVal('modelo')}
                        sx={{width:'140px'}}
                      >
                        <MenuItem value="Antigo">Antigo</MenuItem>
                        <MenuItem value="Novo">Novo</MenuItem>
                      </Select>
                  </FormControl>
                </div>
                <div className="flex flex-col w-5/6 text-white">
                  <FormControl variant="standard">
                      <InputLabel id="pa">P.A</InputLabel>
                      <Select
                        labelId="pa"
                        id="pa"
                        value={values.pa}
                        onChange={handleChangeVal('pa')}
                        sx={{width:'140px'}}
                      >
                        <MenuItem value="1">1</MenuItem>
                        <MenuItem value="2">2</MenuItem>
                      </Select>
                  </FormControl>
                </div>
                <div className="flex  w-5/6 text-white justify-between">
                  <div className="flex flex-col">
                      <LocalizationProvider       
                          dateAdapter={AdapterDayjs}
                          adapterLocale={locale}
                          >
                            <DatePicker
                            	disablePast
                              shouldDisableDate={isWeekend}
                              inputFormat="DD/MM/YYYY"
                              label="Escolha a Data"
                              value={newData}
                              onChange={(newValue) => {
                                setNewData(newValue);    
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
                  </div>
                  <div className="flex flex-col">
                      <FormControl variant="standard">
                          <InputLabel id="horario">Horario</InputLabel>
                          <Select
                            labelId="horario"
                            id="horario"
                            value={values.horario}
                            onChange={handleChangeVal('horario')}
                            sx={{width:'140px'}}
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
                
                </div>
              
            </div>
            <div className="flex pb-5">

                {newData === null? 
                <Button disabled sx={{width:'150px'}}>Agendar</Button>           
                :
                <Button color="success" type="submit" sx={{width:'150px'}} onClick={enviarAgend} variant="outlined">Agendar</Button>                
                }
            </div>
        </div>
      </div>
  )
}

export default Agendamento;
