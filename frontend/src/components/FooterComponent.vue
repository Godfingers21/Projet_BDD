<template>
  <footer class="footer">
    <div class="footer-content">
        <div class="logo-container">
            <h1 class="logo">Kaya</h1>
        </div>
      <div class="footer-column">
        <h3>Find out more</h3>
        <ul>
          <li><a href="#">New Releases</a></li>
          <li><a href="#">Trending</a></li>
          <li><a href="#">Our Catalog</a></li>
          <li><a href="#">1v1 Games</a></li>
          <li><a href="#">Family Games</a></li>
        </ul>
      </div>

      <div class="footer-column">
        <h3>Your Account</h3>
        <ul>
          <li><a href="#">My Account</a></li>
          <li><a href="#">See My Orders</a></li>
          <li><a href="#">Track My Order</a></li>
          <li><a href="#">Preferences and settings</a></li>
        </ul>
      </div>

      <div class="footer-column">
        <h3>About Us</h3>
        <ul>
          <li><a href="#">Who are we?</a></li>
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Terms of Service</a></li>
        </ul>
      </div>

      <div class="footer-column">
        <h3>Contact Us</h3>
        <ul>
          <li><a href="mailto:help.support@kaya.com">help.support@kaya.com</a></li>
        </ul>
      </div>
    </div>

    <hr class="divider" />

    <div class="footer-bottom">
      <p>© 2025 Kaya. All rights reserved.</p>
    </div>
  </footer>
</template>

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
  font-weight: 500;
  margin-left: 50px;
}

.footer-content{
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

.footer-column a {
  text-decoration: none;
  color: white;
  transition: 0.3s;
}

.footer-column a:hover {
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
