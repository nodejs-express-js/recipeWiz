import { useState } from "react";
import { Recipe } from "../components/ProfileCreatAPost";
import useChef from "./useChef";
const useCreateARecipe = () => {
  const [error,setError]=useState("");
  const [loading,setIsLoading]=useState(false)
  const {state}=useChef();
  const createARecipe=async(recipe: Recipe)=>{
    try{
      setError("")
      setIsLoading(true)
      const multipartFormData = new FormData();
      multipartFormData.append('title',recipe.title);
      multipartFormData.append('ingredients', recipe.ingredients);
      multipartFormData.append('description',recipe.description );
      multipartFormData.append('instructions', recipe.instructions);
      if(recipe.image){
        multipartFormData.append('postimage', recipe.image);
      }
     
      const response=await fetch(import.meta.env.VITE_URL+"protected/createpost",{
        method:"POST",
        headers:{
            authorization: `Bearer ${state.token}`,
        },        
        body:multipartFormData,
      })
      const postcreation=await response.json();

      setIsLoading(false)
      if(postcreation.message){
        setError(postcreation.message)
        return null;
      }
      else{
        return postcreation;
      }
      }
      catch{
        setIsLoading(false)
        setError("An error occurred while creating the recipe")
        return null;
      }
      
    }
  return {error,loading,createARecipe}
}

export default useCreateARecipe;