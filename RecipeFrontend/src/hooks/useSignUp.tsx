import { useState } from "react"
import { useNavigate } from "react-router-dom";
import useChef from "./useChef";

const useSignUp = () => {
    const [loading,setIsLoading]=useState(false);
    const [error,setError]=useState('');
    const navigate=useNavigate();
    const {dispatch}=useChef();
    const sendSignUpInfoToServer = async(firstName: string,lastName: string,email: string,password: string, profilepic: File ) =>{
        try{
            setIsLoading(true);
            setError('');
            const multipartFormData = new FormData();
            multipartFormData.append('firstName',firstName);
            multipartFormData.append('lastName',lastName);
            multipartFormData.append('email',email);
            multipartFormData.append('password',password);
            multipartFormData.append('profilepic',profilepic);
            
            const response=await fetch(import.meta.env.VITE_URL+"signup",{
                method:"POST",
                
                body:multipartFormData
            }
            )
            const data=await response.json();

            if(data.message){
                setError(data.message)
            }
            else{
                dispatch({type:"LOGIN",payload:data})
                navigate('/login')
            }
        }
        catch{
            setError("Something went wrong with server")
        }
        setIsLoading(false);
    }
    return {loading,error,sendSignUpInfoToServer}
}

export default useSignUp