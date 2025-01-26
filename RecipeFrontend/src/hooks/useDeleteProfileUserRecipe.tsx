import  { useState } from 'react'
import useChef from './useChef';

const useDeleteProfileUserRecipe = () => {
  const [error,setError]=useState("");
  const [loading,setIsLoading]=useState(false);
  const {state}=useChef();
  const deleteProfileUserRecipe=async(recipeId:number)=>{
    try{
      setError("")
      setIsLoading(true)
      if(state.token===""){
        throw new Error("No token found")
      }
      const response=await fetch(import.meta.env.VITE_URL+`protected/deletepost/${recipeId}`,{
        method:"DELETE",
        headers:{
          'Authorization': `Bearer ${state.token}`,
          'Content-Type':'application/json'
        },
      })
      if(!response.ok){
        throw new Error(await response.text())
      }
        setIsLoading(false)
        return true;
    }
    catch{
      setError("server went wrong with server")
      setIsLoading(false)
      return false;
    }
    }
    return {error,loading,deleteProfileUserRecipe}
}

export default useDeleteProfileUserRecipe