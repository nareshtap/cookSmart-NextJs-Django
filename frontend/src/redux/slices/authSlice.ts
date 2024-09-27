import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { login, currentUser } from "@/redux/services/authService";

interface AuthState {
  isLoading: boolean;
  error: any;
  formData: {
    email: string;
    password: string;
  };
  registerData: {
    username: string;
    email: string;
    password: string;
    phone_number: string;
  };
  isLoggedIn: boolean;
  isOverlayVisible: boolean;
  user: {
    username: string;
    email: string;
    phone_number: string;
  };
}
const initialFormData = {
  email: "",
  password: "",
};

const initialRegisterData = {
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
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setOverlayVisible: (state, action) => {
      state.isOverlayVisible = action.payload;
    },
  },
  extraReducers: (builder) => {
    //login
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    builder.addCase(currentUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(currentUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    });
    builder.addCase(currentUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const {
  setFormData,
  setRegisterData,
  setIsLoggedIn,
  setOverlayVisible,
} = authSlice.actions;
export default authSlice.reducer;
