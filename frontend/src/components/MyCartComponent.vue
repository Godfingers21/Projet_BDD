<template>
  
    <main>
        <div class="content-container">
            <div class="mycart-component" v-if="cart.length">
              <h2>My cart</h2>
              
              <div class="cart-item" v-for="item in cart" :key="item.boardgame_id">
                <div class="cart-item-left">
                  <div class="img-container">
                    <img :src="item.image" :alt="item.name" />
                  </div>

                  <div class="details-item">
                    <div class="info-name">
                      <span class="label">Name: </span>
                      <span>{{ item.name }}</span>
                    </div>
                    <div class="info-cate">
                      <span class="label">Category: </span>
                      <span>{{ item.category }}</span>
                    </div>
                  </div>
                </div>
                <div class="details-order">
                  <div class="info-price">
                    <span class="item-price">${{ item.price }}</span>
                  </div>
                  <div class="quantity-wrapper">
                    <button v-if="item.quantity > 1" @click="removeItem(item)">−</button>
                    <button v-else class="delete-btn" @click="deleteItem(item)">
                      <span class="material-symbols-outlined">
                        delete
                      </span>
                    </button>

                    <span>{{ item.quantity }}</span>

                    <button @click="addItem(item)">+</button>
                  </div>
                  
                </div>
                
              </div>
            </div>
            <div class="mycart-component" v-else>
              <h2>My cart</h2>
              <div class="else-container">
                <span class="material-symbols-outlined">
                air
                </span>
                  <h3>Your cart is empty</h3>
              </div>
            </div>
            <div class="payment-component">
              <h2>Summary</h2>

              <div class="line">
                <span>Subtotal</span>
                <span>${{ getSubtotal() }}</span>
              </div>

              <div class="line">
                <span>Estimated Shipping & Handling</span>
                <span>${{ getShipping() }}</span> <!--Pareil pour tout le monde meme en alaska-->
              </div>

              <div class="line">
                <span class="span-taxe">Taxes</span>
                <span class="span-taxe">${{ getTax() }}</span>
              </div>

              <div class="divider-line"></div>

              <div class="line total">
                <span>Total</span>
                <span>${{ getTotalWithTax() }}</span>
              </div>

              <router-link to="/payment"><button class="checkout-btn">Checkout</button></router-link>
            </div>

        </div>
    </main>
</template>

<script>
export default {
  data() {
    return {
      cart: []
    };
  },
  mounted() {
    this.loadCart();
  },
  methods: {
    loadCart() {
      this.cart = JSON.parse(localStorage.getItem("cart") || "[]");
    },
    saveCart() {
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
    addItem(item) {
      const existing = this.cart.find(i => i.boardgame_id === item.boardgame_id);
      if (existing) {
        existing.quantity++;
        this.saveCart();
      }
    },
    removeItem(item) {
      const existing = this.cart.find(i => i.boardgame_id === item.boardgame_id);
      if (existing && existing.quantity > 1) {
        existing.quantity--;
      } else {
        this.cart = this.cart.filter(i => i.boardgame_id !== item.boardgame_id);
      }
      this.saveCart();
    },
    deleteItem(item) {
      this.cart = this.cart.filter(i => i.boardgame_id !== item.boardgame_id);
      this.saveCart();
    },
    getSubtotal() {
      return this.cart
        .reduce((acc, item) => acc + item.price * item.quantity, 0)
        .toFixed(2);
    },
    getTax() { //vous aimez ? c'est francais (bruh)
      const subtotal = parseFloat(this.getSubtotal());
      const shipping = parseFloat(this.getShipping());
      const tax = (subtotal + shipping) * 0.2;
      return tax.toFixed(2);
    },
    getTotalWithTax() {
      const subtotal = parseFloat(this.getSubtotal());
      const shipping = parseFloat(this.getShipping());
      const tax = parseFloat(this.getTax());
      return (subtotal + shipping + tax).toFixed(2);
    },

    getShipping() {
      return this.cart.length > 0 ? 4.5.toFixed(2) : (0).toFixed(2);
    }
  }
}
</script>

<style scoped>
main{
    min-height: 100vh;
    margin: 0 160px;
}
.content-container{
    margin: 120px 0;
    display: flex;
    flex-direction: row;
    align-items: top;
}
.mycart-component{
    width: 50vw;
    margin-right: 20px;

}   

.mycart-component h2{
  text-align: left;
  margin-left: 20px;
}
.cart-item{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 10px 8px;
    padding: 10px;
    border-bottom: 1px solid #e5e5e5;
}
.cart-item-left{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.details-item{
  display: flex;
  flex-direction: column;
  text-align: left;
  margin: 0 20px;
  justify-content: left;
}

.details-item .info{
  text-align: left;
}
.info-name{
  font-weight: bold;
}
.info-cate{
  color: gray;
}
.img-container {
  width: 120px;
  height: 120px;
  flex-shrink: 0;
  border-radius: 8px;
  overflow: hidden;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.img-container img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.quantity-wrapper {
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  margin-left: 10px;
  border-radius: 999px;
  overflow: hidden;
  padding: 4px 10px;
  font-size: 1.1rem;
  background-color: white;
  box-shadow: 0 1px 4px rgba(0,0,0,0.05);
  gap: 10px;
}

.quantity-wrapper button {
  background: none;
  border: none;
  font-size: 1.2rem;
  font-weight: bold;
  padding: 5px 10px;
  cursor: pointer;
  color: #000000;
  border-radius: 999px;
}
.quantity-wrapper button:hover{
  background-color: rgb(192, 192, 192);
}
.quantity-wrapper span {
  font-weight: 500;
}

.delete-btn {
  color: #e74c3c;
}

.delete-btn:hover {
  color: #c0392b;
}


.material-symbols-outlined { /*la poubelle*/ 
  font-variation-settings:
  'FILL' 0,
  'wght' 350,
  'GRAD' 0,
  'opsz' 20
}

.info-price{
  margin-bottom: 10px;
}
.item-price{
  font-weight: bolder;
}

/*-----------------------------------Payement-------------------------------------------------*/
.payment-component {
  height: auto;
  width: 30vw;
  background-color: #fff;
  padding: 30px;
  border-radius: 12px;
  font-family: Arial, sans-serif;
}

.payment-component h2 {
  text-align: left;
  font-size: 1.5rem;
  margin-bottom: 20px;
}

.line {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  font-size: 1rem;
}

.line.total {
  font-weight: bold;
  font-size: 1.2rem;
  margin-top: 20px;
}

.divider-line {
  border-bottom: 1px solid #ddd;
  margin: 20px 0;
}

.checkout-btn {
  width: 100%;
  background-color: #53cf90;
  color: white;
  border: none;
  padding: 15px;
  border-radius: 999px;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 20px;
  transition: background 0.3s;
}

.checkout-btn:hover {
  background-color: #3cb877;
}

.span-taxe{
  color: grey;
}

.else-container{
  color: lightgrey

}
.else-container .material-symbols-outlined{
  margin: 60px 0px 30px 0px;
  font-size: 150px;
}
</style>