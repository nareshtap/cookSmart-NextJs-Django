import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchRecipeById,
  fetchRecipes,
  likeRecipe,
  fetchCreatedRecipes,
  fetchLikedRecipes,
} from "../services/recipeService";

export interface User {
  username: string;
  email: string;
  password: string;
  phone_number: string;
}

export interface Recipe {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string[];
  liked_by: User[];
  created_by: User;
  cuisine_type: string;
  photo_link: string;
  preparation_time: number;
  cooking_time: number;
  yields: number;
  is_vegetarian: boolean;
}

interface RecipeState {
  recipes: Recipe[];
  selectedRecipe: Recipe | null;
  isLoading: boolean;
  error: string | null;
  query: string;
  liked: boolean;
  createdRecipes: Recipe[];
  likedRecipes: Recipe[];
  activeTab: string;
}

const initialState: RecipeState = {
  recipes: [],
  selectedRecipe: null,
  isLoading: false,
  error: null,
  query: "",
  liked: false,
  createdRecipes: [],
  likedRecipes: [],
  activeTab: "myRecipes",
};

const recipeSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    setLiked: (state, action) => {
      state.liked = action.payload;
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRecipes.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.recipes = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(fetchRecipeById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRecipeById.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.selectedRecipe = action.payload;
      })
      .addCase(fetchRecipeById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(likeRecipe.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(likeRecipe.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.liked = true;
        if (
          state.selectedRecipe &&
          state.selectedRecipe.id === action.payload.id
        ) {
          state.selectedRecipe = action.payload;
        }
      })
      .addCase(likeRecipe.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(fetchCreatedRecipes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCreatedRecipes.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.createdRecipes = action.payload;
      })
      .addCase(fetchCreatedRecipes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(fetchLikedRecipes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchLikedRecipes.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.likedRecipes = action.payload;
      })
      .addCase(fetchLikedRecipes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const selectRecipes = (state: { recipe: RecipeState }) =>
  state.recipe.recipes;
export const selectSelectedRecipe = (state: { recipe: RecipeState }) =>
  state.recipe.selectedRecipe;
export const selectIsLoading = (state: { recipe: RecipeState }) =>
  state.recipe.isLoading;
export const selectError = (state: { recipe: RecipeState }) =>
  state.recipe.error;
export const { setQuery, setLiked, setActiveTab } = recipeSlice.actions;

export default recipeSlice.reducer;
