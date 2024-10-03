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
  liked_by: User[] | null;
  created_by: User;
  cuisine_type: string;
  photo_link: string;
  preparation_time: number;
  cooking_time: number;
  yields: number;
  is_vegetarian: boolean;
}

export interface RecipeForm {
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

export interface RecipeState {
  recipes: Recipe[];
  selectedRecipe: Recipe | null;
  isLoading: boolean;
  recipeLoading: boolean;
  error: string | null;
  query: string;
  liked: boolean;
  createdRecipes: Recipe[];
  likedRecipes: Recipe[];
  activeTab: string;
  data: Recipe[] | null;
  recipeForm: RecipeForm;
  fileName: string;
  upload: boolean;
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

export interface RecipeCreation {
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
