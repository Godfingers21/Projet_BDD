<template>
  <div id="app">
    <NavBar v-if="$route.path !== '/login' && !$route.meta.hideNavbar " />
    <router-view />
    <FooterComponent v-if="!$route.meta.hideFooter"/>
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import FooterComponent from './components/FooterComponent.vue';

export default {
  name: "App",
  components: {
    NavBar,
    FooterComponent,
  },
};
</script>

<style>
html, body, #app {
  height: 100%;
  margin: 0;
  padding: 0;
  overflow-x: hidden; /* Empêche le scroll horizontal */
}

body {
  background: #fff;
  overflow-x: hidden; /* Empêche le scroll horizontal */
}

#app {
  text-align: center;
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  min-height: 100vh;
  overflow-x: hidden; /* Empêche le scroll horizontal */
}
</style>