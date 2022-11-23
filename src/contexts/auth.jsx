import React, {createContext, useEffect} from "react";
import {useNavigate} from "react-router-dom"
import Axios from "axios"
export const AuthContext = createContext();

export const AuthProvider = ({children})=>{
    const navigate = useNavigate();
    const [user, setUser] = React.useState(null); 
    const [loading, setLoading] = React.useState(true);

    useEffect(()=>{
        const recoveredUser = localStorage.getItem('user');
        
        if (recoveredUser){
            setUser(JSON.parse(recoveredUser))
        }
        setLoading(false)
    }, []);
    
    const login =(usuario, password)=>{
        Axios.post("http://localhost:3001/realizarlogin", {
            usuario, password
        }).then((res)=>{
            localStorage.setItem("user", JSON.stringify(res.data.user))
            localStorage.setItem("token", JSON.stringify(res.data.token))
            localStorage.setItem("auth", JSON.stringify(res.data.auth))

            if (res.status == 200){
             window.location.replace('/')
            }                   
        }).catch((err)=>{
            console.log(err.response.data)
        })
        
        
      
    }
    const logout=()=>{
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('auth');
        setUser(null);
        navigate('/login')
    }

    return (
        <AuthContext.Provider 
        value={{authenticated: !!user, user, loading, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}