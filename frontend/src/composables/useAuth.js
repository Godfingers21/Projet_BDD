import { ref } from "vue";
import axios from "../axiosconfig"; // Adjust the path as necessary

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

function getUser() {
  return axios.get("/user/me").then((response) => response.data);
}

function updateUser(userData) {
  return axios.put("/user/update", userData).then((response) => response.data);
}
export default function useAuth() {
  return { isAuthenticated, checkAuth, logout, getUser, updateUser };
}