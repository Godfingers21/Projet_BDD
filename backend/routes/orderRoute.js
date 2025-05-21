const express = require('express');
const router = express.Router();
const { createOrder } = require('../controllers/orderController');
const { verifyToken } = require('../middleware/authMiddleware');
const { getMyOrders } = require('../controllers/orderController');

router.post('/', verifyToken, createOrder);
router.get('/', verifyToken, getMyOrders);

module.exports = router;
