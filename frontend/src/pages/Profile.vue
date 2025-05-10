<template>
  <div>
    <h2>Profile</h2>
    <button @click="handleLogout">Logout</button>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import useAuth from "../composables/useAuth";
const router = useRouter();
const { logout } = useAuth();

async function handleLogout() {
  await logout();
  router.push("/");
}
</script>