import { useEffect, useState } from 'react';
import useGetRecipe from '../hooks/useGetRecipe';
import Navbar from './Navbar'

type Recipe = {
    id: number;
    title: string;
    description: string;
    ingredients: string;
    instructions: string;
    image: string;
    createdAt: string; // ISO 8601 format
    updatedAt: string; // ISO 8601 format
    chefId: number;
};

const Home = () => {
    const  {error,loading,getFewPosts}=useGetRecipe();
    const [posts,setPosts]=useState<Recipe[]>([{
        id:0,
        title:'',
        description:'',
        ingredients:'',
        instructions:'',
        image:'',
        createdAt:'',
        updatedAt:'',
        chefId:0,
  
    }]);
    useEffect(()=>{
        const temp=async()=>{
            const posts=await getFewPosts()
            setPosts(posts);
        }
        temp()
    },[])
  return (
    <div>
        <Navbar></Navbar>
        {
        loading ? 
        <div>Loading...</div>
        :
        <div>
            {error? <div>Error: {error}</div>:
            posts.map(post=>(
                <div key={post.id}>
                    <div>
                        
                    </div>
                    <h2>{post.title}</h2>
                    <img src={post.image} alt={post.title} />
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