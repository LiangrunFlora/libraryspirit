import { API_URLS } from "../url/urls"
import { http } from "../../util/http"

export function getBorrowsHistory(user_id: number):Promise<Result<BookHistoryType[]>> {
    return http.request({
      method:"GET",
      url: `${API_URLS.borrowsHistory}/${user_id}`
    })
  }

  export function deleteBorrowsHistory(id: number):Promise<Result<string>> {
    return http.request({
      method:"DELETE",
      url: `${API_URLS.borrows}/${id}`
    })
  }
  