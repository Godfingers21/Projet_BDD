<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="logo-container">
        <h1 class="logo">Kaya</h1>
      </div>

      <div class="footer-column">
        <h3>Find out more</h3>
        <ul>
          <li><router-link to="/catalog">New Releases</router-link></li>
          <li><router-link to="/catalog">Trending</router-link></li>
          <li><router-link to="/catalog">Our Catalog</router-link></li>
          <li><router-link to="/catalog">1v1 Games</router-link></li>
          <li><router-link to="/catalog">Family Games</router-link></li>
        </ul>
      </div>

      <div class="footer-column">
        <h3>Your Account</h3>
        <ul>
          <li><router-link to="/profile">My Account</router-link></li>
          <li><router-link to="/profile">See My Orders</router-link></li>
          <li><router-link to="/profile">Track My Order</router-link></li>
          <li><router-link to="/profile">Preferences and settings</router-link></li>
        </ul>
      </div>

      <div class="footer-column">
        <h3>About Us</h3>
        <ul>
          <li><router-link to="/aboutus">Who are we?</router-link></li>
          <li><router-link to="/privacy">Privacy Policy</router-link></li>
          <li><router-link to="/privacy">Terms of Service</router-link></li>
        </ul>
      </div>

      <div class="footer-column">
        <h3>Contact Us</h3>
        <ul>
          <li><a href="mailto:help.support@kaya.com">help.support@kaya.com</a></li>
          <li><a href="mailto:help.support@kaya.com">+33 1 45 67 89 10</a></li>
        </ul>
      </div>
    </div>

    <hr class="divider" />

    <div class="footer-bottom">
      <p>© 2025 Kaya. All rights reserved.</p>
    </div>
  </footer>
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
.footer {
  background-color: #181818;
  color: white;
  padding: 3rem 2rem 2rem;
  font-size: 0.95rem;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 2rem;
}

.footer-content .logo {
  font-size: 3rem;
  font-weight: bolder;
  margin-left: 50px;
}

.footer-content {
  text-align: left;
}

.footer-column h3 {
  color: #53cf90;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.footer-column ul {
  list-style: none;
  padding: 0;
}

.footer-column li {
  margin-bottom: 0.5rem;
}

.footer-column a,
.footer-column router-link {
  text-decoration: none;
  color: white;
  transition: 0.3s;
}

.footer-column a:hover,
.footer-column router-link:hover {
  color: #53cf90;
}

.divider {
  margin: 2rem 0 1rem;
  border: none;
  height: 1px;
  background-color: #333;
}

.footer-bottom {
  text-align: center;
  font-size: 0.85rem;
  color: #aaa;
}
</style>
