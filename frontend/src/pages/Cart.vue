<template>
  <div class="cart-page-container">
    <!-- Header -->
    <div class="cart-header">
      <h1>Your Shopping Cart</h1>
      <p v-if="cartItems.length > 0">Drag items to remove or keep them in your cart</p>
      <p v-else>Your cart is empty. Visit our <router-link to="/catalog">catalog</router-link> to find games.</p>
    </div>

    <!-- Main Content -->
    <div class="cart-interactive-area">
      <!-- Trash Zone -->
      <div class="trash-zone" ref="trashZone">
        <div class="trash-container" :class="{ 'active': isTrashActive }">
          <svg class="trash-icon" viewBox="0 0 24 24">
            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
          </svg>
          <span>Drag here to remove</span>
        </div>
      </div>

      <!-- Cart Items -->
      <div class="cart-items-container">
        <div v-if="cartItems.length === 0" class="empty-cart-message">
          <svg width="120" height="120" viewBox="0 0 24 24">
            <path d="M19.5 8l-2.5-5H7L4.5 8H2v2h1.1l1.9 10h14l1.9-10H22V8h-2.5zM7.9 5h8.2l1.5 3H6.4l1.5-3zm9.6 13H6.5l-1.4-8h13.8l-1.4 8z" />
          </svg>
          <p>No items in your cart</p>
        </div>
        <transition-group name="cart-list" tag="ul" class="cart-items-list">
          <li 
            v-for="item in cartItems" 
            :key="item.id"
            class="cart-item"
            :class="{ 'is-dragging': draggedItem === item.id }"
            ref="cartItems"
            @mousedown="startDrag($event, item)"
            @touchstart="startDrag($event, item)"
          >
            <div class="cart-item-image">
              <img :src="item.image" :alt="item.name">
            </div>
            <div class="cart-item-details">
              <h3>{{ item.name }}</h3>
              <div class="cart-item-meta">
                <span class="cart-item-price">${{ item.price.toFixed(2) }}</span>
                <div class="quantity-control">
                  <button @click.stop="decrementQuantity(item)" class="quantity-btn">-</button>
                  <span class="quantity">{{ item.quantity }}</span>
                  <button @click.stop="incrementQuantity(item)" class="quantity-btn">+</button>
                </div>
              </div>
            </div>
          </li>
        </transition-group>
      </div>

      <!-- Checkout Zone -->
      <div class="checkout-zone" ref="checkoutZone">
        <div class="checkout-container" :class="{ 'active': isCheckoutActive }">
          <div class="checkout-summary">
            <h3>Order Summary</h3>
            <div class="summary-line">
              <span>Subtotal ({{ totalItems }} items)</span>
              <span>${{ subtotal.toFixed(2) }}</span>
            </div>
            <div class="summary-line">
              <span>Shipping</span>
              <span>${{ shipping.toFixed(2) }}</span>
            </div>
            <div class="summary-line">
              <span>Tax</span>
              <span>${{ tax.toFixed(2) }}</span>
            </div>
            <div class="summary-line total">
              <span>Total</span>
              <span>${{ total.toFixed(2) }}</span>
            </div>
          </div>
          <button 
            class="checkout-button" 
            :disabled="cartItems.length === 0"
            @click="proceedToCheckout"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>

    <!-- Drag Ghost Element (invisible until dragging) -->
    <div class="drag-ghost" ref="dragGhost"></div>
  </div>
</template>

<script>
import anime from 'animejs';

export default {
  name: 'CartPage',
  data() {
    return {
      cartItems: [
        { 
          id: 1, 
          name: 'Catan', 
          price: 49.99, 
          quantity: 1, 
          image: 'https://cf.geekdo-images.com/W3Bsga_uLP9kO91gZ7H8yw__itemrep/img/IzYEUm_gWFuRFOL8gQYqGm5gBCQ=/fit-in/246x300/filters:strip_icc()/pic2419375.jpg' 
        },
        { 
          id: 2, 
          name: 'Ticket to Ride', 
          price: 39.99, 
          quantity: 2, 
          image: 'https://cf.geekdo-images.com/ZWJg0dCdrWHxVnc0eFXK8w__itemrep/img/FNwSL6lMBGP4amL9yf9CH02r15U=/fit-in/246x300/filters:strip_icc()/pic38668.jpg' 
        },
        { 
          id: 3, 
          name: 'Pandemic', 
          price: 44.99, 
          quantity: 1,
          image: 'https://cf.geekdo-images.com/S3zyV8qF8uZUQzHoZGhhMA__itemrep/img/Z84V1IgMIjwObECG8xM29Qy_Rvk=/fit-in/246x300/filters:strip_icc()/pic4600321.jpg'
        }
      ],
      draggedItem: null,
      isDragging: false,
      mousePosition: { x: 0, y: 0 },
      isTrashActive: false,
      isCheckoutActive: false,
      shipping: 5.99,
      taxRate: 0.0825, // 8.25% tax rate
    };
  },
  computed: {
    subtotal() {
      return this.cartItems.reduce((total, item) => {
        return total + (item.price * item.quantity);
      }, 0);
    },
    tax() {
      return this.subtotal * this.taxRate;
    },
    total() {
      return this.subtotal + this.shipping + this.tax;
    },
    totalItems() {
      return this.cartItems.reduce((count, item) => count + item.quantity, 0);
    }
  },
  mounted() {
    // Add global mouse/touch move and up events
    window.addEventListener('mousemove', this.onDrag);
    window.addEventListener('touchmove', this.onDrag, { passive: false });
    window.addEventListener('mouseup', this.stopDrag);
    window.addEventListener('touchend', this.stopDrag);

    // Animation for cart items entry
    if (this.cartItems.length > 0) {
      anime({
        targets: '.cart-item',
        translateY: [50, 0],
        opacity: [0, 1],
        delay: anime.stagger(100),
        easing: 'spring(1, 80, 10, 0)'
      });
    }
  },
  beforeUnmount() {
    window.removeEventListener('mousemove', this.onDrag);
    window.removeEventListener('touchmove', this.onDrag);
    window.removeEventListener('mouseup', this.stopDrag);
    window.removeEventListener('touchend', this.stopDrag);
  },
  methods: {
    startDrag(event, item) {
      // Prevent default to avoid text selection
      if (event.cancelable) {
        event.preventDefault();
      }
      
      // Set the dragged item
      this.draggedItem = item.id;
      this.isDragging = true;
      
      // Get mouse/touch position
      const clientX = event.touches ? event.touches[0].clientX : event.clientX;
      const clientY = event.touches ? event.touches[0].clientY : event.clientY;
      this.mousePosition = { x: clientX, y: clientY };

      // Find the cart item element
      const itemElement = this.$refs.cartItems.find(el => 
        el.__vnode.key === item.id
      );

      if (itemElement) {
        // Get the position and dimensions
        const rect = itemElement.getBoundingClientRect();
        
        // Set up the drag ghost
        const ghost = this.$refs.dragGhost;
        ghost.innerHTML = `<div class="ghost-content">
          <img src="${item.image}" alt="${item.name}">
          <span>${item.name}</span>
        </div>`;
        
        ghost.style.width = `${rect.width}px`;
        ghost.style.height = `${rect.height}px`;
        ghost.style.left = `${clientX - rect.width / 2}px`;
        ghost.style.top = `${clientY - rect.height / 2}px`;
        ghost.classList.add('active');

        // Animation for pickup
        anime({
          targets: ghost,
          scale: [1, 1.05],
          duration: 200,
          easing: 'easeOutQuad'
        });
      }
    },
    
    onDrag(event) {
      if (!this.isDragging) return;
      
      if (event.cancelable) {
        event.preventDefault();
      }
      
      // Get current position
      const clientX = event.touches ? event.touches[0].clientX : event.clientX;
      const clientY = event.touches ? event.touches[0].clientY : event.clientY;
      
      // Move the drag ghost
      const ghost = this.$refs.dragGhost;
      ghost.style.left = `${clientX - ghost.offsetWidth / 2}px`;
      ghost.style.top = `${clientY - ghost.offsetHeight / 2}px`;
      
      // Check if over trash zone
      const trashRect = this.$refs.trashZone.getBoundingClientRect();
      this.isTrashActive = (
        clientX >= trashRect.left &&
        clientX <= trashRect.right &&
        clientY >= trashRect.top &&
        clientY <= trashRect.bottom
      );
      
      // Check if over checkout zone
      const checkoutRect = this.$refs.checkoutZone.getBoundingClientRect();
      this.isCheckoutActive = (
        clientX >= checkoutRect.left &&
        clientX <= checkoutRect.right &&
        clientY >= checkoutRect.top &&
        clientY <= checkoutRect.bottom
      );
      
      // Animate zones based on proximity
      this.animateZonesByProximity(clientX, clientY);
    },
    
    stopDrag() {
      if (!this.isDragging) return;
      
      const ghost = this.$refs.dragGhost;
      const ghostRect = ghost.getBoundingClientRect();
      const ghostCenterX = ghostRect.left + ghostRect.width / 2;
      const ghostCenterY = ghostRect.top + ghostRect.height / 2;
      
      // Check if dropped on trash
      if (this.isTrashActive) {
        this.removeItem();
        
        // Trash animation
        anime({
          targets: ghost,
          translateY: 20,
          scale: 0,
          opacity: 0,
          duration: 400,
          easing: 'easeOutQuad',
          complete: () => {
            ghost.classList.remove('active');
            ghost.innerHTML = '';
          }
        });
      } else {
        // Return animation
        anime({
          targets: ghost,
          translateY: -10,
          scale: [1.05, 0],
          opacity: [1, 0],
          duration: 300,
          easing: 'easeOutQuad',
          complete: () => {
            ghost.classList.remove('active');
            ghost.innerHTML = '';
          }
        });
      }
      
      // Reset states
      this.draggedItem = null;
      this.isDragging = false;
      this.isTrashActive = false;
      this.isCheckoutActive = false;
    },
    
    removeItem() {
      const index = this.cartItems.findIndex(item => item.id === this.draggedItem);
      if (index !== -1) {
        this.cartItems.splice(index, 1);
        
        // Notify user
        this.$nextTick(() => {
          // You could add a toast notification here
        });
      }
    },
    
    decrementQuantity(item) {
      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        // If quantity would be 0, remove the item
        this.draggedItem = item.id;
        this.removeItem();
      }
    },
    
    incrementQuantity(item) {
      item.quantity += 1;
      
      // Animation for quantity change
      const itemElement = this.$refs.cartItems.find(el => 
        el.__vnode.key === item.id
      );
      
      if (itemElement) {
        const quantityEl = itemElement.querySelector('.quantity');
        anime({
          targets: quantityEl,
          scale: [1.5, 1],
          duration: 300,
          easing: 'spring(1, 80, 10, 0)'
        });
      }
    },
    
    animateZonesByProximity(x, y) {
      // Trash zone
      const trashRect = this.$refs.trashZone.getBoundingClientRect();
      const trashDistance = Math.hypot(
        x - (trashRect.left + trashRect.width / 2),
        y - (trashRect.top + trashRect.height / 2)
      );
      
      // Checkout zone
      const checkoutRect = this.$refs.checkoutZone.getBoundingClientRect();
      const checkoutDistance = Math.hypot(
        x - (checkoutRect.left + checkoutRect.width / 2),
        y - (checkoutRect.top + checkoutRect.height / 2)
      );
      
      // Max distance for effect (in pixels)
      const maxDistance = 300;
      
      // Trash animation based on proximity
      const trashScale = this.isTrashActive 
        ? 1.2 
        : 1 + Math.max(0, 1 - trashDistance / maxDistance) * 0.1;
      
      anime({
        targets: this.$refs.trashZone.querySelector('.trash-container'),
        scale: trashScale,
        duration: 100,
        easing: 'linear'
      });
      
      // Checkout animation based on proximity
      const checkoutScale = this.isCheckoutActive 
        ? 1.1 
        : 1 + Math.max(0, 1 - checkoutDistance / maxDistance) * 0.05;
      
      anime({
        targets: this.$refs.checkoutZone.querySelector('.checkout-container'),
        scale: checkoutScale,
        duration: 100,
        easing: 'linear'
      });
    },
    
    proceedToCheckout() {
      if (this.cartItems.length === 0) return;
      
      // Animation for checkout button
      anime({
        targets: '.checkout-button',
        scale: [1, 0.95, 1],
        duration: 400,
        easing: 'easeInOutQuad',
        complete: () => {
          // Navigate to checkout
          this.$router.push('/checkout');
        }
      });
    }
  }
};
</script>

<style scoped>
.cart-page-container {
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
  font-family: 'Roboto', 'Helvetica Neue', sans-serif;
  height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
}

.cart-header {
  text-align: center;
  margin-bottom: 40px;
}

.cart-header h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
  color: #2c3e50;
  font-weight: 700;
}

.cart-header p {
  color: #7f8c8d;
  font-size: 1.1rem;
}

.cart-interactive-area {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: 20px;
  flex: 1;
  min-height: 400px;
}

/* Trash Zone */
.trash-zone {
  display: flex;
  justify-content: center;
  align-items: center;
}

.trash-container {
  width: 90%;
  height: 300px;
  background: #f8f9fa;
  border: 2px dashed #e74c3c;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #e74c3c;
  transition: all 0.3s;
  transform-origin: center;
}

.trash-container.active {
  background: rgba(231, 76, 60, 0.1);
  border-color: #c0392b;
  box-shadow: 0 0 20px rgba(231, 76, 60, 0.3);
}

.trash-icon {
  width: 60px;
  height: 60px;
  fill: #e74c3c;
  margin-bottom: 15px;
}

.trash-container span {
  font-size: 1rem;
  font-weight: 500;
}

/* Cart Items */
.cart-items-container {
  overflow-y: auto;
  padding: 10px;
  max-height: 60vh;
}

.empty-cart-message {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: #95a5a6;
}

.empty-cart-message svg {
  fill: #bdc3c7;
  margin-bottom: 20px;
}

.cart-items-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.cart-item {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  padding: 15px;
  margin-bottom: 20px;
  display: flex;
  position: relative;
  transition: transform 0.3s, opacity 0.3s, box-shadow 0.3s;
}

.cart-item:hover {
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.cart-item.is-dragging {
  opacity: 0.5;
  transform: scale(0.98);
}

.cart-item-image {
  width: 100px;
  height: 100px;
  overflow: hidden;
  border-radius: 8px;
  margin-right: 20px;
  flex-shrink: 0;
}

.cart-item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cart-item-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.cart-item-details h3 {
  font-size: 1.2rem;
  margin: 0 0 10px;
  color: #2c3e50;
}

.cart-item-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cart-item-price {
  font-size: 1.1rem;
  font-weight: 600;
  color: #2980b9;
}

.quantity-control {
  display: flex;
  align-items: center;
  user-select: none;
}

.quantity-btn {
  width: 30px;
  height: 30px;
  border: 1px solid #e0e0e0;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.2s;
}

.quantity-btn:hover {
  background: #f8f9fa;
}

.quantity {
  padding: 0 15px;
  font-weight: 600;
  font-size: 1.1rem;
}

/* Checkout Zone */
.checkout-zone {
  display: flex;
  justify-content: center;
  align-items: center;
}

.checkout-container {
  width: 90%;
  background: #f8f9fa;
  border: 2px dashed #3498db;
  border-radius: 12px;
  padding: 20px;
  color: #2980b9;
  transition: all 0.3s;
  transform-origin: center;
}

.checkout-container.active {
  background: rgba(52, 152, 219, 0.1);
  border-color: #2980b9;
  box-shadow: 0 0 20px rgba(52, 152, 219, 0.3);
}

.checkout-summary {
  margin-bottom: 20px;
}

.checkout-summary h3 {
  margin: 0 0 15px;
  font-size: 1.3rem;
  color: #2c3e50;
}

.summary-line {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 0.95rem;
  color: #7f8c8d;
}

.summary-line.total {
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #ecf0f1;
  color: #2c3e50;
}

.checkout-button {
  width: 100%;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 15px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.checkout-button:hover:not(:disabled) {
  background: #2980b9;
}

.checkout-button:disabled {
  background: #bdc3c7;
  cursor: not-allowed;
}

/* Drag Ghost */
.drag-ghost {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  pointer-events: none;
  opacity: 0;
  transform-origin: center;
  display: none;
}

.drag-ghost.active {
  display: block;
  opacity: 0.9;
}

.ghost-content {
  display: flex;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  padding: 10px;
  align-items: center;
}

.ghost-content img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 15px;
}

.ghost-content span {
  font-weight: 600;
  color: #2c3e50;
}

/* List Animations */
.cart-list-enter-active,
.cart-list-leave-active {
  transition: all 0.5s ease;
}

.cart-list-enter-from,
.cart-list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.cart-list-move {
  transition: transform 0.5s;
}

/* Responsive */
@media (max-width: 900px) {
  .cart-interactive-area {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr auto;
  }
  
  .trash-container, .checkout-container {
    height: auto;
    padding: 20px;
  }
  
  .cart-item-image {
    width: 80px;
    height: 80px;
  }
}
</style>