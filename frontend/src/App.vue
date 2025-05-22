<template>
  <div id="app">
    <NavBar v-if="!hideNavbar" />
    <router-view />
    <FooterComponent v-if="!hideFooter" />
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
  computed: {
    hideFooter() {
      return this.$route.meta.hideFooter === true;
    },
    hideNavbar() {
      return this.$route.meta.hideNavbar === true || this.$route.path === '/login';
    }
  }
};
</script>


<style>
html, body, #app {
  height: 100%;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

body {
  background: #fff;
}

#app {
  text-align: center;
  font-family: Arial, sans-serif;
  min-height: 100vh;
}
</style>
