import {API_URLS} from "../url/urls";

export default async function postUBorrow(
  uBorrowData:UBorrow
): Promise<ApiResponse> {
  const jsonData = JSON.stringify(uBorrowData)
  const response = await fetch(API_URLS.postUBorrow, {
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