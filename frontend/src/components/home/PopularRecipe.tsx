import React, { useEffect } from "react";
import styles from "@/styles/home/PopularRecipe.module.css";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { fetchRecipes } from "@/redux/services/recipeService";
import { useRouter } from "next/navigation";

interface PopularRecipeProps {
  recipes: Array<any>;
}

const PopularRecipe: React.FC<PopularRecipeProps> = ({ recipes }) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchRecipes(undefined));
  }, [dispatch]);

  const handleRedirect = (id: string) => {
    router.push(`/${id}`);
  };

  return (
    <section className={styles.topCategoryArea}>
      <div className={styles.topCategoryAreaWrap}>
        {recipes.slice(0, 2).map((recipe, index) => (
          <div key={index} className={styles.singleTopCategory}>
            <img src={recipe.photo_link} alt="Strawberry Cake" />
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
