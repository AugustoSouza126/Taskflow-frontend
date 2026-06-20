import axios from "axios";

const api = axios.create({
  baseURL: "https://taskflow-api-zytv.onrender.com",
});

export default api;