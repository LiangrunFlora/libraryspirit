import { API_URLS } from "../url/urls"
import { http } from "../../util/http"

export function getAnnouncements():Promise<Result<announcementType[]>> {
    return http.request({
      method:"GET",
      url: `${API_URLS.announcements}`
    })
  }

