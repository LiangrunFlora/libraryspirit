import {API_URLS} from "../url/urls";

export default async function postBorrows(
  borrowData: Borrow
): Promise<ApiResponse> {
  const jsonData = JSON.stringify(borrowData)
  const response = await fetch(API_URLS.postBorrow, {
    method:"post",
    headers: {
      "content-type": "application/json"
    },
    body: jsonData,
  })
  if(!response.ok){
    throw new Error("Network response was not ok")
  }
  return response.json()
}