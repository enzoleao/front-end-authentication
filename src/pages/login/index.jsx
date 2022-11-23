
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React, {useState, useContext} from "react"
import { AuthContext } from "../../contexts/auth";
import Axios from 'axios';
export default function Login(){
    const {authenticated, login} = useContext(AuthContext);
    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");
    const [cadastro, setCadastro] = useState(1); 
    
    const [cadastroValues, setCadastroValues] = useState({
        usuarios:'',
        password:'',
        password2:'',
    });
    const handleChangeVal = (prop) => (event) => {
        setCadastroValues({ ...cadastroValues, [prop]: event.target.value });
      };
    const handleSubmit = (e)=>{
        e.preventDefault();
        login(usuario,password)   
    }
    const handleCadastro = () =>{
        console.log('cadastrar')
        
    }
    return (
        <div className='h-screen min-h-full w-screen md:w-full flex flex-col py-20 items-center'>
        <div className="flex flex-col justify-center space-y-36 w-[30rem] h-[38rem] rounded-md shadow shadow-2xl ">
            <div className="w-full flex justify-center mt-10"></div>
            {cadastro === 1 ? 
            <div className="w-full flex flex-col h-[20rem] space-y-7">
                <div className="w-full flex justify-center">   
                    <TextField 
                        id="usuario" 
                        label="Usuário"
                        value={usuario}
                        variant="standard" 
                        onChange={(e)=>setUsuario(e.target.value)}
                    />
                </div>
                <div className="w-full flex  justify-center">   
                    <TextField 
                        id="standard-basic" 
                        label="Senha"
                        value={password}
                        variant="standard" 
                        type="password"
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                    
                </div>
                <div className='flex justify-center'>
                    <h6>Não possui conta? <button className='hover:text-blue-300 hover:underline' onClick={()=>setCadastro(2)}>Clique Aqui!</button></h6>
                </div>
                <div className="w-full flex justify-center pt-10">   
                <Button onClick={handleSubmit} variant="outlined">Login</Button>
                </div>
            </div>
            :
            <div className="w-full flex flex-col h-[20rem] space-y-7">
                <div className="w-full flex justify-center">   
                    <TextField 
                        id="usuario" 
                        label="Usuário"
                        value={cadastroValues.usuarios}
                        variant="standard" 
                        onChange={handleChangeVal('usuarios')}
                    />
                </div>
                <div className="w-full flex justify-center">   
                    <TextField 
                        id="standard-basic" 
                        label="Senha"
                        value={cadastroValues.password}
                        variant="standard" 
                        type="password"
                        onChange={handleChangeVal('password')}
                    />    
                </div>
                <div className="w-full flex justify-center">   
                    <TextField 
                        id="standard-basic" 
                        label="Confirmar senha"
                        value={cadastroValues.password2}
                        variant="standard" 
                        type="password"
                        onChange={handleChangeVal('password2')}
                    />
                </div>
                <div className='flex justify-center'>
                    <h6 >Já possui conta? <button className="hover:text-blue-300 pointer hover:underline" onClick={()=>setCadastro(1)}>Realize login.</button></h6>
                </div>             
                <div className="w-full flex justify-center pt-2">   
                    <Button onClick={handleCadastro} color="success" variant="outlined">Cadastrar</Button>
                </div>
            </div>
        }

        </div>
    </div>
    )
}