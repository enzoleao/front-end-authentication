import {iconUser} from "../icons"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {useState} from "react"
import Brasao from '../../public/brasao_pmpa.png'
export default function Login(){
    const [values, setValues] = useState({
        usuario:'',
        password:''
    });
    const handleChangeVal = (prop) => (event) => {
      setValues({ ...values, [prop]: event.target.value });
        
    };
    return (
        <div className='h-screen min-h-full w-screen md:w-full flex flex-col py-20 items-center'>
        <img src={Brasao} className="" style={{width:'100px'}}></img>
        <div className="flex flex-col justify-center space-y-36 w-[30rem] h-[38rem] rounded-md shadow shadow-2xl ">
            <div className="w-full flex justify-center mt-10">{iconUser}</div>
            <div className="w-full flex flex-col h-[20rem] space-y-7">

                <div className="w-full flex justify-center">   
                    <TextField 
                        id="usuario" 
                        label="Usuário" 
                        variant="standard" 
                        onChange={handleChangeVal('usuario')}
                    />
                </div>
                <div className="w-full flex justify-center">   
                    <TextField 
                        id="standard-basic" 
                        label="Senha" 
                        variant="standard" 
                        type="password"
                        onChange={handleChangeVal('password')}
                    />
                </div>
                <div className="w-full flex justify-center pt-10">   
                <Button onClick={()=>console.log(values)}variant="outlined">Login</Button>
                </div>
            </div>
    
        </div>
    </div>
    )
}