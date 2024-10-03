import { Recipe, RecipeCreation } from "@/types/recipe";
import axiosInstance from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchRecipes = createAsyncThunk(
  "recipes/fetchRecipes",
  async (searchQuery: string | undefined = undefined, { rejectWithValue }) => {
    try {
      const url = searchQuery
        ? `/api/recipes/?search=${encodeURIComponent(searchQuery)}`
        : `/api/recipes/`;

      const response = await axiosInstance.get(url);
      return response.data as Recipe[];
    } catch (error) {
      return rejectWithValue(error.response?.data.message || error.message);
    }
  }
);

export const fetchRecipeById = createAsyncThunk(
  "recipes/fetchRecipeById",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/recipes/${id}`);
      return response.data as Recipe;
    } catch (error) {
      return rejectWithValue(error.response?.data.message || error.message);
    }
  }
);

export const likeRecipe = createAsyncThunk(
  "likeRecipe",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/api/recipes/${id}/like/`);
      return response.data as Recipe;
    } catch (error) {
      return rejectWithValue(error.response?.data.message || error.message);
    }
  }
);

export const dislikeRecipe = createAsyncThunk(
  "dislikeRecipe",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/api/recipes/${id}/dislike/`);
      return response.data as Recipe;
    } catch (error) {
      return rejectWithValue(error.response?.data.message || error.message);
    }
  }
);

export const addRecipe = createAsyncThunk(
  "recipe/add",
  async (recipe: RecipeCreation, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/recipes/", recipe);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchCreatedRecipes = createAsyncThunk(
  "createdRecipes",
  async () => {
    try {
      const response = await axiosInstance.get("/api/recipes/created-recipes");
      const data = response.data;
      return data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const fetchLikedRecipes = createAsyncThunk("likedRecipes", async () => {
  try {
    const response = await axiosInstance.get("/api/recipes/liked-recipes");
    const data = response.data;
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});
