import { useState } from "react";
import useChef from "./useChef";
import { useNavigate } from "react-router-dom";
const useLogin = () => {
  const [loading,setIsLoading]=useState(false);
  const [error,setError]=useState('');
  const navigate=useNavigate();
  const {dispatch}=useChef();
  const loginUser=async(email:string,password:string)=>{
    setIsLoading(true);
    setError('');
    try{
        const response=await fetch(import.meta.env.VITE_URL+"/login",{
            method:"POST",
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({email,password})
        })
        const data=await response.json();
        if(data.message){
            setError(data.message)
        }
        else{
            dispatch({type:"LOGIN",payload:data});
            navigate("/")
        }
    }
    catch{
        setError("Server error");
    }
    setIsLoading(false);
  }
  return {error,loading,loginUser};
}

export default useLogin