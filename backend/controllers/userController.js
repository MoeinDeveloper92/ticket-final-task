const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const bcrypt = require("bcryptjs")
const generateToken = require("../auth/generateToken")


//@desc     Register a new user
//@route    POST /api/users
//@access   Public
const registerUser = asyncHandler(async (req, res, next) => {
    const { name, email, password } = req.body

    //Simple Validation
    if (!name || !email || !password) {
        //400 is viewd as a Bad Request
        res.status(400)
        throw new Error("Please includes all fields")
    }

    //check within database/ find if user already exist
    const userExist = await User.findOne({ email })
    if (userExist) {
        //Client Error
        res.status(400)
        throw new Error("This Email Already Exist!")
    }

    //create user
    const user = await User.create({
        name,
        email,
        password
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error("Invalid user data!")
    }
})


//@desc     Login user to app
//@route   POST /api/users/login
//@access   Public  
const loginUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    //check user and passwords match
    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error("Invalid Credentials")
    }

})

//@desc     Get current user
//@route    GET /api/users/me
//@access   Private
const getMe = asyncHandler(async (req, res, next) => {
    //get the user by id
    res.status(200).json({
        id: req.user._id,
        name: req.user.name,
        email: req.user.email
    })
})


module.exports = {
    registerUser,
    loginUser,
    getMe
}