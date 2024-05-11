import {API_URLS} from "../url/urls";

export default async function getCommentInfoByBookId(
  book_id: number
): Promise<ApiResponse>{
  const response = await fetch(API_URLS.getCommentInfoByBookId + `/${book_id}`,{
    method:"get",
  })
  if (!response.ok){
    throw new Error("Network response was not ok")
  }
  return response.json()
}
