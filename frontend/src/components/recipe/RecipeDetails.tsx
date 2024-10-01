import React, { useEffect } from "react";
import { FaHeart, FaRegHeart, FaLeaf, FaDrumstickBite } from "react-icons/fa";
import styles from "@/styles/recipe/RecipeDetails.module.css";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { currentUser } from "@/redux/services/authService";
import { setLiked } from "@/redux/slices/recipeSlice";
import { fetchRecipes, likeRecipe } from "@/redux/services/recipeService";
import { selectRecipes } from "@/redux/slices/recipeSlice";
interface PopularRecipeProps {
  currentRecipes: any;
}

const RecipeDetails: React.FC<PopularRecipeProps> = ({ currentRecipes }) => {
  const dispatch: AppDispatch = useDispatch();
  const { liked } = useSelector((state: RootState) => state.recipe);

  useEffect(() => {
    dispatch(fetchRecipes(undefined));
  }, [dispatch]);

  const recipes = useSelector(selectRecipes);
  const recipeId = currentRecipes?.id;

  const checkLikedStatus = async () => {
    const resultAction = await dispatch(currentUser());

    if (currentUser.fulfilled.match(resultAction)) {
      const user = resultAction.payload;
      if (user && user.email) {
        const isLiked = currentRecipes.liked_by.some(
          (likedUser) => likedUser.email === user.email
        );
        dispatch(setLiked(isLiked));
      }
    } else {
      console.error("Failed to fetch the current user");
    }
  };

  useEffect(() => {
    if (currentRecipes) {
      checkLikedStatus();
    }
  }, [currentRecipes]);

  const toggleLikeDislike = async () => {
    try {
      const resultAction = await dispatch(likeRecipe(recipeId));
      if (likeRecipe.fulfilled.match(resultAction)) {
        toast.success("Recipe Liked Successfully!");
        dispatch(setLiked(true));
      } else {
        toast.error("You have already liked the recipe");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <div className={styles.recipeHeader}>
        <h1 className={styles.recipeName}>
          {currentRecipes?.name}
          {currentRecipes?.is_vegetarian ? (
            <FaLeaf
              style={{ marginLeft: "8px", color: "green" }}
              title="Vegetarian"
            />
          ) : (
            <FaDrumstickBite
              style={{ marginLeft: "8px", color: "brown" }}
              title="Non-Vegetarian"
            />
          )}
        </h1>
        {recipes.length > 0 && (
          <div className={styles.likeButton}>
            <div
              className={`${styles.toggleButton} ${
                liked === true ? styles.liked : styles.disliked
              }`}
              onClick={toggleLikeDislike}
              aria-label="Like/Dislike"
            >
              {liked === true ? <FaHeart /> : <FaRegHeart />}
            </div>
          </div>
        )}
      </div>

      <div className={styles.container}>
        <div className={styles.recipeMeta}>
          <span>
            Preparation Time: {currentRecipes?.preparation_time} mins.
          </span>
          <span>Cooking Time: {currentRecipes?.cooking_time} mins.</span>
          <span>Yields: {currentRecipes?.yields} Servings</span>
        </div>
        <div className={styles.recipeMeta}>
          <span>cuisine Type: {currentRecipes?.cuisine_type}</span>
          <span>Created By: {currentRecipes?.created_by.username}</span>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.recipeMeta}>
          <h2 className={styles.greenText}>Instructions</h2>
          <div className={styles.steps}>
            {currentRecipes?.instructions.map(
              (instruction: string, index: number) => (
                <div className={styles.instructionStep} key={index}>
                  <h3>{String(index + 1).padStart(2, "0")}. </h3>
                  <h3>{instruction}</h3>
                </div>
              )
            )}
          </div>
        </div>

        <div className={styles.recipeMeta}>
          <h2 className={styles.greenText}>Ingredients</h2>
          <ul>
            {currentRecipes?.ingredients.map(
              (ingredient: string, index: number) => (
                <li key={index}>{ingredient}</li>
              )
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default RecipeDetails;
import redirectToLogin from "@/hoc/redirectToLogin";
