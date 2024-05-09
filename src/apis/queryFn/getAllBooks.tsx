import {API_URLS} from "../url/urls";

export default async function getAllBooks(): Promise<ApiResponse> {
  const response = await fetch(API_URLS.getAllBooks, {
    method: "get",
  });
  if (!response.ok) {
    throw new Error("Network response was not ok")
  }
  console.log(response)
  return response.json()
}
