import { PhotoResponse } from "./photo-response";

export interface PhotoPagination {
  photos: {
    page: number,
    pages: number,
    perpage: number,
    photo: PhotoResponse[],
    total: number
  }
}
