<template>
  <div class="landing-container">
    <div class="landing-content">
      <h2>Welcome to Kaya</h2>
      <p>Your ultimate board game catalog and rating platform.</p>
    </div>
  </div>
</template>

<style>
.landing-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: none; /* Enlève tout fond spécifique ici */
  margin: 0;
  padding: 0;
}
.landing-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.landing-content h2 {
  font-size: 36px;
  margin-bottom: 10px;
}

.landing-content p {
  font-size: 18px;
}
</style>