const express = require('express')

// controller functions
const { loginUser, signupUser, tokenVerify } = require('../controllers/userController')

const router = express.Router()

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)

// Token Route
router.get('/token/:id', tokenVerify)

module.exports = router