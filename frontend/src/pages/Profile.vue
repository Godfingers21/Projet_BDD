<template>
  <div class="dashboard">
    <!-- Sidebar -->
    <aside class="sidebar">
      <ul>
        <li :class="{ active: currentView === 'profile' }" @click="currentView = 'profile'">Profile</li>
        <li :class="{ active: currentView === 'orders' }" @click="currentView = 'orders'">My Orders</li>
        <li :class="{ active: currentView === 'settings' }" @click="currentView = 'settings'">Settings</li>
        <li @click="router.push('/privacy')">Privacy Policy</li>
      </ul>
    </aside>

    <!-- Main content -->
    <section class="main-content">
      <div class="header-img-comtainer">
          <img src="../assets/Header-catalog.jpg" alt="Header" class="header-banner" />
      </div>
      <div v-if="currentView === 'profile'" class="profile-view">
        <div class="top-section">
          <div class="user-details">
            <img class="avatar" src="../assets/no-profile-photo.jpeg" alt="avatar" />
            <div class="details">
              <h2>{{ user.username }}</h2>
            </div>
          </div> 
          <div class="row">
            <div class="user-details-info">
              
                <p class="role">Account type: {{ user.role }}</p>
                <p>Email: {{ user.email }}</p>
            </div>
            <button @click="showPasswordForm = !showPasswordForm" class="edit-btn">
              {{ showPasswordForm ? 'Cancel' : 'Edit Password' }}
            </button>
          </div>
        </div>

        <div class="edit-password">


          <form v-if="showPasswordForm" @submit.prevent="changePassword">
            <input type="password" v-model="oldPassword" placeholder="Current Password" required />
            <input type="password" v-model="newPassword" placeholder="New Password" required />
            <input type="password" v-model="confirmPassword" placeholder="Confirm New Password" required />
            <button class="submit-btn" type="submit">Submit</button>
          </form>
        </div>
      </div>
      <div v-else-if="currentView === 'orders'" class="orders-view">
        <h2>My Orders</h2>

        <div v-if="orders.length === 0">
          <p>You have no orders yet.</p>
        </div>

        <div v-else>
          <div class="order-card" v-for="order in orders" :key="order.order_id">
            <p><strong>Order #{{ order.order_num }}</strong></p>
            <p>Date: {{ new Date(order.created_at).toLocaleDateString() }}</p>
            <p>Items:</p>
            <ul>
              <li v-for="item in order.items" :key="item.boardgame_id">
                {{ item.name }} × {{ item.quantity }}
              </li>
            </ul>
              <p><strong>Total: ${{ order.total ? order.total.toFixed(2) : '0.00' }}</strong></p>
          </div>
        </div>
      </div>


      <div v-else-if="currentView === 'settings'">
        <h2>Settings</h2>
        <div class="settings-content">
          <span class="material-symbols-outlined">
handyman
</span>
          <p>Available soon !</p>
        </div>
      </div>


    </section>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import axios from '../axiosconfig';
const router = useRouter();

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

const orders = ref([]);

const fetchOrders = async () => {
  try {
    const response = await axios.get('/orders', { withCredentials: true });
    orders.value = response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
  }
};

onMounted(() => {
  fetchUser();
  fetchOrders();
});


</script>

<style scoped>
.dashboard {
  display: flex;
  min-height: 100vh;
  overflow: hidden;
}
.sidebar {
  width: 20vw;
  background: #f2f2f2;
  padding: 30px;
  position: fixed;
  top: 70px; /* ou 0 si pas de navbar */
  left: 0;
  bottom: 0;
  overflow-y: auto;
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
  margin-left: 23vw;
  width: 80vw;
  height: 100vh;
  overflow-y: auto;
}
.profile-view {
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 50px;
}
.top-section {
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 30px;
}
.avatar {
  width: 100px;
  height: 100px;
  border-radius: 999px;
  object-fit: cover;
  border: 2px solid #ccc;
}
.user-details {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 30px;
}
.row{
  display: flex;
  flex-direction: row;
  gap: 50px;
  align-items: center;
}
.user-details h2 {
  margin: 0;
}
.details{
  display: flex;
  flex-direction: column;
  align-items: start;
}
.role {
  color: #666;
  font-style: italic;
  margin: 0;
}
.edit-password{
  display: flex;
  align-items: center;
  justify-content: left;
}
.edit-password form {
  margin-left: 20px;
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

.edit-btn {
  width: 10vw;
  padding: 15px;
  background-color: #000000;
  color: white;
  border: none;
  font-weight: bold;
  border-radius: 999px;
  cursor: pointer;
}

.submit-btn {
  width: 100%;
  padding: 15px;
  background-color: #53cf90;
  color: white;
  border: none !important; /*bug d affichage a forcer */
  font-weight: bold;
  border-radius: 999px !important;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  overflow: hidden;
}

.header-img-comtainer{
  width: 100%;
  height: 180px;
  display: flex;
  justify-content: center;
  align-items: center;  
  overflow: hidden;

}
.header-img-comtainer img{
  width: 100%;
  object-fit: cover;
}

.user-details-info{
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: start;
}

.orders-view {
  padding: 40px;
}
.order-card {
  background: #f9f9f9;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
}
.order-card ul {
  list-style: none;
}

.settings-content{
  padding: 100px;
  font-size: 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: grey;

}
.material-symbols-outlined{
  font-size: 150px;
}
</style>
