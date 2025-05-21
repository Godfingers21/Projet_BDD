import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";
import LoginRegister from "../pages/LoginRegister.vue";
import Profile from "../pages/Profile.vue";
import Catalog from "../pages/Catalog.vue";
import AboutUs from "../pages/AboutUsView.vue";
import Cart from "../pages/CartView.vue"
import Payment from "../pages/PaymentView.vue";
import Success from "../pages/SuccessView.vue";

const routes = [
  { path: "/", component: HomePage },
  { path: "/login", component: LoginRegister, meta: { hideFooter: true, hideNavbar: true } },
  { path: "/catalog", component: Catalog },
  { path: "/profile", component: Profile },
  { path: "/aboutus", component: AboutUs },
  { path: "/cart", component: Cart },
  { path: "/payment", component: Payment, meta: { hideFooter: true, hideNavbar: false }},
  { path: "/success", component: Success, meta: { hideFooter: true, hideNavbar: false } },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;