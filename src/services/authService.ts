// src/services/authService.ts
import { authApi } from "@/api/authApi";
import { clearTokens, setAccessToken } from "@/context/tokenStore";
import { AddPetRequest, PageSortParam, PrivatePetInfoPaginatedResponse, PrivatePetInfoResponse, UpdatePetRequest } from "@/types/petListing";
import { LoginRequest, RegisterRequest, UserInfoResponse, UserUpdateRequest } from "@/types/user";
import { AxiosError } from "axios";

export interface AuthResponse {
    success: boolean;
    message?: string;
    token?: string;
}

export function parseApiError(err: unknown, defaultMsg = "Something went wrong"): string {
    const error = err as AxiosError<{ message: string }>;
    if (error.response?.status === 403) {
        return "Forbidden: You don't have access";
    } else if (error.response?.data?.message) {
        return `${error.response?.status}: ${error.response.data.message}`;
    } else {
        return defaultMsg;
    }
}

export const authService = {
    async login(data: LoginRequest): Promise<AuthResponse> {
        try {
            const res = await authApi.login(data);
            const { success, message, data: payload } = res.data;

            if (success && payload?.token) {
                setAccessToken(payload.token);
            }

            return { success, message, token: payload?.token };
        } catch (err) {
            return { success: false, message: parseApiError(err) };
        }
    },

    async register(data: RegisterRequest): Promise<AuthResponse> {
        try {
            const res = await authApi.register(data);
            return { success: res.data.success, message: res.data.data };
        } catch (err) {
            return { success: false, message: parseApiError(err) };
        }
    },

    async refresh(): Promise<AuthResponse> {
        try {
            const res = await authApi.refreshToken();
            return {
                success: res.data.success,
                token: res.data.data.token
            }

        } catch (error) {
            throw new Error;
        }
    },



    async logout(): Promise<void> {
        try {
            await authApi.logout();
        } finally {
            clearTokens();
        }
    },

    async getUserInfo(): Promise<UserInfoResponse> {
        try {
            const res = await authApi.getUserInfo();

            return {
                success: true,
                message: res.data.message ?? "",
                data: res.data.data ?? null
            }
        } catch (err) {
            return {
                success: false,
                message: parseApiError(err),
            };
        }
    },


    async updateUserInfo(userData: UserUpdateRequest, imageFile?: File): Promise<UserInfoResponse> {
        try {
            const res = await authApi.updateUserInfo(userData, imageFile);
            return {
                success: true,
                message: res.data.message ?? "",
                data: res.data.data ?? null
            }
        } catch (error) {
            return {
                success: false,
                message: parseApiError(error),
            };
        }
    },
    async getUserPets(data: PageSortParam): Promise<PrivatePetInfoPaginatedResponse> {
        try {
            const res = await authApi.getUserPets(data);
            return {
                success: res.data.success,
                message: res.data.message,
                data: res.data.data,
            }
        } catch (err) {
            return { success: false, message: parseApiError(err) };
        }
    },
    async addPet(petData: AddPetRequest, imageFiles: File[]): Promise<PrivatePetInfoResponse> {
        try {
            const res = await authApi.addPetListing(petData, imageFiles);
            return {
                success: res.data.success,
                message: res.data.message,
                data: res.data.data,
            }
        } catch (error) {
            return { success: false, message: parseApiError(error) };
        }

    },
    async updatePet(petData: UpdatePetRequest, petId: number, imageFiles?: File[]): Promise<PrivatePetInfoResponse> {
        try {
            const res = await authApi.updatePetListing(petData, petId, imageFiles);
            return {
                success: res.data.success,
                message: res.data.message,
                data: res.data.data,
            }
        } catch (error) {
            return { success: false, message: parseApiError(error) };
        }

    },
    async deletePet(petId: number): Promise<PrivatePetInfoResponse> {
        try {
            const res = await authApi.deletePetListing(petId);
            return {
                success: res.data.success,
                message: res.data.message,
                data: res.data.data,
            }
        } catch (error) {
            return { success: false, message: parseApiError(error) };
        }
    },
    async getPet(petId: number): Promise<PrivatePetInfoResponse> {
        try {
            const res = await authApi.getUserPetListing(petId);
            return {
                success: res.data.success,
                message: res.data.message,
                data: res.data.data,
            }
        } catch (error) {
            return { success: false, message: parseApiError(error) };
        }
    }

};
