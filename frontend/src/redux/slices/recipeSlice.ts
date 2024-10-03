import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchRecipeById,
  fetchRecipes,
  likeRecipe,
  fetchCreatedRecipes,
  fetchLikedRecipes,
  dislikeRecipe,
} from "../services/recipeService";
import { Recipe, RecipeForm, RecipeState } from "@/types/recipe";

const initialRecipeState: RecipeForm = {
  name: "",
  ingredients: ["", "", ""],
  instructions: [""],
  cuisine_type: "",
  photo_link: "",
  preparation_time: "",
  cooking_time: "",
  yields: "",
  is_vegetarian: false,
};

const initialState: RecipeState = {
  recipes: [],
  selectedRecipe: null,
  isLoading: false,
  recipeLoading: false,
  error: null,
  query: "",
  liked: false,
  createdRecipes: [],
  likedRecipes: [],
  activeTab: "myRecipes",
  data: null,
  recipeForm: initialRecipeState,
  fileName: "Choose File",
  upload: false,
};

const recipeSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setLiked: (state, action: PayloadAction<boolean>) => {
      state.liked = action.payload;
    },
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
    },
    setData: (state, action: PayloadAction<Recipe[] | null>) => {
      state.data = action.payload;
    },
    setRecipeForm: (state, action: PayloadAction<Partial<RecipeForm>>) => {
      state.recipeForm = {
        ...state.recipeForm,
        ...action.payload,
      };
    },
    resetRecipeForm: (state) => {
      (state.recipeForm = initialRecipeState),
        (state.fileName = "Choose File"),
        (state.upload = false);
    },
    setFileName: (state, action: PayloadAction<string>) => {
      state.fileName = action.payload;
    },
    setUpload: (state, action: PayloadAction<boolean>) => {
      state.upload = action.payload;
    },
    setRecipesData: (state, action: PayloadAction<Recipe[]>) => {
      state.recipes = action.payload;
    },
  },
  extraReducers: (builder) => {
    //fetch all recipes
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchRecipes.fulfilled,
        (state, action: PayloadAction<Recipe[]>) => {
          state.isLoading = false;
          state.recipes = action.payload;
        }
      )
      .addCase(fetchRecipes.rejected, (state) => {
        state.isLoading = false;
        state.error = "Failed to fetch recipes.";
      });

    //fetch recipe by Id
    builder
      .addCase(fetchRecipeById.pending, (state) => {
        state.recipeLoading = true;
        state.error = null;
      })
      .addCase(
        fetchRecipeById.fulfilled,
        (state, action: PayloadAction<Recipe>) => {
          state.recipeLoading = false;
          state.selectedRecipe = action.payload;
        }
      )
      .addCase(fetchRecipeById.rejected, (state) => {
        state.recipeLoading = false;
        state.error = "Failed to fetch the recipe.";
      });

    //like the recipe
    builder
      .addCase(likeRecipe.pending, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(likeRecipe.fulfilled, (state, action: PayloadAction<Recipe>) => {
        state.isLoading = false;
        state.liked = true;
        if (
          state.selectedRecipe &&
          state.selectedRecipe.id === action.payload.id
        ) {
          state.selectedRecipe = action.payload;
        }
      })
      .addCase(likeRecipe.rejected, (state) => {
        state.isLoading = false;
        state.error = "Failed to like the recipe.";
      });

    //dislike the recipe
    builder
      .addCase(dislikeRecipe.pending, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(
        dislikeRecipe.fulfilled,
        (state, action: PayloadAction<Recipe>) => {
          state.isLoading = false;
          state.liked = false;
          if (
            state.selectedRecipe &&
            state.selectedRecipe.id === action.payload.id
          ) {
            state.selectedRecipe = action.payload;
          }
        }
      )
      .addCase(dislikeRecipe.rejected, (state) => {
        state.isLoading = false;
        state.error = "Failed to like the recipe.";
      });

    //created recipes
    builder
      .addCase(fetchCreatedRecipes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchCreatedRecipes.fulfilled,
        (state, action: PayloadAction<Recipe[]>) => {
          state.isLoading = false;
          state.createdRecipes = action.payload;
        }
      )
      .addCase(fetchCreatedRecipes.rejected, (state) => {
        state.isLoading = false;
        state.error = "Failed to fetch created recipes.";
      });

    //liked recipes
    builder
      .addCase(fetchLikedRecipes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchLikedRecipes.fulfilled,
        (state, action: PayloadAction<Recipe[]>) => {
          state.isLoading = false;
          state.likedRecipes = action.payload;
        }
      )
      .addCase(fetchLikedRecipes.rejected, (state) => {
        state.isLoading = false;
        state.error = "Failed to fetch liked recipes.";
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

export const {
  setQuery,
  setLiked,
  setActiveTab,
  setData,
  setRecipeForm,
  setFileName,
  setUpload,
  resetRecipeForm,
  setRecipesData,
} = recipeSlice.actions;

export default recipeSlice.reducer;
