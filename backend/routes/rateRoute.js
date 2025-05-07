const express = require('express');
const router = express.Router();
const rateController = require('../controllers/rateController');

router.post('/', rateController.createRate);
router.put('/update', rateController.updateRate);
router.get('/b:id', rateController.getRateByBoardId);
router.get('/u:id', rateController.getRateByUserId);
router.delete('/delete', rateController.deleteRate);


module.exports = router;