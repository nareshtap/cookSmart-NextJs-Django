import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/redux//slices/authSlice";
import recipeReducer from "@/redux/slices/recipeSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    recipe: recipeReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
