import { useEffect, useRef, useState } from 'react';
import useGetRecipe from '../hooks/useGetRecipe';
import Navbar from './Navbar';
import Styles from './Home.module.css';
import useChefLike from '../hooks/useChefLike';
import ChefInfo from './ChefInfo';
import like from '../icons/like.png'
import unlike from '../icons/unlike.png'
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
    likes: number,
    isLiked: boolean
};

const Home = () => {
    const { error, loading, getFewPosts } = useGetRecipe();
    const { loading: likeLoading, likePost, unLikePost } = useChefLike();
    const [hasMore, setHasMore] = useState(true);
    const [posts, setPosts] = useState<Recipe[]>([]);
    const [curr, setCurr] = useState(5);
    const targetRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const setInitialPosts = async () => {
            const firstFewPosts = await getFewPosts(0, 4);
            setPosts(firstFewPosts);
        };
        setInitialPosts();
    }, []);

    useEffect(() => {
        const initialObserver = new IntersectionObserver(async ([entries]) => {
            if (entries.isIntersecting) {
                const nextPosts = await getFewPosts(curr, curr + 4);
                if (nextPosts.length === 0) {
                    setHasMore(false);
                    return;
                }
                setCurr(curr => curr + 5);
                setPosts(prevPosts => prevPosts.concat(nextPosts));
            }
        }, {
            threshold: 0.1
        });

        if (targetRef.current && hasMore) {
            initialObserver.observe(targetRef.current);
        }

        return () => {
            if (targetRef.current) {
                initialObserver.unobserve(targetRef.current);
            }
        };
    }, [posts]);

    const likeOrUnLikePost = async (id: number, isLiked: boolean) => {
        if (isLiked) {
            const success = await unLikePost(id);
            if (success) {
                setPosts(prevPosts => prevPosts.map(post => post.id === id ? { ...post, isLiked: false, likes: post.likes - 1 } : post));
            }
        } else {
            const success = await likePost(id);
            if (success) {
                setPosts(prevPosts => prevPosts.map(post => post.id === id ? { ...post, isLiked: true, likes: post.likes + 1 } : post));
            }
        }
    };

    const showPosts = () => {
        return (
            posts.map((post, i) => {
                if (i === posts.length - 1) {
                    return (
                        <div key={post.id} className={Styles.onePost} ref={targetRef}>
                            <div className={Styles.userInfo}>
                                <img src={post.chef.profilepic} alt={`${post.chef.firstName} image`} className={Styles.profilepic} />
                                <span className={Styles.name}>
                                    <div>{post.chef.firstName}</div>
                                    <div>{post.chef.lastName}</div>
                                </span>
                            </div>
                            <h2 className={Styles.postTitle}>{post.title}</h2>
                            <img src={post.image} alt={`${post.title} image`} className={Styles.postImage} />
                            <div className={Styles.postDescription}>description: {post.description}</div>
                            <div className={Styles.postIngredients}>ingredients: {post.ingredients}</div>
                            <div className={Styles.postInstructions}>instructions: {post.instructions}</div>
                            <button className={Styles.likeButton} onClick={() => { likeOrUnLikePost(post.id, post.isLiked) }} disabled={likeLoading}>
                                <span>{post.likes}</span><span>likes</span>{post.isLiked ? <img src={like} alt='like' className={Styles.likeicon}></img> : <img src={unlike} alt='unlike' className={Styles.likeicon}></img>}
                            </button>
                        </div>
                    );
                }
                return (
                    <div key={post.id} className={Styles.onePost}>
                        <div className={Styles.userInfo}>
                            <img src={post.chef.profilepic} alt={`${post.chef.firstName} image`} className={Styles.profilepic} />
                            <span className={Styles.name}>
                                <div>{post.chef.firstName}</div>
                                <div>{post.chef.lastName}</div>
                            </span>
                        </div>
                        <h2 className={Styles.postTitle}>{post.title}</h2>
                        <img src={post.image} alt={`${post.title} image`} className={Styles.postImage} />
                        <div className={Styles.postDescription}>description: {post.description}</div>
                        <div className={Styles.postIngredients}>ingredients: {post.ingredients}</div>
                        <div className={Styles.postInstructions}>instructions: {post.instructions}</div>
                        <button className={Styles.likeButton} onClick={() => { likeOrUnLikePost(post.id, post.isLiked) }} disabled={likeLoading}>
                        <span>{post.likes}</span><span>likes</span>{post.isLiked ? <img src={like} alt='like' className={Styles.likeicon}></img> : <img src={unlike} alt='unlike' className={Styles.likeicon}></img>}
                        </button>
                    </div>
                );
            })
        );
    };

    return (
        <div >
            <Navbar />
            <div className={Styles.mainContent}>
                <ChefInfo />
                <div className={Styles.postsContainer}>
                    {showPosts()}
                    {loading ? <div className={Styles.loading}>Loading...</div> : null}
                    {error ? <div className={Styles.error}>{error}</div> : null}
                    <div className={Styles.noMorePosts}>{hasMore ? null : <div>No more posts to be found</div>}</div>
                </div>
            </div>
        </div>
    );
};

export default Home;
