import { API_URLS } from "../url/urls"
import { http } from "../../util/http"

export function getAsks(user_id: number):Promise<Result<AskInf[]>> {
    return http.request({
      method:"GET",
      url: `${API_URLS.asks}/${user_id}`
    })
  }

  export function refuseAsks(id: number):Promise<Result<string>> {
    return http.request({
      method:"POST",
      url: `${API_URLS.asksRefuse}/${id}`
    })
  }


  export function agreeAsks(id: number):Promise<Result<string>> {
    return http.request({
      method:"POST",
      url: `${API_URLS.asksAgree}/${id}`
    })
  }