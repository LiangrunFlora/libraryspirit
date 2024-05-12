const BASE_URL = "";

export const API_URLS = {
  getAllBooks: `${BASE_URL}/books`,
  getBooksByCategory: `${BASE_URL}/books/category`,
  login:`${BASE_URL}/login`,
  asks:`${BASE_URL}/asks`,
  asksAgree:`${BASE_URL}/asksAgree`,
  asksRefuse:`${BASE_URL}/asksRefuse`,
  borrows:`${BASE_URL}/borrowsForUser`,
  borrowsHistory:`${BASE_URL}/borrowsHistory`,
  myResources:`${BASE_URL}/myResources`,
  otherResources:`${BASE_URL}/otherResources`,
  announcements:`${BASE_URL}/announcements`,
  consults:`${BASE_URL}/consults`,
  getCommentInfoByBookId: `${BASE_URL}/commentInfo`,
  getChatResponse: `${BASE_URL}/chat`
};
