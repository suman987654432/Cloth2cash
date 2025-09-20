const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/user');

// POST /api/users/signup
router.post('/signup', signup);

// POST /api/users/login
router.post('/login', login);

module.exports = router;
