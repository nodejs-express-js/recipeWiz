import { useEffect, useRef, useState } from "react";
import useGetProfileUserRecipes from "../hooks/useGetProfileUserRecipes";
import Navbar from "./Navbar"
import Styles from './Profile.module.css'
import { Recipe } from "./Home";
import ProfileCreatAPost from "./ProfileCreatAPost";
const Profile = () => {
    const {error,loading,fetchProfileUserRecipes}=useGetProfileUserRecipes()
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
                                <p>{post.description}</p>
                                <p>{post.ingredients}</p>
                                <p>{post.instructions}</p>
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
                                <p>{post.description}</p>
                                <p>{post.ingredients}</p>
                                <p>{post.instructions}</p>
                    </div>)
                }     
        })}
            {posts.length===0 && <div>No recipes yet</div>}
        </div>)
    
    }
    return ( <div>
        <Navbar></Navbar>
        <div>
            <h1>Profile</h1>
            <p>Welcome to your Edit profile</p>
            <div className={Styles.Top}>
                    <ProfileCreatAPost addAPost={addAPost}></ProfileCreatAPost>
            </div>
            <div className={Styles.bottom}>
                <div>{showPosts()}</div>
                {loading && <div>Loading...</div>}

                <div>{error}</div>
            </div>
        </div>
    </div>
    )
    
}

export default Profile