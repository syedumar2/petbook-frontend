
import { LoginRequest, RegisterRequest, UserInfoResponse } from "@/types/user";
import axiosInstance from "./axios";

import { AxiosError } from "axios";


export interface AuthResponse {
    success: boolean;
    message: string;
    token?: string;
}
type ApiErrorResponse = {
  success: boolean;
  message: string;
};


function parseApiError(err: unknown, defaultMsg = "Something went wrong"): string {
    const error = err as AxiosError<ApiErrorResponse>;
    if (error.response?.status === 403) {
        return "Forbidden: You don't have access";
    } else if (error.response?.status && error.response?.data?.message) {
        return `${error.response.status} : ${error.response.data?.message}`;

    } else {
        return defaultMsg;
    }
}


export async function loginApi(data: LoginRequest): Promise<AuthResponse> {
    try {
        const res = await axiosInstance.post("/auth/login", data);
     
        return {
            success: res.data.success,
            message: res.data.message,
            token: res.data.data?.token || undefined
        };
    } catch (err) {
        return {
            success: false,
            message: parseApiError(err)
        };
    }
}

export async function registerApi(data: RegisterRequest): Promise<AuthResponse> {
    try {
        const res = await axiosInstance.post("/auth/register", data);

        return {
            success: res.data.success,
            message: res.data.data,

        };

    } catch (err: unknown) {
        const error = err as AxiosError<{ message: string }>;
        if (error.response?.data?.message) {
            return {
                success: false,
                message: error?.response.data.message
            };
        }

        return {
            success: false,
            message: parseApiError(err)
        };

    }

}

export async function refreshTokenApi(): Promise<string> {
    const res = await axiosInstance.post("/auth/refresh");
    return res.data.token;
}

export async function logoutApi(): Promise<void> {
    await axiosInstance.post("/auth/logout");
}

export async function getUserInfoApi(): Promise<UserInfoResponse> {
    try {
        const res = await axiosInstance.get("/user/me");
        return {
            success: res.data.success,
            data: res.data.data

        }
    } catch (err) {
        return {
            success: false,
            message: parseApiError(err)
        };


    }
}



export function handleApiError(err: unknown, defaultMsg = "Something went wrong") {
    const error = err as AxiosError;
    if (error.response?.status === 403) {
        return "Forbidden: You don't have access";
    } else if (error.response?.status) {
        return `Server error: ${error.response.status}`;
    } else {
        return defaultMsg;
    }
}

