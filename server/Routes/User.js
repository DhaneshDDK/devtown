const express = require("express");
const router = express.Router();


const {signupController, signInController, verifyUser} = require('../Controllers/User');


router.post('/signup', signupController);
router.post('/login', signInController);
router.post('/verifyUser', verifyUser);


module.exports = router;
