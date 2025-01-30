import { useState } from "react"
import useChef from "./useChef"
type Recipe = {
    id: number;
    title: string;
    description: string;
    ingredients: string;
    instructions: string;
    image: string;
    createdAt: string;
    updatedAt: string;
    chefId: number;
    chef: {
      id: number;
      firstName: string;
      lastName: string;
      profilepic: string;
    };
    likes: number,
    isLiked:boolean
  };
  
const useGetRecipe = () => {
  const [error,setError]=useState("")
  const [loading,setIsLoading] = useState(true)
  const {state}=useChef();

  const getFewPosts=async(num1:number,num2:number):Promise<Recipe[]>=>{  
    setError("")
    setIsLoading(true)
    try{
        if(state.token){
            const response=await fetch(import.meta.env.VITE_URL+"protected/fetchrecipes",{
                method:"POST",
                headers:{
                    Authorization: `Bearer ${state.token}`,
                    'Content-Type': 'application/json', // Specify JSON format
                },       
                body: JSON.stringify({num1,num2})
            })
            const posts=await response.json();
            setIsLoading(false)
            if(response.ok){
                return posts;
            }
            else{
                setError(posts.message)
                return [];
            }
        }
        else{
            setError("please login")
            return [];
        }
    }
    catch{
        setIsLoading(false)

        setError("Failed to fetch data")
        return [];
    }
 
  }
  return {error,loading,getFewPosts}
}

export default useGetRecipe