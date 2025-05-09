import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001/api", // URL de votre backend
  withCredentials: true, // Inclut les cookies dans les requêtes
});

export default axiosInstance;