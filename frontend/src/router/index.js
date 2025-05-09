import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";
import LoginRegister from "../pages/LoginRegister.vue";
import Profile from "../pages/Profile.vue";

const routes = [
  { path: "/", component: HomePage },
  { path: "/login", component: LoginRegister },
  { path: "/catalog", component: null },
  { path: "/profile", component: Profile },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;