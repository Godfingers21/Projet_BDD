<template>
    <main>
        <div class="checkout-container">
            <!-- Partie Formulaire de gauche -->
            <div class="checkout-form">
            <!-- Adresse -->
            <div class="form-section">
                <h2>Adresse de livraison</h2>
                <input v-model="form.firstName" placeholder="Prénom" />
                <input v-model="form.lastName" placeholder="Nom" />
                <input v-model="form.address" placeholder="Adresse" />
                <input v-model="form.postalCode" placeholder="Code postal" />
                <input v-model="form.city" placeholder="Ville" />
                <input v-model="form.country" placeholder="Pays" />
            </div>

            <!-- Coordonnées -->
            <div class="form-section">
                <h2>Coordonnées</h2>
                <input v-model="form.email" placeholder="Email" />
                <input v-model="form.phone" placeholder="Numéro de téléphone" />
            </div>

            <!-- Facturation -->
            <div class="form-section">
                <h2>Facturation</h2>
                <label>
                <input type="checkbox" v-model="sameAsShipping" />
                L'adresse de facturation est identique à l'adresse de livraison
                </label>
                <div v-if="!sameAsShipping">
                <input v-model="form.billingAddress" placeholder="Adresse de facturation" />
                </div>
            </div>

            <!-- Paiement -->
            <div class="form-section">
                <h2>Paiement</h2>
                <input v-model="form.cardName" placeholder="Nom sur la carte" />
                <input v-model="form.cardNumber" placeholder="Numéro de carte" />
                <div class="card-details">
                <input v-model="form.cardExpiry" placeholder="MM/AA" />
                <input v-model="form.cardCVV" placeholder="CVV" />
                </div>
                <button class="button-primary" @click="submitOrder">Passer la commande</button>
            </div>
            </div>

            <!-- Partie récapitulatif de droite -->
            <div class="checkout-summary">
            <h2>Récapitulatif de la commande</h2>
            <div class="item" v-for="item in cartItems" :key="item.id">
                <img :src="item.thumbnail" alt="image du jeu" />
                <div>
                <p>{{ item.name }}</p>
                <p>{{ item.price }} CHF</p>
                </div>
            </div>
            <p class="delivery-msg">Tu bénéficies de la livraison gratuite !</p>
            <p class="total">Total : {{ total }} CHF</p>
            </div>
        </div>
    </main>
</template>

<script>
export default {
  name: "PayementView",
  data() {
    return {
      sameAsShipping: true,
      form: {
        firstName: "",
        lastName: "",
        address: "",
        postalCode: "",
        city: "",
        country: "",
        email: "",
        phone: "",
        billingAddress: "",
        cardName: "",
        cardNumber: "",
        cardExpiry: "",
        cardCVV: ""
      },
      cartItems: [
        {
          id: 1,
          name: "Catan",
          price: 39.9,
          thumbnail: "https://example.com/catan.jpg"
        }
      ]
    };
  },
  computed: {
    total() {
      return this.cartItems.reduce((sum, item) => sum + item.price, 0).toFixed(2);
    }
  },
  methods: {
    submitOrder() {
      console.log("Commande envoyée", this.form);
    }
  }
};
</script>

<style scoped>
main{
    margin-top: 100px;
}
.checkout-container {
  display: flex;
  max-width: calc(100% - 600px);
  margin: 0 auto;
  gap: 40px;
  padding: 40px 0;
}

.checkout-form {
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.form-section {
  background: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
}

.checkout-summary {
  flex: 1;
  position: sticky;
  top: 30px;
  align-self: start;
  background: #ffffff;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  max-height: calc(100vh - 60px);
  overflow: auto;
}

img {
  width: 80px;
  margin-right: 10px;
}

.card-details {
  display: flex;
  gap: 10px;
}

.button-primary {
  background-color: #4CAF50;
  color: white;
  padding: 14px;
  border-radius: 8px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  width: 100%;
}

.total {
  font-size: 18px;
  font-weight: bold;
  margin-top: 10px;
}
.delivery-msg {
  color: green;
  margin-top: 10px;
}
</style>
