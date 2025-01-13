import { useState } from "react"
import useChef from "./useChef"
type Recipe = {
    id: number;
    title: string;
    description: string;
    ingredients: string;
    instructions: string;
    image: string;
    createdAt: string; // ISO 8601 format
    updatedAt: string; // ISO 8601 format
    chefId: number;
};
const useGetRecipe = () => {
  const [error,setError]=useState("")
  const [loading,setIsLoading] = useState(true)
  const {state}=useChef();

  const getFewPosts=async():Promise<Recipe[]>=>{  
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
            console.log(posts)
            if(response.ok){
                setIsLoading(false)
                return posts;
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
    return [];
  }
  return {error,loading,getFewPosts}
}

export default useGetRecipe