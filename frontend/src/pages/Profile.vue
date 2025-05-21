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
              {{ showPasswordForm ? 'Cancel' : 'Edit' }}
            </button>
          </div>
        </div>

        <button @click="handleLogout" class="Btn">
          <div class="sign"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>
          <div class="text">Logout</div>
        </button>

        <div class="edit-password">


          <form v-if="showPasswordForm" @submit.prevent="changeProfile">
            <input type="email" v-model="editUser.email" placeholder="New Email" required />
            <input type="text" v-model="editUser.username" placeholder="New Username" required/>
            <input type="password" v-model="editUser.password" placeholder="New Password" required />
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
import useAuth from "../composables/useAuth";
const { logout, getUser, updateUser } = useAuth();

const user = ref({ user_id: '', username: '', email: '', role: '', password: '' });
const editUser = ref({ user_id: '', username: '', email: '', role: '', password: '' });
const currentView = ref('profile');
const showPasswordForm = ref(false);
const confirmPassword = ref('');

async function fetchUser() {
  const userData = await getUser();
  user.value = {
    ...userData,
    role: userData.user_role === "admin" 
      ? "Administrateur" 
      : "User" 
  };
};

async function handleLogout() {
  await logout();
  alert("Goodbye "+ user.value.username + " !"); 
  router.push("/");
}

/*async function submitEdit() {
  try {
    editUser.value.user_id = user.value.user_id;
    await updateUser(editUser.value);
    alert("Profile updated successfully!");
    isEditing.value = false;
    fetchUser();
  } catch (error) {
    console.error("Error updating profile:", error);
    alert("Failed to update profile.");
  }
}*/
async function changeProfile() {
  try {
    if (editUser.value.password !== confirmPassword.value) {
      alert("Passwords do not match! : pass1 = " + editUser.value.password + " pass2 = " + confirmPassword.value +  "email = " + editUser.value.email);
      return;
    }
    editUser.value.user_id = user.value.user_id;
    editUser.value.role = user.value.role;
    await updateUser(editUser.value);
    alert("Profile updated successfully!");
    showPasswordForm.value = false;
    fetchUser();
  } catch (error) {
    console.error("Error updating profile:", error);
    alert("Failed to update profile.");
  }
}

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

/*CSS DU BOUTON*/
  /* From Uiverse.io by vinodjangid07 */ 
 
  .Btn {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 60px; /* Increased width */
    height: 60px; /* Increased height */
    border: none;
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition-duration: .3s;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.199);
    background-color: rgb(255, 65, 65);
    margin-left: 90%; /* Align the button to the right */
  }

  /* plus sign */
  .sign {
    width: 100%;
    transition-duration: .3s;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .sign svg {
    width: 20px; /* Increased size */
  }

  .sign svg path {
    fill: white;
  }
  /* text */
  .text {
    position: absolute;
    right: 0%;
    width: 0%;
    opacity: 0;
    color: white;
    font-size: 1.4em; /* Slightly larger font size */
    font-weight: 600;
    transition-duration: .3s;
  }
  /* hover effect on button width */
  .Btn:hover {
    width: 140px; /* Adjusted width for hover */
    border-radius: 40px;
    transition-duration: .3s;
  }

  .Btn:hover .sign {
    width: 30%;
    transition-duration: .3s;
    padding-left: 5px;
  }
  /* hover effect button's text */
  .Btn:hover .text {
    opacity: 1;
    width: 70%;
    transition-duration: .3s;
    padding-right: 10px;
  }
  /* button click effect*/
  .Btn:active {
    transform: translate(2px ,2px);
  }
</style>
