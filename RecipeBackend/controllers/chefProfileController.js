
const getAllPosts=async(req,res)=>{
    try{
        const {num1,num2}=req.body;
        console.log(num1,num2);

    }
    catch(err){
        res.status(500).json({message:"something went wrong with server"})
    }
}

const createAPost = async(req,res)=>{
    try{


    }
    catch(err){
        res.status(500).json({message:"something went wrong with server"})
    }
}

const updateAPost = async(req,res)=>{
    try{


    }
    catch(err){
        res.status(500).json({message:"something went wrong with server"})
    }
}

const deleteAPost = async(req,res)=>{
    try{


    }
    catch(err){
        res.status(500).json({message:"something went wrong with server"})
    }
}
module.exports={getAllPosts,createAPost,deleteAPost,updateAPost}