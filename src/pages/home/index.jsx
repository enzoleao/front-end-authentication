import {useContext, useEffect, useState} from "react"
import { AuthContext } from "../../contexts/auth"
import Axios from "axios"
export default function Home(){
    const {logout} = useContext(AuthContext);
    const [clientes, setClientes] = useState();
    const [token, setToken] = useState();
    const handleLogout = ()=>{
        logout();
      }

    useEffect(()=>{
        const recoveredUser = localStorage.getItem('token');
        const recovered = JSON.parse(recoveredUser)
        Axios.get('http://localhost:3001/clientes', {
            headers:{
                'x-access-token':recovered
            }
        }).then((res)=>{
            
        }).catch((err)=>{
            localStorage.removeItem("user")
            localStorage.removeItem("token")
            localStorage.removeItem("auth")
        })
    },[])

    return (
        <button onClick={handleLogout}>Sair</button>
    )
}