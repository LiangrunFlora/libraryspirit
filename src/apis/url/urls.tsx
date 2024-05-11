const BASE_URL = "";

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
  getChatResponse: `${BASE_URL}/chat`
};
