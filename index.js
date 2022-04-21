const express = require('express')
const app = express()
const port = process.env.PORT || 5000

app.get('/', (req, res) => {
    res.send("Running My Node server successfully 😃 ")
})

app.listen(port, () => {
    console.log("Node Server Running Successfully ✅ ");
})