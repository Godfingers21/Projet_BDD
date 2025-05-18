<template>
  <div id="profile">
    <button @click="handleLogout" class="Btn">
    <div class="sign"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>
    <div class="text">Logout</div>
    </button>
    <h1 class ="prof" id="myprofile"> My profile </h1>
    <p class="prof" ><strong>Username : </strong><span id="username">{{ user.username }}</span></p>
    <p class="prof" ><strong>Email :</strong> <span id="email">{{ user.email }}</span></p>
    <p class="prof" ><strong>Role :</strong> <span id="role">{{ user.role }}</span></p>
    <button @click="isEditing = true" class="Btn2" id="Editbuttton" >Edit
      <svg class="svg2" viewBox="0 0 512 512">
        <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path></svg>
    </button>
    <div v-if="isEditing" class="edit-form">
      <form @submit.prevent="submitEdit()">
        <div>
          <label for="edit-username">Username:</label>
          <input
            id="edit-username"
            type="text"
            v-model="editUser.username"
            required
          />
        </div>
        <div>
          <label for="edit-email">Email:</label>
          <input
            id="edit-email"
            type="email"
            v-model="editUser.email"
            required
          />
        </div>
        <div>
          <label for="edit-role">Role:</label>
          <select id="edit-role" v-model="editUser.role">
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div>
          <label for="edit-password">Password:</label>
          <input
            id="edit-password"
            type="password"
            v-model="editUser.password"
            required
          />
        </div>
        <div class="form-buttons">
          <button type="submit" class="Btn form-save">
            <svg class="icon" viewBox="0 0 24 24">
              <path fill="white" d="M17,3A2,2 0 0,1 19,5V19A2,2 0 0,1 17,21H7A2,2 0 0,1 5,19V5A2,2 0 0,1 7,3H17M12,5A2,2 0 0,0 10,7A2,2 0 0,0 12,9A2,2 0 0,0 14,7A2,2 0 0,0 12,5M17,17V15H7V17H17Z" />
            </svg>
            Save
          </button>

          <button type="button" @click="isEditing = false" class="Btn form-cancel">
            <svg class="icon" viewBox="0 0 24 24">
              <path fill="white" d="M12,2A10,10 0 1,0 22,12A10,10 0 0,0 12,2M13.41,12L17.71,7.71L16.29,6.29L12,10.59L7.71,6.29L6.29,7.71L10.59,12L6.29,16.29L7.71,17.71L12,13.41L16.29,17.71L17.71,16.29L13.41,12Z" />
            </svg>
            Cancel
          </button>
        </div>

      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import useAuth from "../composables/useAuth";
const editUser = ref({
  user_id: "",
  username: "",
  email: "",
  role: "",
  password: ""
});
const router = useRouter();
const { logout, getUser, updateUser } = useAuth();
const isEditing = ref(false);
const user = ref({
  user_id: "",
  username: "",
  email: "",
  role: "",
});

async function fetchUser() {
  const userData = await getUser();
  user.value = {
    ...userData,
    role: userData.user_role === "admin" 
      ? "Administrateur" 
      : "User" 
  };
}

async function handleLogout() {
  await logout();
  router.push("/");
}

async function submitEdit() {
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
}

onMounted(() => {
  fetchUser();
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
#profile {
  background-image: url('../assets/background_profile.png');
  height: 100%;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  font-family: 'Georgia', serif;
}

/*CSS DU PROFILE*/

.prof {
  background-image: linear-gradient(rgba(44, 62, 80, 0.85), rgba(44, 62, 80, 0.85));
  background-size: 100% 0px;
  background-repeat: no-repeat;
  background-position: 100% 0%;
  transition: background-size .7s, background-position .5s ease-in-out;
  color:white;
  text-shadow: 2px 2px 20px #000000, 2px 2px 11px rgba(0,0,0,0.68);
}
#myprofile {
  font-size: 5em;
}

.prof:hover {
  background-size: 100% 100%;
  background-position: 0% 100%;
  transition: background-position .7s, background-size .5s ease-in-out;
  text-shadow: 0 2px 8px rgba(0,0,0,0.08);
  border-radius: 10px;
}
/*CSS DU PROFILE*/

p {
  text-align: left;
  color:white;
  font-size: 3rem;
  text-shadow: 2px 2px 20px #000000, 2px 2px 11px rgba(0,0,0,0.68);
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
    margin-top: 8%;
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
/*CSS DU BOUTON*/

/*CSS DU BOUTON EDIT*/
/* From Uiverse.io by vinodjangid07 */ 
.Btn2 {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100px;
  height: 40px;
  border: none;
  padding: 0px 20px;
  background-color: rgba(44, 62, 80, 0.85);
  color: white;
  font-weight: 500;
  cursor: pointer;
  border-radius: 10px;
  box-shadow: 5px 5px 0px rgba(44, 62, 80, 0.85);
  transition-duration: .3s;
  margin-left: 90%;
}

.svg2 {
  width: 13px;
  position: absolute;
  right: 0;
  margin-right: 20px;
  fill: white;
  transition-duration: .3s;
}

.Btn2:hover {
  color: transparent;
}

.Btn2:hover svg {
  right: 43%;
  margin: 0;
  padding: 0;
  border: none;
  transition-duration: .3s;
}

.Btn2:active {
  transform: translate(3px , 3px);
  transition-duration: .3s;
  box-shadow: 2px 2px 0px rgba(9, 13, 16, 0.85);
}
#Editbuttton {
  font-size: 1em;
  font-family: 'Georgia', serif;
  }
/*CSS DU BOUTON EDIT*/

/*CSS DU FORMULAIRE*/
.edit-form {
  background-color: rgba(44, 62, 80, 0.85);
  border-radius: 12px;
  padding: 2rem;
  margin: 2rem auto;
  width: 60%;
  box-shadow: 0 8px 20px rgba(0,0,0,0.4);
  font-family: 'Georgia', serif;
  color: white;
}

.edit-form div {
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
}

.edit-form label {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.edit-form input,
.edit-form select {
  padding: 0.8rem;
  border-radius: 8px;
  border: none;
  font-size: 1rem;
  font-family: 'Georgia', serif;
  background-color: rgba(255, 255, 255, 0.95);
  color: #2c3e50;
  transition: box-shadow 0.3s ease;
}

.edit-form input:focus,
.edit-form select:focus {
  outline: none;
  box-shadow: 0 0 5px #3498db;
}

.form-buttons {
  display: flex;
  justify-content: space-between; /* Align buttons side by side */
  margin-top: 0px;
  gap: 10px; /* Add spacing between buttons */
}

.Btn.form-save {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #27ae60;
  font-size: 1rem;
  font-family: 'Georgia', serif;
  position: relative;
  overflow: hidden;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  transition: all 0.3s ease;
  margin-top: 0px;
}

.Btn.form-save .text {
  position: absolute;
  opacity: 0;
  font-size: 1rem;
  font-family: 'Georgia', serif;
  color: white;
  transition: opacity 0.3s ease;
}

.Btn.form-save:hover {
  background-color: #2ecc71;
  transform: scale(1.05);
  box-shadow: 0 0 10px rgba(46, 204, 113, 0.6);
  width: 140px;
  border-radius: 30px;
}

.Btn.form-save:hover .text {
  opacity: 1;
}

.Btn.form-cancel {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #c0392b;
  font-size: 1rem;
  font-family: 'Georgia', serif;
  position: relative;
  overflow: hidden;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  transition: all 0.3s ease;
  margin-top: 0px;
}

.Btn.form-cancel .text {
  position: absolute;
  opacity: 0;
  font-size: 1rem;
  font-family: 'Georgia', serif;
  color: white;
  transition: opacity 0.3s ease;
}

.Btn.form-cancel:hover {
  background-color: #e74c3c;
  transform: scale(1.05);
  box-shadow: 0 0 10px rgba(231, 76, 60, 0.6);
  width: 140px;
  border-radius: 30px;
}

.Btn.form-cancel:hover .text {
  opacity: 1;
}

.Btn.form-save:active,
.Btn.form-cancel:active {
  transform: scale(0.95);
}

/* Icon inside button */
.Btn svg.icon {
  width: 40px;
  height: 40px;
  fill: white;
}


/*CSS DU FORMULAIRE*/

</style>
