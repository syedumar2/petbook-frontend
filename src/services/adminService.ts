import { adminApi } from "@/api/adminApi";
import { ApiResponse, PageResponse, PetActionsRequest, UserDetailsResponse } from "@/types/admin";
import { PageSortParam, PetInfoResponse, PrivatePetInfoResponse, PrivatePetListing } from "@/types/petListing";
import { parseApiError } from "./authService";


export const adminService = {

    async getApprovedPets(pageParams: PageSortParam): Promise<ApiResponse<PageResponse<PrivatePetListing>>> {
        try {
            const res = await adminApi.getApprovedPets(pageParams);
            return {
                success: true,
                message: res.data.message ?? "",
                timestamp: new Date().toISOString(),
                data: res.data.data ?? null,
                recordCount: res.data.data?.totalElements ?? 0
            }

        } catch (err) {
            return {
                success: false,
                message: parseApiError(err),
                timestamp: new Date().toISOString(),
                data: null,
                recordCount: 0
            };
        }
    },
    async getUnapprovedPets(pageParams: PageSortParam): Promise<ApiResponse<PageResponse<PrivatePetListing>>> {
        try {
            const res = await adminApi.getUnapprovedPets(pageParams);
            return {
                success: true,
                message: res.data.message ?? "",
                timestamp: new Date().toISOString(),
                data: res.data.data ?? null,
                recordCount: res.data.data?.totalElements ?? 0
            }

        } catch (err) {
            return {
                success: false,
                message: parseApiError(err),
                timestamp: new Date().toISOString(),
                data: null,
                recordCount: 0
            };
        }
    },
    async getUsers(pageParams: PageSortParam): Promise<ApiResponse<PageResponse<UserDetailsResponse>>> {
        try {
            const res = await adminApi.getAllUsers(pageParams);
            return {
                success: true,
                message: res.data.message ?? "",
                timestamp: new Date().toISOString(),
                data: res.data.data ?? null,
                recordCount: res.data.data?.totalElements ?? 0
            }

        } catch (err) {
            return {
                success: false,
                message: parseApiError(err),
                timestamp: new Date().toISOString(),
                data: null,
                recordCount: 0
            };
        }
    },

    async getBlackListedUsers(pageParams: PageSortParam): Promise<ApiResponse<PageResponse<UserDetailsResponse>>> {
        try {
            const res = await adminApi.getBlacklistedUsers(pageParams);
            return {
                success: true,
                message: res.data.message ?? "",
                timestamp: new Date().toISOString(),
                data: res.data.data ?? null,
                recordCount: res.data.data?.totalElements ?? 0
            }

        } catch (err) {
            return {
                success: false,
                message: parseApiError(err),
                timestamp: new Date().toISOString(),
                data: null,
                recordCount: 0
            };
        }
    },

    async approvePets(data: PetActionsRequest): Promise<ApiResponse<PrivatePetInfoResponse[]>> {
        try {
            const res = await adminApi.approvePet(data);
            return {
                success: true,
                message: res.data.message ?? "",
                timestamp: new Date().toISOString(),
                data: res.data.data ?? null,
                recordCount: res.data.data?.totalElements ?? 0
            }
        } catch (err) {
            return {
                success: false,
                message: parseApiError(err),
                timestamp: new Date().toISOString(),
                data: null,
                recordCount: 0
            };

        }
    },
    async rejectPets(data: PetActionsRequest): Promise<ApiResponse<PrivatePetInfoResponse[]>> {
        try {
            const res = await adminApi.rejectPet(data);
            return {
                success: true,
                message: res.data.message ?? "",
                timestamp: new Date().toISOString(),
                data: res.data.data ?? null,
                recordCount: res.data.data?.totalElements ?? 0
            }
        } catch (err) {
            return {
                success: false,
                message: parseApiError(err),
                timestamp: new Date().toISOString(),
                data: null,
                recordCount: 0
            };

        }
    },
    async blackListUser(userId: number, reason: string): Promise<ApiResponse<string | null>> {
        try {
            const res = await adminApi.blackListUser(userId, reason);
            return {
                success: true,
                message: res.data.message ?? "",
                timestamp: new Date().toISOString(),
                data: res.data.data ?? null,
                recordCount: res.data.data?.totalElements ?? 0
            }
        } catch (err) {
            return {
                success: false,
                message: parseApiError(err),
                timestamp: new Date().toISOString(),
                data: null,
                recordCount: 0
            };

        }
    },
    async whiteListUser(userId: number): Promise<ApiResponse<string | null>> {
        try {
            const res = await adminApi.whiteListUser(userId);
            return {
                success: true,
                message: res.data.message ?? "",
                timestamp: new Date().toISOString(),
                data: res.data.data ?? null,
                recordCount: res.data.data?.totalElements ?? 0
            }
        } catch (err) {
            return {
                success: false,
                message: parseApiError(err),
                timestamp: new Date().toISOString(),
                data: null,
                recordCount: 0
            };

        }
    },

    async getPets(page: PageSortParam): Promise<ApiResponse<PageResponse<PetInfoResponse>>> {
        try {
            const res = await adminApi.getAllPets(page);
            return {
                success: true,
                message: res.data.message ?? "",
                timestamp: new Date().toISOString(),
                data: res.data.data ?? null,
                recordCount: res.data.data?.totalElements ?? 0
            }

        } catch (err) {
            return {
                success: false,
                message: parseApiError(err),
                timestamp: new Date().toISOString(),
                data: null,
                recordCount: 0
            };
        }

    },
}