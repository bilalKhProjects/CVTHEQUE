// UserRoute.js

const express = require('express')
const user = require('./UserController')
const router = express.Router()

const { authMiddleware } = require('./UserController')

router.post('/register', user.register)
router.post('/login', user.login)
router.get('/profil', authMiddleware, function (req, res) {
  res.json({ 'access': true })
})

module.exports = router