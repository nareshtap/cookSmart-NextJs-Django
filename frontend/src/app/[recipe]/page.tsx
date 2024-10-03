"use client";
import React, { useEffect, useMemo, useState } from "react";
import Poster from "@/components/recipe/Poster";
import RecipeDetails from "@/components/recipe/RecipeDetails";
import Slides from "@/components/recipe/Slides";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { selectSelectedRecipe } from "@/redux/slices/recipeSlice";
import { fetchRecipeById } from "@/redux/services/recipeService";
import redirectLoggedIn from "@/hoc/redirectToLogin";
import NotFound from "../not-found";
import Loader from "@/components/Loader";

const Page = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { recipe } = useParams();

  //fetching recipes by Id
  const currentRecipe = useSelector(selectSelectedRecipe);
  const { recipeLoading } = useSelector((state: RootState) => state.recipe);

  const recipeId = useMemo(() => Number(recipe), [recipe]);

  const [recipeFound, setRecipeFound] = useState(true);

  useEffect(() => {
    if (recipeId) {
      dispatch(fetchRecipeById(recipeId));
    }
  }, [recipeId, dispatch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!currentRecipe) {
        setRecipeFound(false);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [currentRecipe]);

  if (!recipeFound) {
    return <NotFound />;
  }

  return (
    <>
      {recipeLoading ? (
        <Loader />
      ) : (
        <>
          <Poster />
          <Slides currentRecipes={currentRecipe} />
          <RecipeDetails currentRecipes={currentRecipe} />
        </>
      )}
    </>
  );
};

export default redirectLoggedIn(Page);
