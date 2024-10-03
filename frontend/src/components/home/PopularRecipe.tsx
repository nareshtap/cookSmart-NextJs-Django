import React from "react";
import styles from "@/styles/home/PopularRecipe.module.css";
import { useRouter } from "next/navigation";
import { Recipe } from "@/types/recipe";

interface PopularRecipeProps {
  recipes: Recipe[];
  scrollToRecipes: () => void;
}

const PopularRecipe: React.FC<PopularRecipeProps> = ({
  recipes,
  scrollToRecipes,
}) => {
  const router = useRouter();

  const handleRedirect = (id: number) => {
    router.push(`/${id}`);
  };

  return (
    <section className={styles.topCategoryArea}>
      <div className={styles.topCategoryAreaWrap}>
        {recipes.slice(0, 2).map((recipe, index) => (
          <div key={index} className={styles.singleTopCategory}>
            <img src={recipe.photo_link} alt={recipe.name} />
            <div className={styles.topCtaContent}>
              <h3>{recipe.name}</h3>
              <h4>{recipe.cuisine_type}</h4>
              <button
                onClick={() => handleRedirect(recipe.id)}
                className={styles.btn}
              >
                See Full Recipe
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularRecipe;
