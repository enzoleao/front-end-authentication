
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React, {useState, useContext} from "react"
import { AuthContext } from "../../contexts/auth";

export default function Login(){
    const {authenticated, login} = useContext(AuthContext);
    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");
    
    const handleSubmit = (e)=>{
        e.preventDefault();
        login(usuario,password)   
    }
    return (
        <div className='h-screen min-h-full w-screen md:w-full flex flex-col py-20 items-center'>
        <div className="flex flex-col justify-center space-y-36 w-[30rem] h-[38rem] rounded-md shadow shadow-2xl ">
            <div className="w-full flex justify-center mt-10"></div>
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
                <div className="w-full flex justify-center">   
                    <TextField 
                        id="standard-basic" 
                        label="Senha"
                        value={password}
                        variant="standard" 
                        type="password"
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                </div>
                <div className="w-full flex justify-center pt-10">   
                <Button onClick={handleSubmit} variant="outlined">Login</Button>
                </div>
            </div>
    
        </div>
    </div>
    )
}