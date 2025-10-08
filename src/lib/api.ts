import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080",
});

// (optional) bearer from localStorage if you log in elsewhere
api.interceptors.request.use((cfg) => {
  const t = localStorage.getItem("token");
  if (t) cfg.headers.Authorization = `Bearer ${t}`;
  return cfg;
});
