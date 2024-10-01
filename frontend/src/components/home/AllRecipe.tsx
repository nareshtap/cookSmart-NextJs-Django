import React from "react";
import styles from "@/styles/home/AllRecipe.module.css";
import { useRouter } from "next/navigation";

interface Recipe {
  id: number;
  name: string;
  photo_link: string;
}

interface PopularRecipeProps {
  recipes: Recipe[];
}

const AllRecipe: React.FC<PopularRecipeProps> = ({ recipes }) => {
  const router = useRouter();

  const handleRedirect = (id: any) => {
    router.push(`/${id}`);
  };

  return (
    <section className={styles.bestRecipeArea}>
      <div className={styles.col12}>
        <div className={styles.sectionHeading}>
          <h2>Our Best Recipes</h2>
        </div>
      </div>
      <div className={styles.allRecipeMain}>
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            onClick={() => handleRedirect(recipe.id)}
            className={styles.singleBestRecipeArea}
          >
            <img src={recipe.photo_link} alt={recipe.name} />
            <div className={styles.recipeContent}>
              <h5>{recipe.name}</h5>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AllRecipe;
