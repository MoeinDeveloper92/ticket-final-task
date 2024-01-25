const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const Ticket = require("../models/ticketModel")


//@desc     Get user tickets
//@route    GET /api/tickets
//@access   Private
const getTickets = asyncHandler(async (req, res, next) => {
    //get user using the id in the JWT
    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(401)
        throw new Error("User Not Found!")
    }
    const tickets = await Ticket.find({ user: req.user.id })
    res.status(200).json(tickets)
})


//@desc     Create New Ticket
//@route    POST /api/tickets/
//@access   Pricate
const createTicket = asyncHandler(async (req, res, next) => {
    const { product, description } = req.body
    if (!product || !description) {
        res.status(400)
        throw new Error("Please add a product and description!")
    }

    //get the user thorugh the token
    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(401)
        throw new Error("USer not found")
    }

    const ticket = await Ticket.create({
        user: req.user.id,
        product,
        description,
        status: "new"
    })

    res.status(201).json({
        ticket
    })
})

//@desc     Get single ticket
//@route    GET /api/tickets/:ID
//@access   Private
const getTicket = asyncHandler(async (req, res, next) => {
    //Validate the user through the JWT
    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(401)
        throw new Error("Uset not found!")
    }

    //get the single ticket
    const ticket = await Ticket.findById(req.params.id)

    if (!ticket) {
        res.status(404)
        throw new Error("Ticket Not Found!")
    }

    //we dont one anybody to get our ticket
    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("Not Authorized")
    }

    res.status(200).json(ticket)
})

//@desc     Delte a single ticket
//@route    DELETE /api/tickets/:id
//@access   Private
const deleteTicket = asyncHandler(async (req, res, next) => {
    //validate the user
    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(401)
        throw new Error("User not found!")
    }

    //get the ticket
    const ticket = await Ticket.findById(req.params.id)
    if (!ticket) {
        res.status(404)
        throw new Error("Ticket not Found!")
    }

    //we dont one anyone else delete the ticket
    if (req.user.id !== ticket.user.toString()) {
        res.status(401)
        throw new Error("UnAuthorized Action!")
    }

    await Ticket.findByIdAndDelete(req.params.id)
    res.status(200).json({
        message: "deleted",
        id: req.params.id
    })
})


//@desc     update single Ticket
//@route    PUT /api/tickets/:id
//@access   Private
const updateTicket = asyncHandler(async (req, res, next) => {
    //validate the user
    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(401)
        throw new Error("User Not Found!")
    }

    //find the ticket
    const ticket = await Ticket.findById(req.params.id)
    if (!ticket) {
        res.status(404)
        throw new Error("Ticket  Not Found!")
    }
    //we want to make siure no one can ipdate that nly authenticated user
    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("User not Authorized")
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })

    res.status(200).json(updatedTicket)
})

module.exports = {
    getTickets,
    createTicket,
    getTicket,
    deleteTicket,
    updateTicket
}