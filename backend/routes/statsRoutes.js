const express = require('express');
const { getRevenueStats, getUserStats } = require('../controllers/statsController');
const router = express.Router();

router.get('/revenue', getRevenueStats);
router.get('/users', getUserStats);

module.exports = router;
