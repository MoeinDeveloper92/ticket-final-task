//we will use it as a piece of middleware to check to token of the user
const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")

const protect = asyncHandler(async (req, res, next) => {
    //initilize a token
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
        //Get token from Header
        try {
            token = req.headers.authorization.split(" ")[1]

            //verify the token
            const decoded = jwt.verify(token, process.env.SECRET_KEY)

            //get the user from the token
            req.user = await User.findById(decoded.id).select("-password")
            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error("Not Authozied!")
        }
    }

    if (!token) {
        res.status(401)
        throw new Error("Not Authozied!/ No Token")
    }
})


module.exports = protect