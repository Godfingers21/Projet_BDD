<template>
  <nav class="navbar">
    <div class="nav-left">
      <router-link to="/"><h1>Kaya</h1></router-link>
    </div>
    
    <div class="nav-center">
      <router-link to="/" class="nav-link">Home</router-link>
      <router-link to="/catalog" class="nav-link">New Releases</router-link>
      <router-link to="/catalog" class="nav-link">Catalog</router-link>
      <router-link to="/aboutus" class="nav-link">About Us</router-link>

    </div>
    <div class="nav-right">
      <router-link to="/login" v-if="!isAuthenticated" class="nav-link">Login/Register</router-link>
      <router-link to="/profile" v-else class="nav-link">Profile</router-link>
      <router-link to="/cart"><span class="material-symbols-outlined">shopping_bag</span></router-link>
    </div>
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
  font-family: 'Segoe UI', sans-serif;
  position: fixed;
  z-index: 100; /*au dessus de n importe quel element*/
  margin: 0;
  padding: 1rem 0;
  width:100vw;
  height: 40px;
  color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgb(255, 255, 255); 
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

a{
  text-decoration: none;
}
.nav-left {
  margin-left: 60px ;
}
.navbar .nav-left h1 {
  font-size: 1.7rem;
  font-weight: 500;
  color: black;
}

.navbar .nav-link{
  margin: 0 1rem;
  font-size: 1.1rem;
  text-decoration: none;
  color: black;
  font-weight: 500;
  
}
.navbar .nav-link:hover {
  transition: 0.5s;
  color: #53cf90;
}

.nav-center{
  display: flex;
  align-items: center;
}
.nav-right{
  margin-right: 60px;
  display: flex;
  align-items: center;
}

.material-symbols-outlined {
  color: #53cf90;
  font-variation-settings:
  'FILL' 0,
  'wght' 500,
  'GRAD' 0,
  'opsz' 24
}

.material-symbols-outlined:hover {
  transition: 0.5s;
  color: #227b4e;
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