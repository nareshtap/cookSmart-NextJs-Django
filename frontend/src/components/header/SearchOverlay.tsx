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

const SearchOverlay = ({ onClose }) => {
  const dispatch: AppDispatch = useDispatch();
  const results = useSelector(selectRecipes);
  const { query } = useSelector((state: RootState) => state.recipe);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedQuery = query.trim();

    if (trimmedQuery) {
      try {
        const response = await dispatch(fetchRecipes(trimmedQuery));
        const { payload } = response as { payload: any[] };

        if (payload.length === 0) {
          toast.error("No Recipe Found.");
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
        <button className={styles.closeButton} onClick={onClose}>
          <div className={styles.closeIcon}>&times;</div>
        </button>
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
            <button type="submit" className={styles.searchButton}>
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </form>

        <ul className={styles.resultsList}>
          {results.map((result, index) => (
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
