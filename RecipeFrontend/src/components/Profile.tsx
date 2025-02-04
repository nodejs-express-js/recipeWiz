import { useEffect, useRef, useState } from "react";
import useGetProfileUserRecipes from "../hooks/useGetProfileUserRecipes";
import Navbar from "./Navbar"
import Styles from './Profile.module.css'
import { Recipe } from "./Home";
import ProfileCreatAPost from "./ProfileCreatAPost";
import useDeleteProfileUserRecipe from "../hooks/useDeleteProfileUserRecipe";
import useChefLike from "../hooks/useChefLike";
import ChefInfo from "./ChefInfo";
import like from '../icons/like.png';
import unlike from '../icons/unlike.png';
import deleteicon from '../icons/delete.png';


const Profile = () => {
    const {error,loading,fetchProfileUserRecipes}=useGetProfileUserRecipes()
    const {error:deleteError,loading:deleteLoading,deleteProfileUserRecipe}=useDeleteProfileUserRecipe();
    const {loading:likeloading,likePost, unLikePost}=useChefLike();
    const likeOrUnLikePost=async(id:number,isLiked:boolean)=>{
        if(isLiked){
            const success=await unLikePost(id);
            if(success){
                setPosts(prevPosts=>prevPosts.map(post=>post.id===id?{...post,isLiked:false,likes:post.likes-1}:post))
            }
        }
        else{
            const success=await likePost(id);
            if(success){
                setPosts(prevPosts=>prevPosts.map(post=>post.id===id?{...post,isLiked:true,likes:post.likes+1}:post))
            }
        }
       }
    const [posts,setPosts]=useState<Recipe[]>([]);
    const [curr,setCurr]=useState(2);
    const targetRef=useRef<HTMLDivElement>(null);
    useEffect(()=>{
        const fetchposts=async()=>{
            const temp=await fetchProfileUserRecipes(0,1)
            setPosts(temp);
        }
        fetchposts()        
    },[])
    useEffect(()=>{
        const observer=new IntersectionObserver(async([element])=>{
            if(element.isIntersecting){
                const temp=await fetchProfileUserRecipes(curr,curr+1)
                if(temp.length===0){
                    return;
                }
                setCurr(curr=>curr+2)
                setPosts(prevPosts=>prevPosts.concat(temp))
            }
        },{
            threshold: 0.1
        })
        if(targetRef.current){
            observer.observe(targetRef.current)
        }
        return ()=>{
            observer.disconnect()
        } 
    },[posts])
     const addAPost=(post:Recipe)=>{
        setPosts(prevPosts=>prevPosts.concat(post))
     }
     const deleteThisPost=(post:Recipe)=>{
        deleteProfileUserRecipe(post.id)
        const updatedPosts=posts.filter(p=>p.id!==post.id)
        setPosts(updatedPosts)
     }
    const showPosts=()=>{
        return(<div>
            {posts.map((post,i)=>{  
                if(i===posts.length-1){
                    return(<div key={post.id} className={Styles.onePost} ref={targetRef}>
                        <div className={Styles.userInfo}>
                             
                            <img src={post.chef.profilepic} alt={`${post.chef.firstName} image`} className={Styles.profilepic}/>
                            <span className={Styles.name}>
                                <div>{post.chef.firstName}</div>
                                <div>{post.chef.lastName}</div>
                            </span>
                        </div>
                        <h2>{post.title}</h2>
                                <img src={post.image} alt={`${post.title} image`} className={Styles.postImage}/>
                                <div className={Styles.postDescription}>description: {post.description}</div>
                            <div className={Styles.postIngredients}>ingredients: {post.ingredients}</div>
                            <div className={Styles.postInstructions}>instructions: {post.instructions}</div>
                                <div>{deleteError}</div>
                                <div className={Styles.buttonContainer}>

                                <button onClick={()=>{likeOrUnLikePost(post.id,post.isLiked)}} disabled={likeloading} className={Styles.likeButton} >
                                    <span>{post.likes}</span><span>likes</span>{post.isLiked ? <img src={like} alt='like' className={Styles.likeicon}></img> : <img src={unlike} alt='unlike' className={Styles.likeicon}></img>}
                                </button>
                                <button onClick={()=>deleteThisPost(post)} disabled={deleteLoading}> <img src={deleteicon} alt='delete' className={Styles.deleteicon}></img> <span>delete  recipe</span></button>
                                </div>

                    </div>)
                }
                else{
                    return(<div key={post.id} className={Styles.onePost}>
                        <div className={Styles.userInfo}>
                             
                            <img src={post.chef.profilepic} alt={`${post.chef.firstName} image`} className={Styles.profilepic}/>
                            <span className={Styles.name}>
                                <div>{post.chef.firstName}</div>
                                <div>{post.chef.lastName}</div>
                            </span>
                        </div>
                        <h2>{post.title}</h2>
                                <img src={post.image} alt={`${post.title} image`} className={Styles.postImage}/>
                                <div className={Styles.postDescription}>description: {post.description}</div>
                                <div className={Styles.postIngredients}>ingredients: {post.ingredients}</div>
                                <div className={Styles.postInstructions}>instructions: {post.instructions}</div>
                                <div>{deleteError}</div>
                                <div className={Styles.buttonContainer}>

                                <button onClick={()=>{likeOrUnLikePost(post.id,post.isLiked)}} disabled={likeloading} className={Styles.likeButton} >
                                    <span>{post.likes}</span><span>likes</span>{post.isLiked ? <img src={like} alt='like' className={Styles.likeicon}></img> : <img src={unlike} alt='unlike' className={Styles.likeicon}></img>}
                                </button>
                                <button onClick={()=>deleteThisPost(post)} disabled={deleteLoading}> <img src={deleteicon} alt='delete' className={Styles.deleteicon}></img> <span>delete  recipe</span></button>
                                </div>
                    </div>)
                }     
        })}
            {posts.length===0 && <div>No recipes yet</div>}
        </div>)
    
    }
    return ( <div className={Styles.container}>
        <Navbar  />
        <div className={Styles.profileContainer}>
          <h1 className={Styles.profileTitle}>Profile</h1>
          <div className={Styles.profileDescription}>Welcome to your Edit profile</div>
          <div className={Styles.Top}>
            <ChefInfo />
            <ProfileCreatAPost addAPost={addAPost}  />
          </div>
          <div className={Styles.bottom}>
            <div className={Styles.postsContainer}>{showPosts()}</div>
            {loading && <div className={Styles.loadingMessage}>Loading...</div>}
            {error ? <div className={Styles.errorMessage}>{error}</div> : <></>}
          </div>
        </div>
      </div>
      
    )
    
}

export default Profile