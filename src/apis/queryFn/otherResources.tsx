import { API_URLS } from "../url/urls"
import { http } from "../../util/http"

export function getOtherResources(user_id: number):Promise<Result<otherResourcesType[]>> {
    return http.request({
      method:"GET",
      url: `${API_URLS.otherResources}/${user_id}`
    })
  }

// 取消借书
export function deleteOtherResources(id: number):Promise<Result<string>> {
    return http.request({
      method:"DELETE",
      url: `${API_URLS.otherResources}/${id}`
    })
}

// 还书
export function returnOtherResources(id: number):Promise<Result<string>> {
    return http.request({
      method:"PUT",
      url: `${API_URLS.otherResources}/${id}`
    })
}