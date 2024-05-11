import { API_URLS } from "../url/urls"
import { http } from "../../util/http"

export function getBorrows(user_id: number):Promise<Result<BookCirculateType[]>> {
    return http.request({
      method:"GET",
      url: `${API_URLS.borrows}/${user_id}`
    })
  }

  export function deleteBorrows(id: number):Promise<Result<string>> {
    return http.request({
      method:"DELETE",
      url: `${API_URLS.borrows}/${id}`
    })
  }

  export function returnBorrows(id: number):Promise<Result<string>> {
    return http.request({
      method:"PUT",
      url: `${API_URLS.borrows}/${id}`
    })
  }