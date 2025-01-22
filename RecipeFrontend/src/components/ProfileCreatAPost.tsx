import { useState } from "react";
import Styles from './ProfileCreatePost.module.css'
import useCreateARecipe from "../hooks/useCreateARecipe";
import image from '../../public/fake-recipe.jpg'
export type Recipe = {
title: string;
description: string;
ingredients: string;
instructions: string;
image: File|null|string;
};


const ProfileCreatAPost = () => {
    const {error,loading,createARecipe}=useCreateARecipe();
    const [post,setPostInfo]=useState<Recipe>(
        {
            title: 'cookie',
            description: 'what kind of cookie',
            ingredients: 'ingredients of cookie',
            instructions: 'instructions of cookie',
            image: image,
        }
    );
    const [previewImage,setPreviewImage] = useState<string>(image)
    const handleFileUpload=(e:React.ChangeEvent<HTMLInputElement>)=>{
        if(e.target.files && e.target.files.length){
            setPostInfo({...post,image:e.target.files[0]})
            setPreviewImage(URL.createObjectURL(e.target.files[0]))
        }
        else{
            setPreviewImage(image)
        }
    }
    const createAPost=async(e:React.FormEvent<HTMLFormElement> )=>{
        e.preventDefault();
        console.log(post)
        if(post.title && post.description && post.ingredients && post.instructions){
          
            await createARecipe(post)
            if(error===""){
             setPostInfo( {
                title: 'cookie',
                description: 'what kind of cookie',
                ingredients: 'ingredients of cookie',
                instructions: 'instructions of cookie',
                image: image,
            })
            setPreviewImage(image)
            }
        }
        else{
            alert("Please fill all the fields")
        }
    }
  return (
    <div className={Styles.mainContainer}>
        <form onSubmit={(e)=>{createAPost(e)}}>
            <div>
                <label >title</label>
                <input type="text" name="title" placeholder="title" value={post.title} onChange={(e)=>{setPostInfo({...post,title:e.target.value})}}></input>
            </div>
            <div>
                <label >description</label>
                <input type="text" name="description" placeholder="description" value={post.description} onChange={(e)=>{setPostInfo({...post,description:e.target.value})}}></input>
            </div>
            <div>
                <label >ingredients</label>
                <input type="text" name="ingredients" placeholder="ingredients" value={post.ingredients} onChange={(e)=>{setPostInfo({...post,ingredients:e.target.value})}}></input>
            </div>
            <div>
                <label >instructions</label>
                <input type="text" name="instructions" placeholder="instructions" value={post.instructions} onChange={(e)=>{setPostInfo({...post,instructions:e.target.value})}}></input>
            </div>

            <div>
                <label >Image</label>
                <input type="file" name="image" accept="image/*" onChange={(e)=>{handleFileUpload(e)}}></input>
            </div>
            {error && <div>{error}</div>}
            <div>
                <button type="submit" disabled={loading}>Create Post</button>
            </div>
        
        </form>   
        <div>
        <h1 >Preview</h1>
        <div className={Styles.onePost}>
            <h2>{post.title}</h2>
            <img src={previewImage} alt={`${post.title} image`} className={Styles.postImage}/>
            <p>{post.description}</p>
            <p>{post.ingredients}</p>
            <p>{post.instructions}</p>
        </div>
        </div>


    </div>
  )
}

export default ProfileCreatAPost