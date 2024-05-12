import { API_URLS } from "../url/urls"
import { http } from "../../util/http"
import { getUserInfoFromSession } from "../../util/userInfo"

export function postConsult(title:string,content:string):Promise<Result<string>> {
    return http.request({
      method:"POST",
      url: `${API_URLS.consults}`,
      data:{
        user_id:getUserInfoFromSession()?.user_id,
        user_name:getUserInfoFromSession()?.user_name,
        title:title,
        content:content
      }
    })
  }
