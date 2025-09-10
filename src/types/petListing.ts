// ==========================
// Sorting & Pagination
// ==========================
export type SortDirection = "asc" | "desc";

export interface PageSortParam {
  page?: number | undefined;
  size?: number | undefined;
  sortField?: string | undefined;
  sortDirection?: SortDirection | undefined;
}

// ==========================
// Search & Filter Keys
// ==========================
export type SearchFilters = "name" | "type" | "breed" | "location";

export interface SearchKeys {
  name?: string;
  type?: string;
  breed?: string;
  location?: string;
}

export interface SearchPageSortParams extends SearchKeys, PageSortParam { }

export interface PetFilters {
  name?: string;
  type?: string;
  breed?: string;
  location?: string;
  adopted?: boolean;
  gender?: PetGender;
}

export interface FindPetByExampleRequest {
  name?: string;
  type?: string;
  breed?: string;
  gender?: string; 
  location?: string;
  adopted?: boolean;
  ownerEmail?: string;
}
export enum PetGender {
  Male = "MALE",
  Female = "FEMALE",
  None = ""
}
// ==========================
// Pet Requests
// ==========================
export interface AddPetRequest {
  name: string;
  type: string;
  breed?: string;
  gender?: PetGender ;
  description?: string;
  location: string;
}

export interface UpdatePetRequest {
  name?: string;
  type?: string;
  breed?: string;
  gender?: PetGender;
  description?: string;
  location?: string;
  adopted?: boolean;
}



// ==========================
// Listing Modes
// ==========================
export type ListingMode = "default" | "search" | "advancedSearch";

// ==========================
// Pet Listings (DTOs)
// ==========================
export interface PetListing {
  id: number | null | undefined;
  name: string;
  type: string;
  breed: string;
  location: string;
  gender: PetGender;
  imageUrls: string[];
  adopted: boolean;
  owner: string;
  ownerId?: number;
  description: string | null;
}

export interface PrivatePetListing {
  id: number | null | undefined;
  name: string;
  type: string;
  breed: string;
  location: string;
  gender: PetGender;
  adopted?: boolean;
  owner: string;
  description: string | null;
  imageUrls?: Array<Record<string, string>>;
  approved?: boolean;
  approvedAt?: string;
  rejectedAt?: string;
}

// ==========================
// Page Data Wrappers
// ==========================
export interface PageData {
  content: PetListing[] | null;
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

export interface PrivatePageData {
  content: PrivatePetListing[] | null;
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

// ==========================
// API Response Wrappers
// ==========================
export interface PetInfoPaginatedPublicResponse {
  success: boolean;
  message: string;
  data?: PageData;
  recordCount?: number;
}

export interface PrivatePetInfoPaginatedResponse {
  success: boolean;
  message: string;
  data?: PrivatePageData;
  recordCount?: number;
}

//single listing
export interface PetInfoResponse {
  success: boolean;
  message: string;
  data?: PetListing | null;
  recordCount?: number;
}

//single private listing
export interface PrivatePetInfoResponse {
  success: boolean;
  message: string;
  data?: PrivatePetListing | null;
  recordCount?: number;
}

// ==========================
// AutoComplete
// ==========================
export interface AutoCompleteParams {
  field: SearchFilters;
  value: string;
}
