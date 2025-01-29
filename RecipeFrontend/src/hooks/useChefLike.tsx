import { useState } from "react"

const useChefLike = () => {
    const [error,setError]=useState("");
    const [loading,setIsLoading]=useState(false)
    const likePost=async(id:number)=>{

    }
    const unLikePost=async(id:number)=>{
    
    }
    return {error,loading,likePost, unLikePost}
}

export default useChefLike