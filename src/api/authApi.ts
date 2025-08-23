// src/api/authApi.ts
import axiosInstance from "./axios";
import { LoginRequest, RegisterRequest } from "@/types/user";

export const authApi = {
  login: (data: LoginRequest) =>
    axiosInstance.post("/login", data),

  register: (data: RegisterRequest) =>
    axiosInstance.post("/register", data),

  refreshToken: () =>
    axiosInstance.post("/refresh"),

  logout: () =>
    axiosInstance.post("/logout"),

  getUserInfo: () =>
    axiosInstance.get("/user/me"),
};
