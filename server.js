const express = require("express")
const connectToMongoDB = require("./database/db")
require("dotenv").config()

const app = express()
const PORT = process.env.PORT || 4000

// Connect to DB
// connectToMongoDB()

// Add middlewares
app.use(express.json())

app.get("/", (req, res) => {
   res.send("It is working!")
})

app.listen(PORT, () => {
   console.log(`Server listening at http://localhost:${PORT}`)
})
