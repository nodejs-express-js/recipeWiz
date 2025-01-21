import {   useEffect, useRef, useState } from 'react';
import useGetRecipe from '../hooks/useGetRecipe';
import Navbar from './Navbar'
import Styles from './Home.module.css'
export type Recipe = {
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
    const currscroll=useRef(0);
    const  {error,loading,getFewPosts}=useGetRecipe();
    const [hasmore,setHasMore]=useState(true);
    const [posts,setPosts]=useState<Recipe[]>([]);
    const [curr,setCurr]=useState(5)
    const targetRef=useRef<HTMLDivElement>(null);

  
    useEffect(()=>{
        const setInitialPosts=async()=>{
            const firstfewposts=await getFewPosts(0,4)
            setPosts(firstfewposts);
        }
        setInitialPosts();  
        
    },[])
    useEffect(()=>{
        const initalObserver=new IntersectionObserver(async([entries])=>{
            if (entries.isIntersecting ) {
                currscroll.current=window.scrollY
                const nextposts=await getFewPosts(curr,curr+4);
                if(nextposts.length===0){
                    setHasMore(false)
                    return;
                }
                setCurr(curr=>curr+5);                                   
                setPosts(prevPosts=>prevPosts.concat(nextposts))
            }
        },{
            rootMargin: "0px 0px 200px 0px"
        })
        window.scrollTo(0,currscroll.current)
        if(targetRef.current && hasmore){
            initalObserver.observe(targetRef.current)
        }
        return () => {
            if (targetRef.current) {
                initalObserver.unobserve(targetRef.current);
            }
        }
    },[posts])
    useEffect(()=>{
        window.scrollTo(0,currscroll.current)
    },[hasmore])

    const showPosts=()=>{
        return (
            posts.map((post,i)=>
                {
                    if(i===posts.length-1){
                        return (<div key={i} className={Styles.onePost}  ref={targetRef}>
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
                    return (<div key={i} className={Styles.onePost}  >
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
                
            )
        )
    }

    
   

  return (
    <div>
        <Navbar></Navbar>
        {
        loading ? 
        <div>Loading...</div>
        :
        <div >
            {error? <div>Error: {error}</div>: <div >
                {showPosts()}
                <div>{hasmore ?  <></> : <div>No more posts to be found</div>}</div> 
                </div>}
        </div>
        
        }

    </div>
  )
}

export default Home