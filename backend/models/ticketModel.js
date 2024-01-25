const mongoose = require("mongoose")

//we should link this collection to the user colleciton
//each user can have multiple tikcet
const ticketSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true]
    },
    product: {
        type: String,
        required: [true, "Please select a product"],
        enum: ["iPhone", "Macbook Pro", "iMac", "iPad", "iPod"]
    },
    description: {
        type: String,
        required: [true, "Please enter a description of the issue!"]
    },
    status: {
        type: String,
        enum: ["new", "open", "closed"],
        default: "new"
    }
},
    {
        timestamps: true
    }
)

const Ticket = mongoose.model("Ticket", ticketSchema)

module.exports = Ticket