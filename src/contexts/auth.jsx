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
            console.log(res)
            localStorage.setItem("user", JSON.stringify(res.data))
            if (res.status == 200){
                window.location.replace('/dashboard')
            }                   
        }).catch((err)=>{
            alert(err.response.data)
        })
        
        
      
    }
    const logout=()=>{
      console.log('logout');
      localStorage.removeItem('user');
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