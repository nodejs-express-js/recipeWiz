import { useReducer } from "react"

type chefStateType={
    email:string,
    token:string
}
type actionType={
    type: string,
    payload: string 
}
const chefState={
    email: '',token: ''
}
const chefReducer=(state:chefStateType,action:actionType)=>{
    switch(action.type){
        case 'SET_EMAIL':
            return {...state, email: action.payload}
        case 'SET_TOKEN':
            return {...state, token: action.payload}
        default:
            return state
    }
}


const ChefState = () => {

    const [state,dispatch]=useReducer(chefReducer,chefState)
    

}

export default ChefState