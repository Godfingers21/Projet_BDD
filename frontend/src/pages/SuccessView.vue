<template>
  <div class="success-page">
    <span class="material-symbols-outlined">
    task_alt
    </span>
    <h1>🎉 Thank you for your order!</h1>
    <p>Your order has been successfully placed.</p>
    <p v-if="orderNum">Order Number: #<strong>{{ orderNum }}</strong></p>

    <div class="actions">
      <router-link to="/catalog" class="btn">Continue Shopping</router-link>
      <router-link to="/profile" class="btn">View My Orders</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orderNum: localStorage.getItem("last_order_num") || null
    };
  }
}
</script>

<style scoped>
.success-page {
  height: 100vh;
  max-width: 700px;
  margin: auto;
  text-align: center;
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
h1 {
  font-size: 2.5rem;
}
p {
  font-size: 1.2rem;
  margin-bottom: 20px;
}
.actions{
    margin-top:20px ;
}
.actions .btn {
  margin: 10px;
  padding: 12px 24px;
  border: none;
  border-radius: 999px;
  background-color: #53cf90;
  color: white;
  text-decoration: none;
  font-weight: bold;
  cursor: pointer;
}

.material-symbols-outlined{
    font-size: 8.5rem;
    color: #53cf90;

}
</style>
