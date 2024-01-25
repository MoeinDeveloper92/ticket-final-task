const express = require("express")
const dotenv = require("dotenv").config()
const errorHandler = require("./middleware/errorMiddleware")
const colors = require("colors")
const app = express()
const PORT = process.env.PORT || 8000
const connectDB = require("./config/db")

//Connect to Data Base
connectDB()

app.use(express.json())
app.use(express.query())
app.use(express.urlencoded({ extended: false }))


app.get("/", (req, res) => {
    res.status(200).json({
        msg: "Welcome to the server"
    })
})


app.use("/api/users", require("./routes/userRoutes"))
app.use("/api/tickets", require("./routes/ticketRoutes"))


app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`The app is running on the port ${PORT}`)
})


