<template>
  <nav class="navbar">
    <h1>Kaya</h1>
    <ul>
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/catalog">Catalog</router-link></li>
      <li v-if="!isAuthenticated"><router-link to="/login">Login/Register</router-link></li>
      <li v-else><router-link to="/profile">Profile</router-link></li>
    </ul>
  </nav>
</template>

<script setup>
import { onMounted } from "vue";
import useAuth from "../composables/useAuth";
const { isAuthenticated, checkAuth } = useAuth();

onMounted(() => {
  checkAuth();
});
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 92%;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 48px;
  background: rgba(44, 62, 80, 0.85); /* Fond semi-transparent */
  border-radius: 18px;
  margin: 24px 32px 32px 32px;
  box-shadow: 0 4px 18px rgba(44, 62, 80, 0.12);
  backdrop-filter: blur(2px);
}

.navbar h1 {
  font-size: 2rem;
  color: #fff;
  letter-spacing: 2px;
  font-weight: 700;
  margin: 0;
  text-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

.navbar ul {
  list-style: none;
  display: flex;
  gap: 28px;
  margin: 0;
  padding: 0;
}

.navbar ul li {
  display: flex;
  align-items: center;
}

.navbar ul li a {
  color: #fff;
  text-decoration: none;
  font-size: 1.08rem;
  font-weight: 500;
  padding: 8px 18px;
  border-radius: 8px;
  transition: background 0.2s, color 0.2s, box-shadow 0.2s;
  box-shadow: 0 2px 8px rgba(44, 62, 80, 0.04);
}

.navbar ul li a.router-link-exact-active,
.navbar ul li a:hover {
  background: rgba(255,255,255,0.18);
  color: #ffe082;
  box-shadow: 0 4px 16px rgba(44, 62, 80, 0.10);
  text-decoration: none;
}

@media (max-width: 700px) {
  .navbar {
    flex-direction: column;
    align-items: flex-start;
    padding: 14px 12px;
    margin: 12px 8px 18px 8px;
  }
  .navbar ul {
    gap: 12px;
    margin-top: 10px;
  }
  .navbar h1 {
    font-size: 1.3rem;
  }
}
</style>