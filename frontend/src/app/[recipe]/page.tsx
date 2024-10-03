"use client";
import React, { useEffect, useMemo } from "react";
import Poster from "@/components/recipe/Poster";
import RecipeDetails from "@/components/recipe/RecipeDetails";
import Slides from "@/components/recipe/Slides";
import { AppDispatch } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import {
  selectRecipes,
  selectSelectedRecipe,
} from "@/redux/slices/recipeSlice";
import { fetchRecipeById, fetchRecipes } from "@/redux/services/recipeService";
import redirectLoggedIn from "@/hoc/redirectToLogin";
import NotFound from "../not-found";

const Page = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { recipe } = useParams();

  //fetching recipes by Id
  const currentRecipe = useSelector(selectSelectedRecipe);
  const recipes = useSelector(selectRecipes);

  const recipeId = useMemo(() => Number(recipe), [recipe]);

  useEffect(() => {
    if (recipeId) {
      dispatch(fetchRecipeById(recipeId));
      dispatch(fetchRecipes(undefined));
    }
  }, [currentRecipe, recipeId, dispatch]);

  if (!currentRecipe) {
    return <NotFound />;
  }

  return (
    <>
      <Poster />
      <Slides currentRecipes={currentRecipe} />
      <RecipeDetails currentRecipes={currentRecipe} recipes={recipes} />
    </>
  );
};

export default redirectLoggedIn(Page);
