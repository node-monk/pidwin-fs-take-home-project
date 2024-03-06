import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5555" });
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const login = (formData) => API.post("/api/user/login", formData);
export const signUp = (formData) => API.post("/api/user/signup", formData);
export const changePassword = (formData) =>
  API.post("/api/user/changePassword", formData);

export const coinTossPlay = (formData) =>
  API.post("/api/games/coin-toss/play", formData);
export const coinTossWinLosses = (formData) =>
  API.get("/api/games/coin-toss/history", formData);
export const refreshRewards = () => API.get("/api/user/rewards", {});
