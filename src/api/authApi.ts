// src/api/authApi.ts
import { AddPetRequest, PageSortParam, UpdatePetRequest } from "@/types/petListing";
import axiosInstance from "./axios";
import { LoginRequest, RegisterRequest, UserUpdateRequest } from "@/types/user";

export const authApi = {
  /****************************************************/
  //AUTH ACTIONS API
  /****************************************************/

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

  updateUserInfo: (userData: UserUpdateRequest, imageFile?: File) => {
    const formData = new FormData();

    formData.append(
      "userData", new Blob([JSON.stringify(userData)], { type: "application/json" })
    );

    if (imageFile) {
      formData.append("imageUrl", imageFile);
    }
    return axiosInstance.patch("/user/me", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    })


  },


  /****************************************************/
  //PRIVATE PET LISTINGS API
  /****************************************************/


  getUserPets: (data: PageSortParam) => {
    return axiosInstance.get("/user/me/pets", {
      params: {
        page: data.page ?? 0,
        size: data.size ?? 20,
        sortField: data.sortField ?? "name",
        sortDirection: data.sortDirection ?? "asc",

      }
    });
  },

  addPetListing: (petData: AddPetRequest, imageFiles: File[]) => {
    const formData = new FormData();
    formData.append(
      "petData", new Blob([JSON.stringify(petData)], { type: "application/json" })
    );
    imageFiles.forEach((file) => (
      formData.append("images", file)
    ));
    return axiosInstance.post("/user/me/pets", formData, { headers: { "Content-Type": "multipart/form-data" } });

  },

  updatePetListing: (petData: UpdatePetRequest, petId: number, imageFiles?: File[]) => {
    const formData = new FormData();
    formData.append(
      "petData", new Blob([JSON.stringify(petData)], { type: "application/json" })
    );
    if (imageFiles) {
      imageFiles.forEach((file) => (
        formData.append("images", file)
      ));
    }
    return axiosInstance.put(`/user/me/pets/${petId}`, formData, { headers: { "Content-Type": "multipart/form-data" } });
  },

  deletePetListing: (petId: number) => {
    return axiosInstance.delete(`/user/me/pets/${petId}`);
  },

  getUserPetListing: (petId: number) => {
    return axiosInstance.get(`/user/me/pets/${petId}`);
  },
  markPetAdoptionStatus: (petId: number, adopted: boolean) => {
    return axiosInstance.patch(`/user/me/pets/${petId}`, { adopted });
  },



  /****************************************************/
  //CONVERSATIONS API
  /****************************************************/



  getUserConversations: () => {
    return axiosInstance.get("/chat/getMyConversations");

  },
  getSingleConversation: (conversationId?: number) => {
    return axiosInstance.get(`/chat/get/${conversationId}`);
  },

  startConversation: (user1Id: number, user2Id: number, petId: number) => {
    return axiosInstance.post("/chat/start",null, {
      params: {
        user1Id: user1Id,
        user2Id: user2Id,
        petId: petId
      }
    })
  },

  deleteConversation: (conversationId: number) => {
    return axiosInstance.delete(`/chat/delete/${conversationId}`)
  },

  getMessagesFromConversation: (conversationId: number) => {
    return axiosInstance.get(`/chat/${conversationId}/messages`)
  },

};
