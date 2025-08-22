// src/api/authApi.ts
import axiosInstance from "./axios";
import { LoginRequest, RegisterRequest, UserInfoResponse } from "@/types/user";

export const authApi = {
  login: (data: LoginRequest) =>
    axiosInstance.post("/auth/login", data),

  register: (data: RegisterRequest) =>
    axiosInstance.post("/auth/register", data),

  refreshToken: () =>
    axiosInstance.post("/auth/refresh"),

  logout: () =>
    axiosInstance.post("/auth/logout"),

  getUserInfo: () =>
    axiosInstance.get("/user/me"),
};
