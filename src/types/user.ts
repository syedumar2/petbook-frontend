// src/types/auth.ts

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    location: string;
}

export interface LoginResponse {
    accessToken: string;
}

export interface UserInfoResponse {
    success: boolean;
    message?: string;
    data?: UserInfo;
}
export type UserInfo = {
    email: string;

    firstname: string;
    lastname: string;
    roles: string[];
    createdAt: string;
    profileImageUrl: string;
    location: string;
}
