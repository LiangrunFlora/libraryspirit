import { API_URLS } from "../url/urls"
import { http } from "../../util/http"

export function loginByAccount(user_account:string,user_password:string): Promise<Result<User>>{
    return http.request({
      url: API_URLS.login,
      method:"POST",
      data: {
        user_account: user_account,
        user_password: user_password
      }
    })
  }