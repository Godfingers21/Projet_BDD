import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://kaya-3l9u.onrender.com/api", // URL de votre backend
  withCredentials: true, // Inclut les cookies dans les requêtes
});

export default axiosInstance;