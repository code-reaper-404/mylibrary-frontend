import axios from "axios";
import config from "./../config/config";

const apiClient = axios.create({
  baseURL: config.BASE_API_URL,
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: true
});

export const registerUser = async (userData) => {
  const res = await apiClient.post("auth/signup", userData);
  return res;
};

export const loginUser = async (credentials) => {
  const res = await apiClient.post("auth/login", credentials);
  return res;
};

export const logoutUser = async () => {
  const res = await apiClient.post("auth/logout");
  return res;
};

export const checkAuth = async () => {
  const res = await apiClient.get("auth/check-auth");
  return res;
};

export const dashBoardData = async () => {
  const res = await apiClient.get("library/get-dashboard-count");
  return res;
};

export const bookShelfApi = async () => {
  const res = await apiClient.get("library/get-book");
  return res;
};

export const getBookById = async (id) => {
  const res = await apiClient.get(`library/get-book/${id}`);
  return res;
};

export const wishlistApi = async () => {
  const res = await apiClient.get("library/get-wishlist");
  return res;
};

export const getGenre = async () => {
  const res = await apiClient.get("library/get-genre");
  return res;
};

export const addGenre = async (data) => {
  const res = await apiClient.post("library/add-genre", data);
  return res;
};

export const addBooktoSehlf = async (data) => {
  const res = await apiClient.post("library/add-book", data);
  return res;
};

export const updateBook = async (data,id) => {
  const res = await apiClient.put(`library/edit-book/${id}`, data);
  return res;
};

export const deleteBook = async (id) => {
  const res = await apiClient.delete(`library/delete-book/${id}`);
  return res;
};

export const getNotes = async () => {
  const res = await apiClient.get("library/get-note");
  return res;
};

export const addNote = async (data) => {
  const res = await apiClient.post("library/add-note", data);
  return res;
};

export const updateNote = async (data,id) => {
  const res = await apiClient.put(`library/edit-note/${id}`, data);
  return res;
};

export const deleteNote = async (id) => {
  const res = await apiClient.delete(`library/delete-note/${id}`);
  return res;
};

export const getHistory = async () => {
  const res = await apiClient.get("history/");
  return res;
};

export const getUserProfile = async () => {
  const res = await apiClient.get("auth/get-user");
  return res;
};

export const updateUser = async (data) => {
  const res = await apiClient.put(`auth/update-user`, data);
  return res;
};


export const updatePassword = async (data) => {
  const res = await apiClient.put(`auth/reset-password`, data);
  return res;
};