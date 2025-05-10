const express = require('express');
const router = express.Router();
const boardgameController = require('../controllers/boardgameController');

router.get('/', boardgameController.getAllBoardGames);
router.get('/categories', boardgameController.getCategories);
router.get('/publishers', boardgameController.getPublishers);
router.get('/:id', boardgameController.getBoardGameById);
router.get('/category/:categoryId', boardgameController.getBoardGameByCategory);
router.get('/publisher/:publisherId', boardgameController.getBoardGameByPublisher);
router.get('/bgg/images/', boardgameController.getBoardGameImage);

module.exports = router;