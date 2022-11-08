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
import Button from '@mui/material/Button';

const locales = ['pt-br']
function Agendamento() {
  const [locale, setLocale] = React.useState('pt-br');
  const [erro, setErro] = React.useState(null)
  const [erroNome, setErroNome] = React.useState(null)
  const isWeekend = (date) => {
    const day = date.day();
    
    return day === 0 || day === 6;
  };
  function disablePrevDates() {
    return date.getDay() === 0;
  }
  const [newValue, setNewValue] = React.useState(null);
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
      const value = `${value.$D}/${value.$M}/${value.$y}`
      Axios.post("https://191.101.78.120:3000/agend", {
        values,
        value
      }).then((res)=>{
        alert("AGENDADO COM SUCESSO")
        window.location.replace('/')
        setErro(2)
      }).catch((err)=>{
        alert(err.response.data.message)
        setErroNome(err.response.data.message)
        setErro(1)
      })
  }

  const handleChangeVal = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  

  return (
      <div className='h-screen min-h-full w-screen md:w-full flex flex-col  justify-between items-center'>
        <img src={Brasao} style={{width:'100px'}}></img>
        <div className="flex flex-col w-screen  md:w-[55rem] h-[44rem] space-y-4 mb-20 items-center  rounded-md shadow-2xl min-h-[42rem]">
          
            <div className="flex flex-col flex-grow w-full items-center space-y-5 ">
                
                <div>
                  { erro == 1? 
                    <div className="flex items-center bg-red-200 shadow shadow-xl w-50 h-10 px-2 px-2 rounded-md mt-2">
                        <p className="text-wh">{erroNome} !</p>
                    </div>
                    :<div></div>          
                }
                {
                  erro == 2 ? 
                  <div className="flex bg-green-200 w-50 h-10 px-2 rounded-md mt-2 items-center">
                     <p className="text-wh">Agendados com sucesso !</p>
                  </div>:
                  <div></div> 
                }
                </div>

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
                    type="text"
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
                              value={value}
                              onChange={(newValue) => {
                                setNewValue(newValue);    
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
                <Button color="success" type="submit" sx={{width:'150px'}} onClick={enviarAgend} variant="outlined">Agendar</Button>
            </div>
        </div>
      </div>
  )
}

export default Agendamento;
