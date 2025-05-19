const express = require('express');
const router = express.Router();
const buyController = require('../controllers/buyController');
const { verifyToken } = require('../middleware/authMiddleware');

// Créer un nouvel achat
router.post('/', verifyToken, buyController.createPurchase);

// Obtenir les achats de l'utilisateur connecté
router.get('/user', verifyToken, buyController.getUserPurchases);

module.exports = router;