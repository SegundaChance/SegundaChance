import axios from "axios";
import secureLocalStorage from "react-secure-storage";

// Lê a URL pública da Vercel ou usa a localhost em desenvolvimento
const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://localhost:7299/api/";

export const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = secureLocalStorage.getItem("Token");

  if (token && typeof token === "string") {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});