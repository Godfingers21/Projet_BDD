const express = require('express');
const router = express.Router();
const boardgameController = require('../controllers/boardgameController');

router.get('/', boardgameController.getAllBoardGames);
router.get('/:id', boardgameController.getBoardGameById);

module.exports = router;