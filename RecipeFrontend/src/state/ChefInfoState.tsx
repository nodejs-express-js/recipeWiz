import { createContext, useEffect, useReducer } from "react"
import useChef from "../hooks/useChef";


type UserProfile= {
    id: number;
    firstName: string;
    lastName: string;
    profilepic: string;
    error?:string
}
type actionType={
    type: string;
    payload: UserProfile;
}
type childrenType={
    children: React.ReactNode;
}
type chefContextType={
    state: UserProfile;
    dispatch: React.Dispatch<actionType>;
}
const chefInfoReducer=(state:UserProfile,action:actionType)=>{

    switch(action.type){
        case 'SET_CHEF_INFO':
            return action.payload;
        default:
            return state;
    }
}


export const ChefInfoContext=createContext<chefContextType|null>(null);

const ChefInfoState = ({children}:childrenType) => {
    const [state,dispatch]=useReducer(chefInfoReducer,{id: 0,firstName: '',lastName: '',profilepic: ''})
    const {state:useChefState}=useChef();
    useEffect(()=>{
        if(useChefState.email!=='' && useChefState.token!==''){
            chefInfo(useChefState.token,dispatch)
        }
    },[useChefState])
return(
    <ChefInfoContext.Provider value={{state,dispatch}}>
        {children}
    </ChefInfoContext.Provider>
 
)
}
const chefInfo=async(token:string,dispatch:React.Dispatch<actionType>)=>{
    try{
        const response=await fetch(import.meta.env.VITE_URL+"protected/chefInfo",{
            method:"POST",
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        const data=await response.json();
        if(response.ok){
            dispatch({type:'SET_CHEF_INFO',payload:data})
        }
    }
    catch{
        dispatch({type:'SET_CHEF_INFO',payload:{id: 0,firstName: '',lastName: '',profilepic: '',error:'please login'}})
    }
}
export default ChefInfoState