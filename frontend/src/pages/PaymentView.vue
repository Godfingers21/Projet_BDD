<template>
  <div class="payment-page">
    <div class="payment-container">

      <!-- Colonne Gauche : Infos utilisateur + adresse + paiement -->
      <div class="left-form">
        <h2>Personnal Informations</h2>
        <div class="form-row">
            <div class="form-group half">
                <input v-model="prenom" placeholder="First Name" required />
            </div>
            <div class="form-group half">
                <input v-model="nom" placeholder="Last Name" required />
            </div>
        </div>
        <div class="form-group">
          <input v-model="email" type="email" placeholder="Email" required readonly />
        </div>

        <hr />

        <h3>Shipping Address</h3>
        <div class="form-group">
            <input v-model="address.rue" placeholder="Street Name" required />

        </div>
        <div class="form-row">
          <div class="form-group half">
            <input v-model="address.numero" placeholder="Street Number" required />
          </div>
          <div class="form-group half">
            <input v-model="address.ville" placeholder="City" required />
          </div>
        </div>



        <div class="form-row">
          <div class="form-group third">
            <input v-model="address.code_postal" maxlength="5" placeholder="Postal Code" required />
          </div>
          <div class="form-group third">
            <input v-model="address.region" placeholder="State" required />
          </div>
          <div class="form-group third">
            <input v-model="address.pays" placeholder="Country" required />
          </div>
        </div>

        <hr />

        <h3>Select payment method</h3>
        <div class="payment-options">
          <label><input type="radio" value="card" v-model="paymentMethod" /> Credit or Debit Card</label>
          <label><input type="radio" value="paypal" v-model="paymentMethod" /> PayPal</label>
          <label><input type="radio" value="klarna" v-model="paymentMethod" /> Klarna</label>
        </div>

        <div v-if="paymentMethod === 'card'" class="card-payment">
          <h3>Add Card</h3>

          <div class="form-group">
                <input v-model="card" maxlength="19" @input="formatCardNumber" placeholder="•••• •••• •••• 1234" required />
          </div>
          <div class="form-row">
            <div class="form-group half">
                <input v-model="card_exp" @input="formatCardDate" placeholder="MM/YY"/>             
            </div>
            <div class="form-group half">
                <input v-model="card_cvv" maxlength="3" placeholder="CVV" />      
            </div>
          </div>
            <div class="form-group">
                <input v-model="card_name" maxlength="40" placeholder="Cardholder Name"/>
            </div>
        </div>

        <div v-else class="coming-soon">
          <p><strong>Available soon!</strong></p>
        </div>


        <button v-if="paymentMethod === 'card'" class="submit-button" @click="submitOrder">
            Place Order
        </button>
      </div>

      <!-- Colonne Droite : Récapitulatif -->
      <div class="right-summary">
        <h2>Order Summary</h2>
        <div class="summary-item" v-for="item in cart" :key="item.boardgame_id">
        <div class="summary-image-container">
          <img :src="item.image" alt="" class="summary-image" />
        </div>
          <div class="item-info">
            <div class="info1">
            <p><strong>{{ item.name }}</strong></p>
            <p>${{ (item.quantity * item.price).toFixed(2) }}</p>
            </div>
            <div class="info2">
            <p>× {{ item.quantity }}</p>
            </div>
          </div>
        </div>
        <div class="summary-info">
            <div class="summary-line">
            <span>Subtotal</span>
            <span>${{ getSubtotal() }}</span>
            </div>
            <div class="summary-line">
            <span>Shipping</span>
            <span>$4.50</span>
            </div>
            <div class="summary-line">
            <span>Tax (20%)</span>
            <span>${{ getTax() }}</span>
            </div>
            <div class="summary-total">
            <span>Total</span>
            <span>${{ getTotal() }}</span>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from '../axiosconfig';

export default {
  data() {
    return {
      cart: [],
      nom: '',
      prenom: '',
      email: '',
      card: '',
      paymentMethod: 'card', // valeur par défaut pour afficher la carte
      card_name: '',  
      card_exp: '',
      card_cvv: '',
      address: {
        numero: '',
        rue: '',
        ville: '',
        code_postal: '',
        region: '',
        pays: ''
      }
    };
  },
  async mounted() {
    this.cart = JSON.parse(localStorage.getItem("cart") || "[]");
    await this.fetchUserInfo();

  },
  methods: {
    async fetchUserInfo() {
        try {
        const response = await axios.get("/user/me");
        this.email = response.data.email;
        } catch (error) {
        console.error("Erreur lors de la récupération de l'email :", error);
        }
    },
    formatCardDate() {
        let val = this.card_exp.replace(/\D/g, ''); // Supprime tout ce qui n'est pas chiffre

        if (val.length >= 3) {
        val = val.slice(0, 2) + '/' + val.slice(2, 4);
        }

        this.card_exp = val.slice(0, 5); // Bloque à 5 caractères
    },
    formatCardNumber() {
        let digits = this.card.replace(/\D/g, ''); // Supprime tous les caractères non numériques
        digits = digits.substring(0, 16); // Limite à 16 chiffres
        let formatted = '';
        for (let i = 0; i < digits.length; i += 4) {
          if (i > 0) formatted += ' ';
          formatted += digits.substring(i, i + 4);
        }
        this.card = formatted;
    },


    getSubtotal() {
      return this.cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
    },
    getTax() {
      const subtotal = parseFloat(this.getSubtotal());
      const shipping = 4.5;
      return ((subtotal + shipping) * 0.2).toFixed(2);
    },
    getTotal() {
      const subtotal = parseFloat(this.getSubtotal());
      const shipping = 4.5;
      const tax = parseFloat(this.getTax());
      return (subtotal + shipping + tax).toFixed(2);
    },
    async submitOrder() {
      try {
        const last4 = this.card.slice(-4);
        const response = await axios.post('/orders', {
          nom: this.nom,
          prenom: this.prenom,
          last4_card: last4,
          address: this.address,
          cart_items: this.cart
        });

        alert(`Commande passée avec succès ! Numéro: ${response.data.order_num}`);

        localStorage.setItem("last_order_num", response.data.order_num);

        localStorage.removeItem("cart");
        this.$router.push("/success");
      } catch (err) {
        alert("Erreur lors de la commande");
        console.error(err);
      }
    }
  }
};
</script>

<style scoped>
.payment-container {
  display: flex;
  margin: 100px 240px;
  gap: 40px;
}
.left-form, .right-summary {
  width: 50%;
  background: #fff;
  padding: 30px;
  border-radius: 20px;
}
.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.form-row .form-group,
.form-row-perso-info .form-group {
  flex: 1; 
}
.form-row .form-group.third {
  flex: 1;
  max-width: calc(33.33% - 7px);
}
.form-row .form-group.half {
  flex: 1;
  max-width: calc(50% - 7px);
}

input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
}
.submit-button {
  width: 100%;
  padding: 15px;
  background-color: #53cf90;
  color: white;
  border: none;
  font-weight: bold;
  border-radius: 999px;
  cursor: pointer;
}
.summary-item {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
  border-bottom: 1px solid #e0e0e0;
  padding: 5px 0;

}
.summary-image-container{
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
}
.summary-image {
  width: 100%;
  object-fit: contain;
}
.summary-line, .summary-total {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  font-size: 1rem;
}
.summary-total {
  font-weight: bold;
  font-size: 1.2rem;
  margin-top: 25px;
}

.form-row{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 10px;
}
.payment-options{
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 10px;
    padding-left: 20px ;
}

.card-payment {
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 10px 20px;
  margin: 30px 0;
  text-align: left;
}

.coming-soon{
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 200px;
    font-size: 1.5rem;
    color: #53cf90;
}

.item-info{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
}
.item-info .info1{
    text-align: left;
    text-justify: left;
    max-width: 75%;
}
.summary-info{
    margin-top: 50px ;
}
</style>
