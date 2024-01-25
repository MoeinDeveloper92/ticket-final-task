const asyncHandler = require("express-async-handler")
const Ticket = require("../models/ticketModel")
const User = require("../models/userModel")
const Note = require("../models/noteModel")


//@desc     Get notes for a Ticket
//@route    GET /api/tcikets/:ticketId/notes
//@access Private
const getNotes = asyncHandler(async (req, res, next) => {
    //get the user using JWT sent along with the request
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error("User Not Found!")
    }

    const ticket = await Ticket.findById(req.params.ticketId)

    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("UnAuthorized Access!")
    }

    const notes = await Note.find({ ticket: req.params.ticketId })
    res.status(200).json(notes)
})




//@desc     create Notes
//@route    POST /api/tcikets/:ticketId/notes
//@access Private
const addNote = asyncHandler(async (req, res, next) => {
    //get the user using JWT sent along with the request
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error("User Not Found!")
    }

    const ticket = await Ticket.findById(req.params.ticketId)
    //make sute user owns the ticket
    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("UnAuthorized Access!")
    }

    const note = await Note.create({
        ticket: req.params.ticketId,
        text: req.body.text,
        user: req.user.id,
        isStaff: false
    })
    res.status(200).json(note)
})



module.exports = {
    getNotes,
    addNote
}