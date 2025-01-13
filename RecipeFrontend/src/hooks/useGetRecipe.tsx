import { useState } from "react"
import useChef from "./useChef"

const useGetRecipe = () => {
  const [error,setError]=useState("")
  const [loading,setIsLoading] = useState(true)
  const {state}=useChef();

  const getFewPosts=async()=>{  
    setError("")
    setIsLoading(true)
    try{
        if(state.token){
            const response=await fetch(import.meta.env.VITE_URL+"protected/recipe",{
                method:"GET",
                headers:{
                    Authorization: `Bearer ${state.token}`
                }
            })
            const posts=await response.json();
            if(response.ok){
                console.log(posts)
            }
            else{
                setError(posts.message)
            }
        }
        else{
            setError("please login")
            
        }
    }
    catch{
        setError("Failed to fetch data")
    }
    setIsLoading(false)
  }
  return {error,loading,getFewPosts}
}

export default useGetRecipe