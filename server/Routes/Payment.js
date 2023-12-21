const express = require('express');
const router = express.Router();

const {initiatePayment, verifyPayment} = require('../Controllers/Payment')

router.post('/initiatePayment',initiatePayment);
router.post('/verifyPayment',verifyPayment);

module.exports = router;