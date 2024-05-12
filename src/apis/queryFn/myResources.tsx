import { API_URLS } from "../url/urls"
import { http } from "../../util/http"
import { getUserInfoFromSession } from "../../util/userInfo"

export function getMyResources(user_id: number):Promise<Result<myResourcesType[]>> {
    return http.request({
      method:"GET",
      url: `${API_URLS.myResources}/${user_id}`
    })
  }

  export function deleteMyResources(id: number):Promise<Result<string>> {
    return http.request({
      method:"DELETE",
      url: `${API_URLS.myResources}/${id}`
    })
  }

  export function postMyResources(book_name:string,author:string,category:string,press:string,introduction:string):Promise<Result<string>> {
    return http.request({
      method:"POST",
      url: `${API_URLS.myResources}`,
      data:{
        user_id:getUserInfoFromSession()?.user_id,
        book_name:book_name,
        author:author,
        category:category,
        press:press,
        introduction:introduction
      }
    })
  }
