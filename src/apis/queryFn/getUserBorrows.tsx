import {API_URLS} from "../url/urls";

export default async function getUserBorrows(
  user_id:number
):Promise<ApiResponse>{
  // 这里已经做过处理，user_id不会为空
    const response = await fetch(API_URLS.getUserBorrow + `${user_id}`,{
      method:"get",
    })
    if(!response.ok){
      throw new Error("Network response was not ok")
    }
    return response.json()
}