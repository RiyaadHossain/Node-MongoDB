const express = require('express')
const app = express()
const port = process.env.PORT || 5000

// Set MiddleWares Here 
app.use(cors()) //----- to share data with client side (localhost:3000)
app.use(express.json()) //----- to parse the string data we get from client side

app.get('/', (req, res) => {
    res.send("Running My Node server successfully 😃 ")
})

app.listen(port, () => {
    console.log("Node Server Running Successfully ✅ ");
})