import { PageSortParam } from "@/types/petListing"
import axiosInstance, { axiosAdminInstance } from "./axios"
import { PetActionsRequest } from "@/types/admin"


export const adminApi = {
    getApprovedPets: (data: PageSortParam) => {
        return axiosAdminInstance.get("/pets/approved", {
            params: {
                page: data.page ?? 0,
                size: data.size ?? 20,
                sortField: data.sortField ?? "name",
                sortDirection: data.sortDirection ?? "asc",

            }
        })
    },

    getUnapprovedPets: (data: PageSortParam) => {
        return axiosAdminInstance.get("/pets/unapproved", {
            params: {
                page: data.page ?? 0,
                size: data.size ?? 20,
                sortField: data.sortField ?? "name",
                sortDirection: data.sortDirection ?? "asc",

            }
        })
    },
    getAllUsers: (data: PageSortParam) => {
        return axiosAdminInstance.get("/users", {
            params: {
                page: data.page ?? 0,
                size: data.size ?? 20,
                sortField: data.sortField ?? "createdAt",
                sortDirection: data.sortDirection ?? "asc",

            }
        })
    },
    getBlacklistedUsers: (data: PageSortParam) => {
        return axiosAdminInstance.get("/users/blacklisted", {
            params: {
                page: data.page ?? 0,
                size: data.size ?? 20,
                sortField: data.sortField ?? "createdAt",
                sortDirection: data.sortDirection ?? "asc",

            }
        })
    },

    approvePet: (data: PetActionsRequest) => {
        return axiosAdminInstance.post("/pets/approve", data);
    },
    rejectPet: (data: PetActionsRequest) => {
        return axiosAdminInstance.post("/pets/reject", data);
    },

    blackListUser: (userId: number, reason: string) => {
        return axiosAdminInstance.post(`/users/blacklist/${userId}`, {
            message: reason
        });
    },
    whiteListUser: (userId: number) => {
        return axiosAdminInstance.post(`/users/whitelist/${userId}`);
    },

    getAllPets: (data: PageSortParam) => {
        return axiosAdminInstance.get(`/pets`, {
            params: {
                page: data.page ?? 0,
                size: data.size ?? 20,
                sortField: data.sortField ?? "createdAt",
                sortDirection: data.sortDirection ?? "asc",

            }
        })
    }



}