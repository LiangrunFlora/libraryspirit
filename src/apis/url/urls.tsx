const BASE_URL = "http://127.0.0.1:5000";

export const API_URLS = {
  getAllBooks: `${BASE_URL}/books`,
  getBooksByCategory: `${BASE_URL}/books/category`,
  login:`${BASE_URL}/login`,
  asks:`${BASE_URL}/asks`,
  asksAgree:`${BASE_URL}/asksAgree`,
  asksRefuse:`${BASE_URL}/asksRefuse`,
  borrows:`${BASE_URL}/borrows`,
  borrowsHistory:`${BASE_URL}/borrowsHistory`,
  getCommentInfoByBookId: `${BASE_URL}/commentInfo`,
  getChatResponse: `${BASE_URL}/chat`,
  getUserBorrow: `${BASE_URL}/userBorrow`,
  postBorrow: `${BASE_URL}/borrows`,
  getAllULibrary: `${BASE_URL}/myResources`,
  postUBorrow: `${BASE_URL}/uBorrow`,
  postTTS: `${BASE_URL}/audio`,
  playAudio: `${BASE_URL}/audio/wav`
};
