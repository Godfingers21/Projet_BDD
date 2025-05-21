<template>
  <img src="../assets/header-catalog-image.jpg" alt="Header" class="header-banner" />
  <div class="catalog-container">
    <div class="catalog-header">
      <h1 class="catalog-title">Board Games Collection</h1>

      <!-- Filter & Sort Button --> 

      <div class="filter-button" @click="toggleFilters">
        <span>Filter & Sort</span>
        <i class="filter-icon">{{ filtersVisible ? '▲' : '▼' }}</i>
      </div>
    </div>

    <div class="filters-panel" :class="{ 'visible': filtersVisible }">
      <div class="filters-grid">
        <div class="filter-group">
          <label>Sort by</label>
          <select v-model="selectedSort" @change="resetAndFetch">
            <option value="name">Name (A-Z)</option>
            <option value="ranked">Popularity</option>
            <option value="year">Release Year</option>
          </select>
        </div>
        
        <div class="filter-group">
          <label>Category</label>
          <select v-model="selectedCategory" @change="resetAndFetch">
            <option value="">All Categories</option>
            <option v-for="cat in categories" :key="cat.category_id" :value="cat.category_id">
              {{ cat.category_name }}
            </option>
          </select>
        </div>
        
        <div class="filter-group">
          <label>Publisher</label>
          <select v-model="selectedPublisher" @change="resetAndFetch">
            <option value="">All Publishers</option>
            <option v-for="pub in publishers" :key="pub.publisher_id" :value="pub.publisher_id">
              {{ pub.publisher_name }}
            </option>
          </select>
        </div>
        
        <div class="filter-group">
          <label>Number of Players</label>
          <input
            type="number"
            v-model="selectedPlayers"
            min="1"
            placeholder="Any"
            @change="resetAndFetch"
          />
        </div>
      </div>
      
      <button class="reset-btn" @click="resetFilters">Reset All Filters</button>
    </div>

    <!-- Active Filters -->

    <div class="active-filters" v-if="hasActiveFilters">
      <span>Active filters:</span>
      <div class="filter-tag" v-if="selectedCategory">
        Category: {{ getCategoryName(selectedCategory) }}
        <span class="remove-filter" @click="removeFilter('category')">×</span>
      </div>
      <div class="filter-tag" v-if="selectedPublisher">
        Publisher: {{ getPublisherName(selectedPublisher) }}
        <span class="remove-filter" @click="removeFilter('publisher')">×</span>
      </div>
      <div class="filter-tag" v-if="selectedPlayers">
        Players: {{ selectedPlayers }}
        <span class="remove-filter" @click="removeFilter('players')">×</span>
      </div>
      <div class="filter-tag">
        Sort: {{ getSortName(selectedSort) }}
        <span class="remove-filter" @click="resetSort">↺</span>
      </div>
    </div>


    <!-- Loading Spinner -->

    <div v-if="loading" class="loading-container">
      <div class="loading-spinner"></div>
      <p>Loading games...</p>
    </div>

    <div v-else-if="boardgames.length === 0" class="no-results">
      <p>No games found matching your criteria</p>
      <button class="reset-btn" @click="resetFilters">Reset All Filters</button>
    </div>

    <!-- Game Cards -->

    <div v-else class="games-grid">
      <div
        v-for="game in boardgames"
        :key="game.boardgame_id"
        class="game-card"
        @click="showGameDetails(game)"
        @mouseover="hoveredGame = game.boardgame_id"
        @mouseleave="hoveredGame = null"
      >
        <div class="card-image-container">
          <img :src="game.image || game.thumbnail" :alt="game.name" />
        </div>
        <div class="card-info">
          <h3>{{ game.name }}</h3>
          <div class="card-meta">
            <span>{{ game.year_published || 'N/A' }}</span>
            <span>{{ game.min_players }}-{{ game.max_players }} players</span>
          </div>
          <p class="game-price">$ {{ getPriceForGame(game) }}</p>
        </div>
        <div class="game-description" :class="{ 'visible': hoveredGame === game.boardgame_id }">
          <h3>{{ game.name }}</h3>
          <p>{{ game.description }}</p>
        </div>
      </div>
    </div>

    <!-- Pagination -->

    <div class="pagination" v-if="!loading && boardgames.length > 0">
      <button @click="previousPage" :disabled="currentPage === 1" class="page-btn">
        ← Previous
      </button>
      <span class="page-indicator">Page {{ currentPage }}</span>
      <button @click="nextPage" class="page-btn">
        Next →
      </button>
    </div>

    <div class="game-modal-overlay" v-if="selectedGame" @click="closeGameDetails"></div>
  
  <!-- Modal de détails du jeu -->

  <div class="game-modal" v-if="selectedGame">
    <button class="close-modal" @click="closeGameDetails">×</button>
    
    <div class="game-modal-content">
      <div class="game-modal-image">
        <img :src="selectedGame.image || selectedGame.thumbnail" :alt="selectedGame.name">
      </div>
      
      <div class="game-modal-info">
        <h2>{{ selectedGame.name }}</h2>
      <div class="modal-price">
            <span>$ {{ getPriceForGame(selectedGame) }}</span>
      </div>
        <div class="game-specs">
          <div class="spec-item">
            <span class="spec-label">Rating:</span>
            <div class="star-rating">
              <span v-for="i in 5" :key="i" class="star" :class="{ 'filled': i <= Math.round(selectedGame.average / 2) }">★</span>
              <span class="rating-number">({{ (selectedGame.average || 0).toFixed(1) }}/10)</span>
            </div>
          </div>

          <div class="spec-item">
            <span class="spec-label">Year:</span>
            <span>{{ selectedGame.year_published || 'N/A' }}</span>
          </div>
          
          <div class="spec-item">
            <span class="spec-label">Players:</span>
            <span>{{ selectedGame.min_players }} - {{ selectedGame.max_players }}</span>
          </div>
          
          <div class="spec-item">
            <span class="spec-label">Age:</span>
            <span>{{ selectedGame.min_age }}+</span>
          </div>
          
          
          
          <div class="spec-item">
            <span class="spec-label">Categories:</span>
            <span>{{ getGameCategories(selectedGame.boardgame_id) }}</span>
          </div>
        </div>

        <button class="buy-button" @click="buyGame(selectedGame)">
          Add to cart
        </button>

        <div class="game-description-modal">
          <h3>Description</h3>
          <p>{{ selectedGame.description }}</p>
        </div>
        
        
      </div>
    </div>
  </div>



  </div>
</template>

<script>
import axios from "../axiosconfig";
import HeaderImage from '../components/HeaderComponent.vue'
import useAuth from '../composables/useAuth.js';

export default {
    components: {
    HeaderImage
  },


  data() {
    return {
      boardgames: [],
      currentPage: 1,
      gamesPerPage: 20,
      loading: false,
      hoveredGame: null,
      categories: [],
      publishers: [],
      selectedSort: "name",
      selectedCategory: "",
      selectedPublisher: "",
      selectedPlayers: "",
      selectedGame: null,
      gameCategories: {},
      filtersVisible: false
    };
  },
  setup() {
    const { isAuthenticated, checkAuth } = useAuth();
    return { isAuthenticated, checkAuth };
  },
  mounted() {
    this.checkAuth(); 
    this.fetchCategories();
    this.fetchPublishers();
    this.fetchBoardgames();
  },
  computed: {
    hasActiveFilters() {
      return this.selectedCategory || this.selectedPublisher || this.selectedPlayers || (this.selectedSort !== "name");
    }
  },
  methods: {
    async fetchBoardgames() {
      this.loading = true;
      try {
        const offset = (this.currentPage - 1) * this.gamesPerPage;

        const params = new URLSearchParams();
        params.append("limit", this.gamesPerPage);
        params.append("offset", offset);
        
        if (this.selectedSort) {
          params.append("sort", this.selectedSort);
        }
        if (this.selectedCategory) {
          params.append("category", this.selectedCategory);
        }
        if (this.selectedPublisher) {
          params.append("publisher", this.selectedPublisher);
        }
        if (this.selectedPlayers) {
          params.append("players", this.selectedPlayers);
        }
        
        const response = await axios.get(`/boardgames?${params.toString()}`);
        
        if (response.data.length > 0) {
          const ids = response.data.map((game) => game.boardgame_id).join(",");
          const imagesResponse = await axios.get(`/boardgames/bgg/images?ids=${ids}`);
          
          this.boardgames = response.data.map((game, index) => {
            const image = imagesResponse.data[index]?.image;
            return {
              ...game,
              image: image || game.thumbnail,
              description: this.decodeHtmlEntities(game.description || "No description available"),
            };
          });
        } else {
          this.boardgames = [];
        }
      } catch (error) {
        console.error("Error fetching boardgames:", error);
        this.boardgames = [];
      } finally {
        this.loading = false;
      }
    },

    async fetchCategories() {
      try {
        const response = await axios.get("boardgames/categories");
        this.categories = response.data;
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    },

    async fetchPublishers() {
      try {
        const response = await axios.get("boardgames/publishers");
        this.publishers = response.data;
      } catch (error) {
        console.error("Error fetching publishers:", error);
      }
    },
    
    async fetchGameCategories(gameId) {
      if (this.gameCategories[gameId]) return;
      
      try {
        if (this.selectedGame.categories) {
          this.gameCategories[gameId] = this.selectedGame.categories.split(',');
        } else {
          const response = await axios.get(`/boardgames/${gameId}`);
          if (response.data.categories) {
            this.gameCategories[gameId] = response.data.categories.split(',');
          } else {
            this.gameCategories[gameId] = [];
          }
        }
        this.gameCategories = { ...this.gameCategories };
        console.log("Game categories fetched:", this.gameCategories[gameId]);
      } catch (error) {
        console.error("Error fetching game categories:", error);
        this.gameCategories[gameId] = [];
        this.gameCategories = { ...this.gameCategories };
      }
    },

    getPriceForGame(game) {
      const average = parseFloat(game.average);
      if (!average || isNaN(average)) return "Contact the support for price";

      const constant = 5.38;
      return (average + constant).toFixed(2);

    },



    showGameDetails(game) {
      this.selectedGame = game;
      document.body.style.overflow = 'hidden'; // Empêcher le scroll de la page
      this.fetchGameCategories(game.boardgame_id);
    },
  
    closeGameDetails() {
      this.selectedGame = null;
      document.body.style.overflow = ''; // Réactiver le scroll
    },

    getGameCategories(gameId) {
      if (!this.gameCategories[gameId]) return "Loading...";
      if (this.gameCategories[gameId].length === 0) return "No categories";
      
      if (typeof this.gameCategories[gameId] === 'string') {
        return this.gameCategories[gameId];
      }
      
      return this.gameCategories[gameId].join(", ");
    },
  
    buyGame(game) {
      if (!this.isAuthenticated) {
        this.$router.push("/login");
        return;
      }
      let cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const existing = cart.find(item => item.boardgame_id === game.boardgame_id);
      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({
          boardgame_id: game.boardgame_id,
          name: game.name,
          price: this.getPriceForGame(game),
          category: this.getGameCategories(game.boardgame_id),
          image: game.image || game.thumbnail,
          quantity: 1
        });
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      alert(`${game.name} added to cart!`);
    },

    getCategoryName(categoryId) {
      const category = this.categories.find(c => c.category_id === parseInt(categoryId));
      return category ? category.category_name : categoryId;
    },

    getPublisherName(publisherId) {
      const publisher = this.publishers.find(p => p.publisher_id === parseInt(publisherId));
      return publisher ? publisher.publisher_name : publisherId;
    },

    getSortName(sortValue) {
      const sortOptions = {
        "name": "Name (A-Z)",
        "ranked": "Popularity",
        "year": "Release Year"
      };
      return sortOptions[sortValue] || sortValue;
    },

    toggleFilters() {
      this.filtersVisible = !this.filtersVisible;
    },

    removeFilter(filterType) {
      if (filterType === 'category') this.selectedCategory = "";
      if (filterType === 'publisher') this.selectedPublisher = "";
      if (filterType === 'players') this.selectedPlayers = "";
      this.resetAndFetch();
    },

    resetSort() {
      this.selectedSort = "name";
      this.resetAndFetch();
    },

    resetAndFetch() {
      this.currentPage = 1;
      this.fetchBoardgames();
    },

    resetFilters() {
      this.selectedSort = "name";
      this.selectedCategory = "";
      this.selectedPublisher = "";
      this.selectedPlayers = "";
      this.currentPage = 1;
      this.fetchBoardgames();
    },

    decodeHtmlEntities(str) {
      if (!str) return "";
      const txt = document.createElement("textarea");
      txt.innerHTML = str;
      return txt.value;
    },
    
    nextPage() {
      this.currentPage++;
      this.fetchBoardgames();
    },
    
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.fetchBoardgames();
      }
    }
  },
  
  async mounted() {
    await Promise.all([
      this.fetchCategories(),
      this.fetchPublishers(),
    ]);
    this.fetchBoardgames();
  }
};
</script>

<style scoped>
.header-banner {
  width: 100vw;
  height: 400px;
  object-fit: cover;
  display: block;
}
.catalog-container {
  padding: 120px 24px 40px 24px;
  max-width: 1400px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
}

.catalog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.catalog-header .catalog-title {
  font-size: 2rem;
  color: #53cf90;
  margin: 0;
  text-align: left;
}

.filter-button {
  display: inline-flex;
  align-items: center;
  background: #757575;
  color: white;
  padding: 10px 18px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.filter-button:hover {
  background: #595959;
}

.filter-icon {
  margin-left: 8px;
  font-size: 0.8rem;
}

.filters-panel {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 0;
  max-height: 0;
  overflow: hidden;
  transition: all 0.3s ease;
  opacity: 0;
  margin-bottom: 0;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}

.filters-panel.visible {
  padding: 24px;
  max-height: 400px;
  opacity: 1;
  margin-bottom: 24px;
}

.filters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.filter-group {
  display: flex;
  flex-direction: column;
}

.filter-group label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #757575;
  margin-bottom: 8px;
  text-align: left;
}

.filter-group select,
.filter-group input {
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 2rem;
  background: white;
  font-size: 0.95rem;
}

.reset-btn {
  background: #e74c3c;
  color: white;
  border: none;
  width: 400px;
  padding: 10px 18px;
  border-radius: 2rem;
  cursor: pointer;
  font-weight: 500;
  margin-top: 20px;
  transition: background 0.2s;
}

.reset-btn:hover {
  background: #c0392b;
}

.active-filters {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 24px;
  text-align: left;
}

.active-filters > span {
  color: #757575;
  font-weight: 600;
  margin-right: 8px;
}

.filter-tag {
  display: inline-flex;
  align-items: center;
  background: #e8f4f8;
  color: #757575;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
}

.remove-filter {
  margin-left: 8px;
  font-weight: bold;
  cursor: pointer;
  color: #e74c3c;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
}

.loading-spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border-left-color: #757575;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.no-results {
  min-height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.games-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
}

.game-card {
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s;
  height: 370px; /* Fixed height for uniformity */
}

.game-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.card-image-container {
  height: 240px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
}

.game-card img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.game-price{
  font-size: 1.3rem;
  font-weight: bold;
}
.card-info {
  padding: 15px 25px;
  text-align: left;
}

.card-info h3 {
  margin: 0 0 8px 0;
  font-size: 1.1rem;
  color: #000000;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: #95a5a6;
}

.game-description {
  cursor: pointer; /* Ajout du curseur pointer pour indiquer l'interactivité */
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #757575;
  color: white;
  padding: 20px;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
  text-align: left;
  overflow-y: auto;
}

.game-description.visible {
  opacity: 1;
  transform: translateY(0);
}

.game-description h3 {
  font-size: 1.2rem;
  margin: 0 0 12px 0;
}

.game-description p {
  font-size: 0.9rem;
  line-height: 1.5;
  overflow: auto;
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
}

.page-btn {
  background: #53cf90;
  color: white;
  border: none;
  width: 300px;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s;
}

.page-btn:hover:not(:disabled) {
  background: #227b4e;
}

.page-btn:disabled {
  background: #bdc3c7;
  cursor: not-allowed;
}

.page-indicator {
  margin: 0 15px;
  font-weight: 600;
  color: #2c3e50;
}

@media (max-width: 768px) {
  .catalog-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .filter-button {
    margin-top: 16px;
    align-self: flex-end;
  }

  .filters-grid {
    grid-template-columns: 1fr;
  }

  .game-card {
    position: relative;
    border-radius: 10px;
    overflow: hidden;
    background: white;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transition: all 0.3s;
    height: 340px;
  }

  .card-image-container {
    height: 220px;
  }

  .card-info h3 {
    font-size: 1rem;
  }
}

.game-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 100;
  backdrop-filter: blur(5px);
}

.game-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 1000px;
  max-height: 90vh;
  background: white;
  z-index: 101;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.modal-price{
  font-size: 1.8rem;
  font-weight: 150;
  text-align: left;
  margin: 0 0 20px 50px;
}
.close-modal {
  position: absolute;
  top: 15px;
  background: none;
  border: none;
  font-size: 24px;
  color: #757575;
  cursor: pointer;
  z-index: 102;
  text-align: right;
  padding-right: 20px;
}

.game-modal-content {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 20px;
  padding: 30px;
  overflow-y: auto;
  max-height: calc(90vh - 60px);
}

.game-modal-image {
  position: sticky;
  top: 80px;
  align-self: flex-start;
  flex-shrink: 0;
  width: 100%; 
  max-height: calc(90vh - 60px);
  display: flex;
  justify-content: center;
  background: #fff;
}

.game-modal-image img {
  max-width: 100%;
  max-height: 400px;
  object-fit: contain;
}

.game-modal-info {
  display: flex;
  flex-direction: column;
}

.game-modal-info h2 {
  font-size: 1.8rem;
  margin: 15px 0 20px 0;
  color: #000000;
  text-align: left;
  margin-left: 10px;
}

.game-specs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-bottom: 25px;
}

.spec-item {
  display: flex;
  flex-direction: column;
}

.spec-label {
  font-size: 0.85rem;
  color: #95a5a6;
  margin-bottom: 5px;
}

.star-rating {
  display: flex;
  align-items: center;
  justify-content: center;
}

.star {
  color: #ddd;
  font-size: 1.2rem;
  margin-right: 4px;
  line-height: 1;
}

.star.filled {
  color: #f1c40f;
}

.rating-number {
  margin-left: 8px;
  font-size: 0.85rem;
  color: #7f8c8d;
}

.game-description-modal {
  margin: 10px 10px;
  margin-bottom: 30px;
}

.game-description-modal h3 {
  font-size: 1.1rem;
  margin: 0 0 10px;
  color: #000000;
  text-align: left;
}

.game-description-modal p {
  font-size: 0.95rem;
  line-height: 1.6;
  color: #000000;
  text-align: justify;
}

.buy-button {
  margin: 20px 10px;
  background: #27ae60;
  color: white;
  border: none;
  border-radius: 2rem;
  padding: 12px 20px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  align-self: flex-start;
}

.buy-button:hover {
  background: #2ecc71;
}

@media (max-width: 768px) {
  .game-modal-content {
    grid-template-columns: 1fr;
  }
  
  .game-modal-image {
    max-height: 250px;
  }
  
  .game-specs {
    grid-template-columns: 1fr;
  }
}
</style>