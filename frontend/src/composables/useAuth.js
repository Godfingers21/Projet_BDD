import { ref } from "vue";
import axios from "../axiosConfig"; // Adjust the path as necessary

const isAuthenticated = ref(false);

async function checkAuth() {
  try {
    await axios.get("/user/me");
    isAuthenticated.value = true;
  } catch {
    isAuthenticated.value = false;
  }
}

function logout() {
  return axios.post("/auth/logout").finally(() => {
    isAuthenticated.value = false;
  });
}

export default function useAuth() {
  return { isAuthenticated, checkAuth, logout };
}