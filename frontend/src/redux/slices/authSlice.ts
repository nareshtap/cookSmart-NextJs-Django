import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { login, currentUser } from "@/redux/services/authService";
import { AuthState } from "@/types/auth";

const initialFormData: AuthState["formData"] = {
  email: "",
  password: "",
};

const initialRegisterData: AuthState["registerData"] = {
  username: "",
  email: "",
  password: "",
  phone_number: "",
};

const initialState: AuthState = {
  isLoading: false,
  error: null,
  formData: initialFormData,
  registerData: initialRegisterData,
  isLoggedIn: false,
  isOverlayVisible: false,
  user: null,
  formVisible: false,
  loggedIn: false,
  isMenuOpen: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setFormData: (
      state,
      action: PayloadAction<Partial<AuthState["formData"]>>
    ) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    setRegisterData: (
      state,
      action: PayloadAction<Partial<AuthState["registerData"]>>
    ) => {
      state.registerData = { ...state.registerData, ...action.payload };
    },
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    setOverlayVisible: (state, action: PayloadAction<boolean>) => {
      state.isOverlayVisible = action.payload;
    },
    setFormVisible: (state, action: PayloadAction<boolean>) => {
      state.formVisible = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.loggedIn = action.payload;
    },
    setIsMenuOpen: (state, action: PayloadAction<boolean>) => {
      state.isMenuOpen = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || "Login failed"; 
    });

    // Current user
    builder.addCase(currentUser.pending, (state) => {
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(currentUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    });
    builder.addCase(currentUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || "Failed to fetch user"; 
    });
  },
});

export const {
  setFormData,
  setRegisterData,
  setIsLoggedIn,
  setOverlayVisible,
  setFormVisible,
  setIsLoading,
  setLoggedIn,
  setIsMenuOpen,
} = authSlice.actions;

export default authSlice.reducer;
