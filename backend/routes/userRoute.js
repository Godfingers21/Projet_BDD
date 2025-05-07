const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken } = require('../middleware/authMiddleware');

router.get('/me', verifyToken, userController.getUserById);
router.put('/update', verifyToken, userController.updateUser);
router.delete('/delete', verifyToken, userController.deleteUser);

module.exports = router;