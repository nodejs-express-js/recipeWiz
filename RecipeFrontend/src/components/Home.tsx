import { useEffect, useRef, useState } from 'react';
import useGetRecipe from '../hooks/useGetRecipe';
import Navbar from './Navbar'
import Styles from './Home.module.css'
type Recipe = {
    id: number;
    title: string;
    description: string;
    ingredients: string;
    instructions: string;
    image: string;
    createdAt: string;
    updatedAt: string;
    chefId: number;
    chef: {
      id: number;
      firstName: string;
      lastName: string;
      profilepic: string;
    };
  };
  
const Home = () => {
    const  {error,loading,getFewPosts}=useGetRecipe();
    const [posts,setPosts]=useState<Recipe[]>([]);
    const [curr,setCurr]=useState(2)

    const handlescroll=async(e)=>{
        console.log(e)
        const scrollTop = window.scrollY; 
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        if (scrollTop + windowHeight >= documentHeight) {
            const latestposts=await getFewPosts(curr,curr+1)

            setCurr((curr)=>{
                console.log(2,curr)

                return curr+2
            });
            setPosts((posts)=>{
                console.log(posts)
             return   [...posts,...latestposts]
            });    
        }
    }
    useEffect(()=>{ 
        const temp=async()=>{
            const firstfewposts=await getFewPosts(0,1)
            setPosts(firstfewposts);
        }
        temp()
        // window.addEventListener("scrollend",handlescroll)
        // return ()=>{
        //     window.removeEventListener("scrollend",()=>{})
        // }
    },[])

  return (
    <div>
        <Navbar></Navbar>
        {
        loading ? 
        <div>Loading...</div>
        :
        <div onScroll={(e)=>{handlescroll(e)}}>
            {error? <div>Error: {error}</div>:
            posts.map(post=>(
                <div key={post.id} className={Styles.onePost}  >
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
                </div>
            ))}
        </div>
        }

    </div>
  )
}

export default Home