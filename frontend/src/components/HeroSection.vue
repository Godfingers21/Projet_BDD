<template>
    <section class="hero">
      <div class="hero-content">
        <h1>Kaya</h1>
        <p>Games that create <span class="highlight">memories</span>, not just winners.</p>
        <router-link to="/catalog"><button class="cta">Discover</button></router-link>
      </div>
    </section>
  </template>
  
  <style scoped>
  .hero {
    height: 100vh;
    background-image: url('https://cdn.jsdelivr.net/gh/godfingers21/projet_bdd/frontend/src/assets/background_homepage.webp'); 
    background-size: cover;
    background-position: center;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: white;
  }
  
  .hero::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4); 
    z-index: 1;
  }
  
  .hero-content {
    position: relative;
    z-index: 2;
  }
  
  .hero h1 {
    font-size: 4rem;
    margin-bottom: 1rem;
  }
  
  .hero p {
    font-size: 1.5rem;
    margin-bottom: 2rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  }
  
  .highlight {
    color: #53cf90;
  }
  
  .cta {
    padding: 0.75rem 2.5rem;
    font-size: 1rem;
    border: 3px solid white;
    border-radius: 2rem;
    background-color: #53cf9100;
    color: white;
    cursor: pointer;
    transition: 0.3s;
  }
  
  .cta:hover {
    background-color: #43b67d;
    border: 3px solid #43b67d;
  }



  </style>
  