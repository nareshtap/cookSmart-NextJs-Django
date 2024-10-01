import axiosInstance from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

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

interface RecipeCreation {
  name: string;
  ingredients: string[];
  instructions: string[];
  cuisine_type: string;
  photo_link: string;
  preparation_time: string;
  cooking_time: string;
  yields: string;
  is_vegetarian: boolean;
}

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

export const fetchCreatedRecipes = createAsyncThunk("createdRecipes", async () => {
  try {
    const response = await axiosInstance.get("/api/recipes/created-recipes");
    const data = response.data;
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const fetchLikedRecipes = createAsyncThunk("likedRecipes", async () => {
  try {
    const response = await axiosInstance.get("/api/recipes/liked-recipes");
    const data = response.data;
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});
