import { useState } from "react"
import useChef from "./useChef";

const useGetProfileUserRecipes = () => {
    const [error,setError]=useState("");
    const [loading,setIsLoading]=useState(false)
    const {state}=useChef();
    const fetchProfileUserRecipes=async(num1:number,num2:number)=>{
        try{
            setError("")
            setIsLoading(true)
            if(state.token===""){
                return ;
            }
            const response=await fetch(import.meta.env.VITE_URL+"protected/getpostinfo",{
                method:"POST",
                headers:{
                    'Authorization': `Bearer ${state.token}`,
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({num1,num2})
            })
            const data=await response.json();
            setIsLoading(false)

            if(response.ok){

                return data;
            }
            else{
                setError(data.message)

                return [];
            }
        }
        catch{
            setError("something went wrong with request to server")
            setIsLoading(false)

            return [];
        }
    }
    return {error,loading,fetchProfileUserRecipes}
}

export default useGetProfileUserRecipes