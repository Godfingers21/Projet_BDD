<template>
    <div class="game-list">
      <h1>Board Games</h1>
      <div v-if="loading" class="loading">Loading...</div>
      <div v-else class="games-grid">
        <div
          v-for="game in boardgames"
          :key="game.boardgame_id"
          class="game-card"
          @mouseover="hoveredGame = game.boardgame_id"
          @mouseleave="hoveredGame = null"
        >
          <img :src="game.image || game.thumbnail" :alt="game.description" />
          <div v-if="hoveredGame === game.boardgame_id" class="game-description">
            <h3>{{ game.name}}</h3>
            <p>{{ game.description }}</p>
          </div>
        </div>
      </div>
      <div class="pagination">
        <button @click="previousPage" :disabled="currentPage === 1">Previous</button>
        <span>Page {{ currentPage }}</span>
        <button @click="nextPage">Next</button>
      </div>
    </div>
  </template>
  
  


  <script>
  import axios from "../axiosConfig";
  
  export default {
    data() {
      return {
        boardgames: [],
        currentPage: 1,
        gamesPerPage: 9,
        loading: false,
        hoveredGame: null,
      };
    },
    methods: {
      async fetchBoardgames() {
        this.loading = true;
        try {
          const offset = (this.currentPage - 1) * this.gamesPerPage;
          const response = await axios.get(`/boardgames?limit=${this.gamesPerPage}&offset=${offset}`);
          const ids = response.data.map((game) => game.boardgame_id).join(",");
          const imagesResponse = await axios.get(`/boardgames/bgg/images?ids=${ids}`);
          this.boardgames = response.data.map((game, index) => {
            const image = imagesResponse.data[index]?.image;
            return{
                ...game,
                image: image || game.thumbnail,
                description: this.decodeHtmlEntities(game.description),
            };
          });
        } catch (error) {
          console.error("Error fetching boardgames:", error);
        } finally {
          this.loading = false;
        }
      },
      decodeHtmlEntities(str) {
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
      },
    },
    mounted() {
      this.fetchBoardgames();
    },
  };
  </script>
  
  <style>
  .game-list {
    padding: 20px;
    font-family: Arial, sans-serif;
  }
  
  .games-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
  
  .game-card {
    position: relative;
    overflow: hidden;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s;
  }
  
  .game-card:hover {
    transform: scale(1.05);
  }
  
  .game-card img {
    width: 100%;
    height: 200px;
    object-fit: contain;
    border-radius: 10px;
  }
  
  .game-description {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.4));
    color: white;
    padding: 15px;
    opacity: 0;
    transition: opacity 0.3s, transform 0.3s;
    transform: translateY(100%);
  }

  .game-card:hover .game-description {
    opacity: 1;
    transform: translateY(0);
  }

  .game-description h3 {
    margin: 0;
    font-size: 1.2em;
    font-weight: bold;
  }

  .game-description p {
    margin: 5px 0 0;
    font-size: 0.9em;
    line-height: 1.4;
    max-height: 3.6em; /* Limit to 2 lines */
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .game-card:hover .game-description {
    opacity: 1;
  }
  
  .pagination {
    margin-top: 20px;
    text-align: center;
  }
  
  .pagination button {
    padding: 10px 20px;
    margin: 0 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .pagination button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  </style>