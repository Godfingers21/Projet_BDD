<template>
  <div id="app">
    <NavBar v-if="$route.path !== '/login'" />
    <router-view />
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
export default {
  name: "App",
  components: {
    NavBar,
  },
};
</script>

<style>
html, body, #app {
  height: 100%;
  margin: 0;
  padding: 0;
}

body {
  /* Fond dégradé bleu sur toute la page */
  min-height: 100vh;
  background: linear-gradient(180deg, #0586fa 0%, #0072e3 100%);
}
#app {
  text-align: center;
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}
</style>