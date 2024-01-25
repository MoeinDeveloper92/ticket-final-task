const express = require("express")
const routes = express.Router()
const { registerUser, loginUser, getMe } = require("../controllers/userController")
const protect = require("../middleware/authMiddleware")

routes.route("/").post(registerUser)
routes.route("/login").post(loginUser)
routes.route("/me").get(protect, getMe)


module.exports = routes