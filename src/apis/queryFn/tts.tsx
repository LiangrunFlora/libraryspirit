import {API_URLS} from "../url/urls";

export default async function postTTS(
  ttsInfo:TTS_Info
):Promise<ApiResponse>{
  const jsonData = JSON.stringify(ttsInfo)
  const response = await fetch(API_URLS.postTTS, {
    method:"post",
    headers:{
      "content-type": "application/json"
    },
    body:jsonData
  })
  if(!response.ok){
    throw new Error("Network response was not ok")
  }
  return response.json()
}

export async function playAudio(
  filename:string
){
  const response = await fetch(API_URLS.playAudio + `/${filename}`)
  if(!response.ok){
    throw new Error("Network response was not ok")
  }
  const blob = await response.blob()
  const audioUrl = window.URL.createObjectURL(blob)
  return audioUrl
}
