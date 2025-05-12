<template>
  <main>
    <HeroSection />
  </main>
  

  <!--
  <div class="landing-container">
    <div class="overlay"></div>
    <div class="landing-content">
      <h1>Kaya</h1>
      <p class="subtitle">
        <b>Games that create <span class="highlight">memories</span>, not just winners.</b> 
      </p>
      <router-link to="/catalog" class="discover-btn">Discover</router-link>
    </div>
  </div>
  -->
</template>

<script setup>
  import HeroSection from '../components/HeroSection.vue';
  
</script>
<style scoped>
.landing-container {
  min-height: 100vh;
  width: 100vw;
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background: url('https://cdn.jsdelivr.net/gh/godfingers21/projet_bdd/frontend/src/assets/background_homepage.webp') center center/cover no-repeat;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.18);
  z-index: 1;
}

.landing-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 600px;
  margin-left: 8vw;
  margin-top: 8vh;
  /* Pour éviter d'être trop collé au bord */
}

.landing-content h1 {
  font-size: 3.2rem;
  color: #fff;
  font-family: 'Georgia', serif;
  font-weight: 400;
  margin-bottom: 0.6em;
  letter-spacing: 2px;
  text-shadow: 2px 2px 20px #000000, 2px 2px 11px rgba(0,0,0,0.68);
}

.subtitle {
  font-size: 1.4rem;
  color: #fff;
  margin-bottom: 2em;
  text-shadow: 2px 2px 20px #000000, 2px 2px 11px rgba(0,0,0,0.68);
}

.highlight {
  color: #4ad295;
}

.discover-btn {
  display: inline-block;
  padding: 0.7em 2.2em;
  border: 2px solid #fff;
  border-radius: 32px;
  background: transparent;
  color: #fff;
  font-size: 1.1rem;
  font-weight: 500;
  text-decoration: none;
  transition: background 0.2s, color 0.2s, border 0.2s;
  box-shadow: 0 2px 12px rgba(0,0,0,0.10);
  text-shadow: 0 2px 8px rgba(0,0,0,0.18);
}

.discover-btn:hover {
  background: #fff;
  color: #0586fa;
  border-color: #fff;
}

@media (max-width: 900px) {
  .landing-content {
    margin-left: 3vw;
    margin-top: 4vh;
    max-width: 90vw;
  }
}
@media (max-width: 700px) {
  .landing-content {
    margin-left: 0;
    margin-top: 2vh;
    align-items: center;
    text-align: center;
  }
  .landing-content h1 {
    font-size: 2rem;
  }
  .subtitle {
    font-size: 1rem;
  }
}
</style>