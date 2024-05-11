import {API_URLS} from "../url/urls";

export default async function getULibrary():Promise<ApiResponse>{
  const response = await fetch(API_URLS.getAllULibrary,{
    method:"get"
  })
  if(!response.ok){
    throw new Error("Network response was not ok")
  }
  return response.json()
}