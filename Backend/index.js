const express = require("express")
const app = express()
const cors = require("cors")
const dbConnect = require("./dbConnect")
require("dotenv").config()

app.use(cors())
const bodyParser = require("body-parser")   // from user input get data
app.use(bodyParser.json())

const middleWareAuth = require("./middleWare/authMiddle")

app.get("/protected", middleWareAuth, (req, res) => {
    return res.json({user:req.user})
})



const userRouter = require("./routes/auth")
const contactRouter = require("./routes/contactRoutes")

app.use("/api", userRouter)
app.use("/api", contactRouter)


app.get("/", (req, res) => {
    res.send("Backend is Ready")
})


const PORT = process.env.PORT || 8000

app.listen(PORT, async () => {
    await dbConnect()
    console.log("Server is Called on port number",PORT)
})