import React, { useEffect } from "react";
import styles from "@/styles/header/SearchOverlay.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { selectRecipes, setData, setQuery } from "@/redux/slices/recipeSlice";
import { fetchRecipes } from "@/redux/services/recipeService";
import Link from "next/link";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Recipe } from "@/types/recipe";

const SearchOverlay = ({ onClose }) => {
  const dispatch: AppDispatch = useDispatch();

  const results = useSelector(selectRecipes);
  const { query, data } = useSelector((state: RootState) => state.recipe);

  useEffect(() => {
    //fetch all recipes
    dispatch(fetchRecipes(undefined));
    // Applying local JSON data if no recipes are found in the database
    dispatch(setData(results));
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    const trimmedQuery = query.trim();

    if (trimmedQuery) {
      try {
        const response = await dispatch(fetchRecipes(trimmedQuery));
        const { payload } = response as { payload: Recipe[] };

        if (payload.length === 0) {
          dispatch(setData());
          // toast.error("No Recipe Found.");
        } else {
          dispatch(setData(payload));
        }
      } catch (error) {
        toast.error("An error occurred while fetching recipes.");
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
          {data ? data?.map((result, index) => (
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
          )): <>
          <h3 className={styles.noRecipe}>No Recipe Found.</h3>
          </>}
        </ul>
      </div>
    </div>
  );
};

export default SearchOverlay;
