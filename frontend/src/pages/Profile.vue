<template>
  <div class="dashboard">
    <!-- Sidebar -->
    <aside class="sidebar">
      <h2>Kaya</h2>
      <ul>
        <li :class="{ active: currentView === 'profile' }" @click="currentView = 'profile'">Profile</li>
        <li :class="{ active: currentView === 'orders' }" @click="currentView = 'orders'">My Orders</li>
        <li :class="{ active: currentView === 'settings' }" @click="currentView = 'settings'">Settings</li>
        <li :class="{ active: currentView === 'privacy' }" @click="currentView = 'privacy'">Privacy Policy</li>
      </ul>
    </aside>

    <!-- Main content -->
    <section class="main-content">
      <div class="header-img-comtainer">
          <img src="../assets/" alt="Header" class="header-banner" />
      </div>
      <div v-if="currentView === 'profile'" class="profile-view">
        <div class="top-section">
          <img class="avatar" src="../assets/no-profile-photo.jpeg" alt="avatar" />
          <div class="user-details">
            <h2>{{ user.username }}</h2>
            <p>{{ user.email }}</p>
            <p class="role">Account type: {{ user.role }}</p>
          </div>
        </div>

        <div class="edit-password">
          <button @click="showPasswordForm = !showPasswordForm">
            {{ showPasswordForm ? 'Cancel' : 'Edit Password' }}
          </button>

          <form v-if="showPasswordForm" @submit.prevent="changePassword">
            <input type="password" v-model="oldPassword" placeholder="Current Password" required />
            <input type="password" v-model="newPassword" placeholder="New Password" required />
            <input type="password" v-model="confirmPassword" placeholder="Confirm New Password" required />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>

      <div v-else-if="currentView === 'orders'">
        <h2>My Orders</h2>
        <!-- Placeholder -->
      </div>

      <div v-else-if="currentView === 'settings'">
        <h2>Settings</h2>
        <!-- Placeholder -->
      </div>

      <div v-else-if="currentView === 'privacy'">
        <h2>Privacy Policy</h2>
        <!-- Placeholder -->
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from '../axiosconfig';

const user = ref({ username: '', email: '', role: '' });

const currentView = ref('profile');
const showPasswordForm = ref(false);

const oldPassword = ref('');
const newPassword = ref('');
const confirmPassword = ref('');

const fetchUser = async () => {
  const res = await axios.get('/user/me');
  user.value = {
    username: res.data.username,
    email: res.data.email,
    role: res.data.user_role === 'admin' ? 'Admin' : 'User'
  };
};

const changePassword = async () => {
  if (newPassword.value !== confirmPassword.value) {
    alert("Passwords don't match");
    return;
  }

  try {
    await axios.post('/user/change-password', {
      oldPassword: oldPassword.value,
      newPassword: newPassword.value
    });
    alert('Password changed successfully');
    showPasswordForm.value = false;
  } catch (err) {
    alert('Failed to change password');
  }
};

onMounted(fetchUser);
</script>

<style scoped>
.dashboard {
  display: flex;
  height: 100vh;
}
.sidebar {
  width: 20vw;
  background: #f2f2f2;
  padding: 30px;
  margin-top: 70px;
}
.sidebar h2 {
  margin-bottom: 30px;
}
.sidebar ul {
  list-style: none;
  padding: 0;
}
.sidebar li {
  padding: 12px;
  cursor: pointer;
}
.sidebar li.active {
  font-weight: bold;
  color: #53cf90;
}
.main-content {
  width: 80vw;
  padding: 40px;
  overflow: hidden;
}
.profile-view {
  display: flex;
  flex-direction: column;
  gap: 30px;
}
.top-section {
  display: flex;
  align-items: center;
  gap: 30px;
}
.avatar {
  width: 100px;
  height: 100px;
  border-radius: 999px;
  object-fit: cover;
  border: 2px solid #ccc;
}
.user-details h2 {
  margin: 0;
}
.role {
  color: #666;
  font-style: italic;
}
.edit-password form {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 300px;
}
.edit-password input,
.edit-password button {
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
}

.header-img-comtainer{
  width: 100%;
  height: 140px;
  display: flex;
  justify-content: center;
  align-items: center;  
  overflow: hidden;

}
.header-img-comtainer img{
  width: 100%;
  object-fit: cover;
}
</style>
