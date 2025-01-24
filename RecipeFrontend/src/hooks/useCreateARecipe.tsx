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
      console.log(recipe)
      const multipartFormData = new FormData();
      multipartFormData.append('title',recipe.title);
      multipartFormData.append('ingredients', recipe.ingredients);
      multipartFormData.append('description',recipe.description );
      multipartFormData.append('instructions', recipe.instructions);
      console.log("===================1")
      if(recipe.image){
        console.log("===================2")

        multipartFormData.append('postimage', recipe.image);
      }
      console.log("===================3")
      console.log(state.token)
      console.log(import.meta.env.VITE_URL)
      const response=await fetch(import.meta.env.VITE_URL+"protected/createpost",{
        method:"POST",
        headers:{
            authorization: `Bearer ${state.token}`,
        },        
        body:multipartFormData,
      })
      console.log("===================4")

      const postcreation=await response.json();
      console.log("===================5")

      setIsLoading(false)
      if(postcreation.message){
        console.log("===================6")

        setError(postcreation.message)
        return null;
      }
      else{
        console.log("===================7")

        return postcreation;
      }
      }
      catch{
        console.log("===================8")

        setIsLoading(false)
        console.log("===================9")

        setError("An error occurred while creating the recipe")
        return null;
      }
      
    }
  return {error,loading,createARecipe}
}

export default useCreateARecipe;