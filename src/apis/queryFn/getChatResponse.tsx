import {API_URLS} from "../url/urls";

export default async function getChatResponse(
  ask_content:string
):Promise<ApiResponse>{
  const response = await fetch(API_URLS.getChatResponse + `/${ask_content}`,{
    method:"get",
  })
  if(!response.ok){
    throw new Error("Network response was not ok")
  }
  return response.json()
}