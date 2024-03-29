const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/auth-controller')

router.post('/register', AuthController.registerUser)
router.post('/login', AuthController.loginUser)
router.get('/logout', AuthController.logoutUser)
router.get('/loggedIn', AuthController.getLoggedIn)
router.put(`/like/:id`, AuthController.likeList)
router.put(`/dislike/:id`, AuthController.dislikeList)
module.exports = router