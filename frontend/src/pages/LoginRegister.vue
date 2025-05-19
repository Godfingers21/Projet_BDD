<template>
  <main>
    <!-- Section formulaire -->
    <div class="form-section">
      
      <div class="form-wrapper">
        <div class="logo-container">
          <router-link to="/"><h1 class="logo">Kaya</h1></router-link>
        </div>
        <h2>{{ isLogin ? 'Log In' : 'Create Your Account' }}</h2>

        <p class="form-subtitle">
          {{ isLogin ? 'Welcome back! Please log in.' : 'Fill in the details to register' }}
        </p>

        <form @submit.prevent="isLogin ? handleLogin() : handleRegister()">
          <div v-if="!isLogin" class="input-box">
            <input type="text" placeholder="Create a username" v-model="username" required />
          </div>
          <div class="input-box">
            <input type="email" placeholder="Your email address" v-model="email" required />
          </div>
          <div class="input-box">
            <input type="password" placeholder="Create a password" v-model="password" required />
          </div>
          <div v-if="!isLogin" class="input-box">
            <input
              type="password"
              placeholder="Confirm your password"
              v-model="confirmPassword"
              required
            />
          </div>

          <button class="main-button" type="submit">{{ isLogin ? 'Log In' : 'Register' }}</button>

          <p class="toggle-text">
            {{ isLogin ? "Don't have an account?" : "Already have an account?" }}
            <span @click="isLogin = !isLogin">{{ isLogin ? "Register" : "Log In" }}</span>
          </p>

          <p class="error-message" v-if="errorMessage">{{ errorMessage }}</p>
        </form>
      </div>
    </div>

    <!-- Section image -->
    <div class="image-section">
      <img src="../assets/boardgame-photo-login.jpg" alt="Boardgame scene" />
    </div>
  </main>
</template>

<script>
import axios from "../axiosconfig";

export default {
  data() {
    return {
      isLogin: true,
      email: "",
      password: "",
      username: "",
      errorMessage: "",
      confirmPassword: "",
    };
  },

  methods: {
    async handleLogin() {
      try {
        const response = await axios.post("/auth/login", {
          email: this.email,
          password: this.password,
        });
        alert("Login successful!");
        this.$router.push("/"); // Redirect to landing page
      } catch (error) {
        this.errorMessage = error.response?.data?.message || "Login failed.";
      }
    },
    async handleRegister() {
      if (this.password !== this.confirmPassword) {
        this.errorMessage = "Passwords do not match.";
        return;
      }
      try {
        await axios.post("/auth/register", {
          email: this.email,
          password: this.password,
          username: this.username,
        });
        alert("Registration successful! Please login.");
        this.isLogin = true;
      } catch (error) {
        this.errorMessage = error.response?.data?.message || "Registration failed.";
      }
    }
  },
  watch: {
    isLogin(newVal) {
      this.errorMessage = "";
      this.confirmPassword = "";
      this.email = "";
      this.password = "";
      this.username = "";
    }
  }

};
</script>

<style scoped>
main {
  display: flex;
  height: 100vh;
}

.form-section {
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #fff;
}

.form-wrapper {
  width: 80%;
  max-width: 400px;
  padding: 2rem;
  border-radius: 12px;
  box-sizing: border-box;
}

.form-wrapper h2 {
  font-size: 28px;
  margin-bottom: 0.5rem;
}

.form-subtitle {
  font-size: 14px;
  color: #666;
  margin-bottom: 2rem;
}

.input-box {
  margin-bottom: 1rem;
}

input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 14px;
  box-sizing: border-box;
}

.main-button {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 9999px;
  background-color: #53cf90; 
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;
}

.main-button:hover {
  background-color: #43b67d;
}

.toggle-text {
  margin-top: 1rem;
  font-size: 14px;
  color: #555;
}

.toggle-text span {
  color: #53cf90;
  cursor: pointer;
  font-weight: bold;
  margin-left: 5px;
}

.error-message {
  color: red;
  margin-top: 10px;
  font-size: 14px;
}

.image-section {
  width: 50%;
  height: 100%;
  overflow: hidden;
}

.image-section img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

a{
  text-decoration: none;
}
.logo{
  color:#53cf90;
  font-size: 2.8rem;
}
</style>
