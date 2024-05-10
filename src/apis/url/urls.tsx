const BASE_URL = "http://127.0.0.1:5000";

export const API_URLS = {
  getAllBooks: `${BASE_URL}/books`,
  getBooksByCategory: `${BASE_URL}/books/category`,
  getCommentInfoByBookId: `${BASE_URL}/commentInfo`,
  getChatResponse: `${BASE_URL}/chat`
};
