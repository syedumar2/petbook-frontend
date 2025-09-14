export interface ApiResponse<T> {
    success: boolean;
    message: string;
    timestamp: string;
    data: T | null;
    recordCount: number;
}

export interface PageResponse<T> {
    content: T[];
    pageNumber: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
    last: boolean;
}

export interface UserDetailsResponse {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    location: string;
    profileImageUrl: string;
    role: string;
    createdAt: string;
    blacklistedAt?: string;
}

export interface PetActionsRequest {
    ids: number[];
}

export enum Role {
    USER = "USER",
    ADMIN = "ADMIN"


}