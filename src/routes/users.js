const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userControllers');

// Register User
router.post('/register', userController.register);

// Login
router.post('/login', userController.login);

module.exports = router;
