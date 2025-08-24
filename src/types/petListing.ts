export interface PageSortParam {
  page?: number;
  size?: number;
  sortField?: string;
  sortDirection?: SortDirection;
}
export interface SearchPageSortParams extends SearchKeys, PageSortParam { }

export type SortDirection = "asc" | "desc";
export type ListingMode = "default" | "search" |"advancedSearch";
export type SearchFilters = "name" | "type" | "breed" | "location"
export interface SearchKeys {
  name?: string | undefined;
  type?: string | undefined;
  breed?: string | undefined;
  location?: string | undefined;
}


export interface PetFilters {
  name?: string;
  type?: string;
  breed?: string;
  location?: string;
  adopted?: boolean;
}

export interface FindPetByExampleRequest {
  name?: string;
  type?: string;
  breed?: string;
  location?: string;
  adopted?: boolean;
  ownerEmail?: string;
}

export interface PetInfoPaginatedPublicResponse {
  success: boolean;
  message: string;
  data?: PageData;
  recordCount?: number;



}


//Marked for deprecation
export interface PetInfoSearchResponse {
  success: boolean;
  message: string;
  data?: PetListing[] | null;
  recordCount?: number;
}
export interface PetInfoResponse {
  success: boolean;
  message: string;
  data?: PetListing | null;
  recordCount?: number;
}



export type PetListing = {
  id: number | null | undefined;
  name: string;
  type: string;
  breed: string;
  location: string;
  imageUrls: string[];
  adopted: boolean;
  owner: string;
  description: string | null;
};

export type PageData = {
  content: PetListing[] | null;
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

export interface AutoCompleteParams  {
  field: SearchFilters;
  value: string;

}