import { clearTokens, getAccessToken, setAccessToken } from "@/context/tokenStore";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { toast } from "sonner";
import { authApi } from "./authApi";


const axiosInstance = axios.create(
    {
        baseURL: "http://localhost:8080/api/auth", //TODO import the url from env file
        withCredentials: true
    }
);
export const publicInstance = axios.create(
    {
        baseURL:"http://localhost:8080/api"
    }
)

axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = getAccessToken();

        if (token) { config.headers.Authorization = `Bearer ${token}` };
        return config;

    },
    (error) => {
        if (error.response) {
            // server responded with error (e.g., 400/500)
            toast.error(`Error ${error.response.status}: ${error.response.data.message || "Something went wrong"}`);
        } else if (error.request) {
            // request was made but no response
            toast.error("No response from server");
        } else {
            // something else
            toast.error("Request setup failed: " + error.message);
        }

        return Promise.reject(error);
    }
)


axiosInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        if (error.response?.status === 401) {
            try {
                const res = await authApi.refreshToken();
                const newToken = res.data?.data.token
                if (res.data?.data.token) {
                    setAccessToken(newToken);
                    const originalRequest = error.config as InternalAxiosRequestConfig;
                    originalRequest.headers.Authorization = `Bearer ${newToken}`;
                    return axiosInstance(originalRequest);
                }
            } catch (refreshError) {
                clearTokens();
                window.location.href = "/login";
                toast.error("Refresh failed");

            }

        }
        return Promise.reject(error); //That rejection goes back to whoever called the original API request.
    }
)

export default axiosInstance;
