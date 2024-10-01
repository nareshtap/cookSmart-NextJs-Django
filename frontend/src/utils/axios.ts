import axios from "axios";
import toast from "react-hot-toast";

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_HOST}`,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refresh_token");
  if (refreshToken) {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST}/auth/token/refresh/`,
        { refresh: refreshToken }
      );
      const { access } = response.data;
      localStorage.setItem("access_token", access);
      return access;
    } catch (error) {
      toast.error("Please, Login to continue");
      window.location.href = "/auth/login";
      throw error;
    }
  }
  return null;
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await refreshAccessToken();
        if (newAccessToken) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        toast.error("Please, Login to continue");
        window.location.href = "/auth/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);


export default axiosInstance;
