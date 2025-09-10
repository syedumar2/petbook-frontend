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

export interface NotificationsResponse {
    success: boolean;
    message?: string;
    data?: NotificationPayload[] | null;
}

export interface NotificationDeletedResponse {
    success: boolean;
    message: string;
}
export interface NotificationResponse {
    success: boolean;
    message?: string;
    data?: NotificationPayload | null;
}
export type NotificationPayload = {
    id: number;
    message: string;
    type: | "WELCOME"
    | "PET_APPROVED"
    | "PET_REJECTED"
    | "PET_UPDATED"
    | "PET_DELETED"
    | "CONVERSATION_STARTED"
    | "CONVERSATION_DELETED"
    | "NEW_MESSAGES";
    read: boolean;
    createdAt: string;
};
export interface NotificationDeleteRequest {
    ids: number[];
}

//TODO Bug where if i send anything to an offline user nothing shows up