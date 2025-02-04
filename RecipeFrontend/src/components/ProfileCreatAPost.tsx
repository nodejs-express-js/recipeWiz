import { useRef, useState } from "react";
import Styles from "./ProfileCreatePost.module.css";
import useCreateARecipe from "../hooks/useCreateARecipe";
import image from "../fake-recipe.jpg";
export type Recipe = {
  title: string;
  description: string;
  ingredients: string;
  instructions: string;
  image: File | null | string;
};

import { Recipe as RecipeMain } from "./Home";

type propType = { addAPost: (post: RecipeMain) => void };

const ProfileCreatAPost = ({ addAPost }: propType) => {
  const { error, loading, createARecipe } = useCreateARecipe();
  const ref = useRef<HTMLInputElement>(null);

  const [post, setPostInfo] = useState<Recipe>({
    title: "cookie",
    description: "what kind of cookie",
    ingredients: "ingredients of cookie",
    instructions: "instructions of cookie",
    image: "",
  });
  const [previewImage, setPreviewImage] = useState<string>(image);
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      setPostInfo({ ...post, image: e.target.files[0] });
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
    } else {
      setPreviewImage(image);
    }
  };
  const createAPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      post.title &&
      post.description &&
      post.ingredients &&
      post.instructions &&
      post.image instanceof File
    ) {
      const newpost = await createARecipe(post);
      if (newpost) {
        addAPost(newpost);
      }

      setPostInfo({
        title: "cookie",
        description: "what kind of cookie",
        ingredients: "ingredients of cookie",
        instructions: "instructions of cookie",
        image: "",
      });
      if (ref.current) {
        ref.current.value = "";
      }

      setPreviewImage(image);
    } else {
      alert("Please fill all the fields");
    }
  };
  return (
    <div className={Styles.mainContainer}>
      <form onSubmit={(e) => createAPost(e)} className={Styles.form}>
        <div className={Styles.formGroup}>
          <label className={Styles.label}>Title</label>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={post.title}
            onChange={(e) => setPostInfo({ ...post, title: e.target.value })}
            className={Styles.input}
          />
        </div>
        <div className={Styles.formGroup}>
          <label className={Styles.label}>Description</label>
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={post.description}
            onChange={(e) =>
              setPostInfo({ ...post, description: e.target.value })
            }
            className={Styles.input}
          />
        </div>
        <div className={Styles.formGroup}>
          <label className={Styles.label}>Ingredients</label>
          <input
            type="text"
            name="ingredients"
            placeholder="Ingredients"
            value={post.ingredients}
            onChange={(e) =>
              setPostInfo({ ...post, ingredients: e.target.value })
            }
            className={Styles.input}
          />
        </div>
        <div className={Styles.formGroup}>
          <label className={Styles.label}>Instructions</label>
          <input
            type="text"
            name="instructions"
            placeholder="Instructions"
            value={post.instructions}
            onChange={(e) =>
              setPostInfo({ ...post, instructions: e.target.value })
            }
            className={Styles.input}
          />
        </div>

        <div className={Styles.formGroup}>
          <label className={Styles.label}>Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            ref={ref}
            onChange={(e) => handleFileUpload(e)}
            className={Styles.fileInput}
          />
        </div>
        {error && <div className={Styles.error}>{error}</div>}
        <div className={Styles.buttonContainer}>
          <button type="submit" disabled={loading} className={Styles.button}>
            Create Post
          </button>
        </div>
      </form>

      <div className={Styles.previewContainer}>
        <h1 className={Styles.previewTitle}>Preview</h1>
        <h2>{post.title}</h2>
        <img src={previewImage} alt={`${post.title} image`} className={Styles.postImage}/>
        <div className={Styles.postDescription}>description: {post.description}</div>
        <div className={Styles.postIngredients}>ingredients: {post.ingredients}</div>
        <div className={Styles.postInstructions}>instructions: {post.instructions}</div>
      </div>
    </div>
  );
};

export default ProfileCreatAPost;
