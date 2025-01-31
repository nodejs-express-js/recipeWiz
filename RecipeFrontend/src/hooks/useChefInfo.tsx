import { useContext } from "react"
import { ChefInfoContext } from "../state/ChefInfoState"



const useChefInfo = () => {
  const chefValues=useContext(ChefInfoContext)
  if(!chefValues){
    throw new Error("ChefInfoContext not found")
  }
  return chefValues;
}

export default useChefInfo