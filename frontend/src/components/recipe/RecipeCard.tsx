import React from "react";
import styles from "@/styles/recipe/RecipeCard.module.css";
import { Recipe } from "@/redux/slices/recipeSlice";
import { FaHeart } from "react-icons/fa";

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <div className={styles.recipeCard}>
      <div className={styles.recipeImage}>
        <img src={recipe.photo_link} alt="photo" />
      </div>
      <div className={styles.recipeDetails}>
        <h2>{recipe.name}</h2>
        <p>Cuisine: {recipe.cuisine_type}</p>
        <p>Cooking Time: {recipe.cooking_time}</p>
        <p>Serves: {recipe.yields}</p>
        <div className={styles.interactionSection}>
          <div className={styles.likes}>
            <div className={styles.heartBtn} aria-label="Like/Dislike">
              <FaHeart />
            </div>
            <span>{recipe.liked_by.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
