import { createContext, ReactNode, useEffect, useReducer } from "react"


type childrenType={
    children:ReactNode;
}
type creatContextType={
    state:chefStateType,
    dispatch:React.Dispatch<actionType>
}
export type chefStateType={
    email:string,
    token:string
}
type actionType={
    type: string,
    payload: chefStateType 
}
const chefState={
    email: '',token: ''
}





const chefReducer=(state:chefStateType,action:actionType)=>{
    switch(action.type){
        case 'LOGIN':
            localStorage.setItem('chef', JSON.stringify(action.payload));
            return action.payload
        case 'LOGOUT':
            return { email: '', token: ''}
        default:
            return state
    }
}
export const ChefContext=createContext<null|creatContextType>(null);

const ChefState = ({children}:childrenType) => {
    
    const [state,dispatch]=useReducer(chefReducer,chefState)
    useEffect(()=>{
        const chef=localStorage.getItem('chef');
        if(chef){
            dispatch({type:'LOGIN',payload:JSON.parse(chef)})
        }
    },[])
    return <ChefContext.Provider value={{state,dispatch}}>
        {children}
    </ChefContext.Provider>
}

export default ChefState