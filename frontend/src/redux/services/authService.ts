import axiosInstance from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface LoginFormData {
  email: string;
  password: string;
}

interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  phone_number: string;
}

export const login = createAsyncThunk(
  "login",
  async (formData: LoginFormData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/auth/token/",
        formData
      );
      const data = response.data;
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const register = createAsyncThunk(
  "register",
  async (registerData: RegisterFormData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
       "/auth/register/",
        {
          ...registerData,
          phone_number: Number(registerData.phone_number),
        }
      );
      const data = response.data;
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const currentUser = createAsyncThunk("currentUser", async () => {
  try {
    const response = await axiosInstance.get("/auth/user/");
    const data = response.data;
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const logout = createAsyncThunk("logout", async () => {
  try {
    const response = await axiosInstance.post("/auth/logout/");
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});
