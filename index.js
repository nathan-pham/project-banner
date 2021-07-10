const express = require("express")
const Badge = require("./badge")

const app = express()
const port = 8080

app.get('/', (req, res) => {
    const badge = new Badge()
    badge.render(res)
})

app.listen(port, () => {
    console.log(`app hosted on http://localhost:${port}`)
})