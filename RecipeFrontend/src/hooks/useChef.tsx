import { useContext } from "react"
import {ChefContext} from "../state/ChefState"
const useChef = () => {
  const context=useContext(ChefContext)
  if(!context){
    throw new Error("ChefContext not found")
  }
  return context;
}

export default useChef