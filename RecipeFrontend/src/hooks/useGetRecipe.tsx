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
    catch(err){
        console.log(err)
        setError("Failed to fetch data")
    }
    setIsLoading(false)
    return [];
  }
  return {error,loading,getFewPosts}
}

export default useGetRecipe