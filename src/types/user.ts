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
export interface UserUpdateRequest {
    firstname?: string;
    lastname?: string;
    email?: string;
    location?: string;
}

export interface LoginResponse {
    accessToken: string;
}

export interface UserInfoResponse {
    success: boolean;
    message?: string;
    data?: UserInfo | null;
}
export type UserInfo = {
    id: number;
    email: string;

    firstname: string;
    lastname: string;
    roles: Role[];
    createdAt: string;
    profileImageUrl: string;
    location: string;
}
export type Authority = "ADMIN" | "USER"
export type Role = {
    authority: Authority;
};

export interface OpResult {
    success: boolean;
    message: string;
}