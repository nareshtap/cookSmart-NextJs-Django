"use client";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { fetchRecipes } from "@/redux/services/recipeService";
import { selectRecipes } from "@/redux/slices/recipeSlice";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Slider from "@/components/home/Slider";
import styles from "@/styles/home/Slider.module.css";
import PopularRecipe from "@/components/home/PopularRecipe";
import recipeData from "@/data/recipes.json";
import AllRecipe from "@/components/home/AllRecipe";
import RecipePoster from "@/components/home/RecipePoster";

const HomePage = () => {
  const allRecipeRef = useRef<null | HTMLDivElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const recipes = useSelector(selectRecipes);
  const [scrollToTopVisible, setScrollToTopVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchRecipes(undefined));

    const handleScroll = () => {
      if (window.scrollY > 300) {
        setScrollToTopVisible(true);
      } else {
        setScrollToTopVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dispatch]);

  const recipesData = recipes.length > 0 ? recipes : recipeData;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Slider scrollToRecipes={() =>
          allRecipeRef.current?.scrollIntoView({ behavior: "smooth" })
        } />
      <PopularRecipe recipes={recipesData} />
      <RecipePoster
        scrollToRecipes={() =>
          allRecipeRef.current?.scrollIntoView({ behavior: "smooth" })
        }
      />
      <div ref={allRecipeRef}>
        <AllRecipe recipes={recipesData} />
      </div>
      {scrollToTopVisible && (
        <button onClick={scrollToTop} className={styles.scrollerbar}>
          <KeyboardArrowUpIcon style={{ fontSize: "30px" }} />
        </button>
      )}
    </>
  );
};

export default HomePage;
