import {API_URLS} from "../url/urls";
import {red} from "@mui/material/colors";

export default async function getChatResponse(
  ask_content:string
):Promise<ApiResponse>{
  const response = await fetch(API_URLS.getChatResponse + `/${ask_content}`,{
    method:"get",
  })
  if(!response.ok){
    throw new Error("Network response was not ok")
  }
  console.log(response)
  return response.json()
}