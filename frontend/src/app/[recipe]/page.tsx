"use client";
import Poster from "@/components/recipe/Poster";
import RecipeDetails from "@/components/recipe/RecipeDetails";
import Slides from "@/components/recipe/Slides";
import { AppDispatch } from "@/redux/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { selectSelectedRecipe } from "@/redux/slices/recipeSlice";
import { fetchRecipeById } from "@/redux/services/recipeService";
import redirectLoggedIn from "@/hoc/redirectToLogin";
import recipeData from "@/data/recipes.json";
import { notFound } from "next/navigation";

const Page = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { recipe } = useParams();
  const recipeId = Number(recipe);
  const currentRecipe = useSelector(selectSelectedRecipe);
  const recipes =
    currentRecipe === null
      ? recipeData.find((recipeDetails) => recipeDetails.id === recipeId)
      : currentRecipe;

  useEffect(() => {
    if (recipe) {
      dispatch(fetchRecipeById(Number(recipe)));
    }
  }, [recipe, dispatch]);

  if (!recipes) {
    notFound();
  }

  return (
    <>
      <Poster />
      <Slides currentRecipes={recipes} />
      <RecipeDetails currentRecipes={recipes} />
    </>
  );
};

export default redirectLoggedIn(Page);
