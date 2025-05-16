const express = require('express');
const router = express.Router();
const { register, login, validateToken } = require('../controller/authController');
const verifyToken = require('../Middleware/verifyToken');

router.post('/register', register);
router.post('/login', login);
router.get('/validate-token', verifyToken, validateToken);

module.exports = router;
