import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";
import LoginRegister from "../pages/LoginRegister.vue";
import Profile from "../pages/Profile.vue";
import Catalog from "../pages/Catalog.vue";
import AboutUs from "../pages/AboutUsView.vue";
import Cart from "../pages/CartView.vue"
const routes = [
  { path: "/", component: HomePage },
  { path: "/login", component: LoginRegister, meta: { hideFooter: true } },
  { path: "/catalog", component: Catalog },
  { path: "/profile", component: Profile },
  { path: "/aboutus", component: AboutUs },
  { path: "/cart", component: Cart }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;