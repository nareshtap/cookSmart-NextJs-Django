import React, { useState } from "react";
import styles from "@/styles/header/SearchOverlay.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { selectRecipes, setQuery } from "@/redux/slices/recipeSlice";
import { fetchRecipes } from "@/redux/services/recipeService";
import Link from "next/link";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import recipeData from "@/data/recipes.json";

const SearchOverlay = ({ onClose }) => {
  const dispatch: AppDispatch = useDispatch();
  const results = useSelector(selectRecipes);
  const [data, setData] = useState(results.length > 0 ? results : recipeData);
  const { query } = useSelector((state: RootState) => state.recipe);

  const handleSearch = async (e) => {
    e.preventDefault();
    const trimmedQuery = query.trim();

    if (trimmedQuery) {
      try {
        const response = await dispatch(fetchRecipes(trimmedQuery));
        const { payload } = response as { payload: any[] };

        if (payload.length === 0) {
          const localResults = recipeData.filter(
            (recipe) =>
              recipe.name.toLowerCase().includes(trimmedQuery.toLowerCase()) ||
              recipe.ingredients.some((ingredient) =>
                ingredient.toLowerCase().includes(trimmedQuery.toLowerCase())
              ) ||
              recipe.cuisine_type
                .toLowerCase()
                .includes(trimmedQuery.toLowerCase())
          );

          if (localResults.length === 0) {
            toast.error("No Recipe Found.");
          } else {
            setData(localResults);
          }
        }
      } catch (error) {
        toast.error("An error occurred while fetching recipes.");
        console.error("Error fetching recipes:", error);
      }
    } else {
      toast.error("Please enter something to search.");
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.overlayContent}>
        <div className={styles.closeButton} onClick={onClose}>
          <div className={styles.closeIcon}>&times;</div>
        </div>
        <form onSubmit={handleSearch}>
          <h2 style={{ color: "green" }}>Search Recipes</h2>
          <div className={styles.SearchBarButton}>
            <input
              type="text"
              value={query}
              onChange={(e) => dispatch(setQuery(e.target.value))}
              placeholder="Search by name, ingredients, cuisine type..."
              className={styles.searchInput}
            />
            <div onClick={handleSearch} className={styles.searchButton}>
              <FontAwesomeIcon icon={faSearch} />
            </div>
          </div>
        </form>
        <ul className={styles.resultsList}>
          {data.map((result, index) => (
            <Link href={`/${result.id}`} style={{ textDecoration: "none" }}>
              <li key={index} className={styles.resultItem} onClick={onClose}>
                <img
                  src={result.photo_link}
                  alt={result.name}
                  className={styles.resultImage}
                />
                <div className={styles.resultDetails}>
                  <h3 className={styles.recipeName}>{result.name}</h3>
                  <p className={styles.cuisineType}>{result.cuisine_type}</p>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchOverlay;
