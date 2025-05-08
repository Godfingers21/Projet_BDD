const express = require('express');
const router = express.Router();
const rateController = require('../controllers/rateController');
const { verifyToken } = require('../middleware/authMiddleware')

router.post('/', verifyToken, rateController.createRate);
router.put('/update', verifyToken, rateController.updateRate);
router.get('/board/:id', rateController.getRateByBoardId);
router.get('/user/:id', rateController.getRateByUserId);
router.delete('/delete', verifyToken, rateController.deleteRate);


module.exports = router;