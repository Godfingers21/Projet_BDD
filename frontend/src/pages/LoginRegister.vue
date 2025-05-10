<template>
  <div class="auth-container">
    <div class="auth-box">
      <div class="auth-toggle">
        <span :class="{ active: isLogin }" @click="isLogin = true">Login</span>
        <span :class="{ active: !isLogin }" @click="isLogin = false">Register</span>
      </div>
      <form @submit.prevent="isLogin ? handleLogin() : handleRegister()">
        <h2>{{ isLogin ? 'Login' : 'Register' }}</h2>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <div v-if="!isLogin" class="form-group">
          <label for="username">Username</label>
          <input type="text" id="username" v-model="username" required />
        </div>
        <button type="submit">{{ isLogin ? 'Login' : 'Register' }}</button>
        <p class="error-message" v-if="errorMessage">{{ errorMessage }}</p>
      </form>
      <router-link to="/" class="back-to-home">← Back to Homepage</router-link>
    </div>
  </div>
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
    },
  },
};
</script>

<style>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f4;
}

.auth-box {
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: center;
}

.auth-toggle {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.auth-toggle span {
  cursor: pointer;
  font-weight: bold;
  color: #aaa;
}

.auth-toggle span.active {
  color: #007bff;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 5px;
  font-size: 14px;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.error-message {
  color: red;
  margin-top: 10px;
  font-size: 14px;
}

.back-to-home {
  display: block;
  margin-top: 20px;
  color: #007bff;
  text-decoration: none;
  font-size: 14px;
}

.back-to-home:hover {
  text-decoration: underline;
}
</style>