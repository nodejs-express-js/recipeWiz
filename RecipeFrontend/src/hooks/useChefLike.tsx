import { useState } from "react"
import useChef from "./useChef";

const useChefLike = () => {
    const [error,setError]=useState("");
    const [loading,setIsLoading]=useState(false)
    const {state}=useChef()
    const likePost=async(id:number)=>{
        setIsLoading(true)
        setError("")
        try{
            const response=await fetch(import.meta.env.VITE_URL+"protected/likepost",{
                method:"POST",
                headers:{
                    'Content-Type':'application/json',
                    'Authorization': `Bearer ${state.token}`
                },
                body:JSON.stringify({id:id})
            })
            const data=await response.json();
            setIsLoading(false)
            if(!response.ok){
                setError(data.message)
                return false;
            }
            return true;
        }
        catch{
            setError("An error occurred while liking the post")
            setIsLoading(false)
            return true;
        }
    }

    const unLikePost=async(id:number)=>{
        setIsLoading(true)
        setError("")
        try{
            const response=await fetch(import.meta.env.VITE_URL+"protected/unlikepost",{
                method:"POST",
                headers:{
                    'Content-Type':'application/json',
                    'Authorization': `Bearer ${state.token}`
                },
                body:JSON.stringify({id:id})
            })
            const data=await response.json();
            setIsLoading(false)
            if(!response.ok){
                setError(data.message)
                return false;
            }
            return true;
        }
        catch{
            setError("An error occurred while liking the post")
            setIsLoading(false)
            return true;
        }
    }
    return {error,loading,likePost, unLikePost}
}

export default useChefLike